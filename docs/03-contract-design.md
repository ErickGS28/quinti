# 3. Soroban contract design

> Design draft. Exact signatures and SDK usage are verified against the current documentation and `toolkit/reference/soroban-examples/` before implementation.

## Principles

- **No administrator with access to funds.** The configuration is set once, at initialization.
- Every movement of funds follows contract rules; the UI never applies them.
- **Claiming does not require the beneficiary's signature**, but the money can only go to the address fixed in the policy. This works even if the beneficiary has no signal.
- **Generic per hazard:** the contract does not know what an earthquake is; it only compares a value against a threshold in a zone.
- Integer arithmetic (`i128`), never decimals. No loops over all policies.
- One contract hosts one fund (a single `initialize`). Simplicity before multi-fund.

## Data model

```rust
#[contracttype]
pub enum Hazard { Earthquake, ExtremeRainfall }

/// Rule: if the measured value is >= min_value, payout_bps of the coverage is paid.
#[contracttype]
pub struct PayoutRule {
    pub hazard: Hazard,
    pub min_value: u32,   // earthquake: magnitude x10 (65 = 6.5); rainfall: mm in 24 h
    pub payout_bps: u32,  // 2000 = 20 %
}

#[contracttype]
pub struct Config {
    pub token: Address,
    pub attesters: Vec<Address>,
    pub quorum: u32,
    pub waiting_secs: u64,
    pub period_secs: u64,      // duration of one premium
    pub min_coverage: i128,
    pub max_coverage: i128,
    pub premium_bps: u32,      // premium per period, as % of the coverage
    pub rules: Vec<PayoutRule>,
}

#[contracttype]
pub struct Policy {
    pub zone: u32,
    pub coverage: i128,
    pub beneficiary: Address,  // the protected person
    pub payout_to: Address,    // the only address that can receive the payout
    pub active_from: u64,      // enrollment + waiting period
    pub covered_until: u64,
}

#[contracttype]
pub struct Event {
    pub hazard: Hazard,
    pub value: u32,
    pub occurred_at: u64,
    pub zones: Vec<u32>,
    pub approvals: Vec<Address>,
    pub confirmed: bool,
    pub factor_bps: u32,       // fraction of the payout covered by the pool (10000 = 100 %)
    pub reserved: i128,        // amount set aside from the pool at confirmation, released as claims are paid
}

#[contracttype]
pub enum DataKey {
    Config,
    NextPolicyId,
    Policy(u32),
    Event(String),             // public event reference (e.g. USGS id)
    Claimed(String, u32),      // (event, policy)
    ZoneExposure(u32),         // sum of coverages per zone
    PoolAvailable,             // premiums + contributions - payouts
    PoolReserved,              // sum of `reserved` over confirmed events not yet paid out
}
```

## Public functions

| Function | Who | What it does |
|----------|-----|--------------|
| `initialize(config)` | once only | Stores the configuration and validates parameters |
| `enroll(sponsor, beneficiary, payout_to, zone, coverage) -> u32` | sponsor | Creates the policy and charges the first premium |
| `renew(policy_id, payer)` | payer | Charges a premium and extends `covered_until` |
| `fund(donor, amount)` | donor | Contributes to the pool |
| `report_event(attester, ref, hazard, value, occurred_at, zones)` | attester | Registers or supports an event; confirms it when the quorum is reached |
| `claim(event_ref, policy_id) -> i128` | anyone | Pays `payout_to` if the policy is eligible |
| `get_config`, `get_policy`, `get_event`, `get_pool` | anyone | Reads |

## Business rules

**Enrollment**
- `coverage` between `min_coverage` and `max_coverage`.
- The premium is `coverage * premium_bps / 10_000` and is paid by the sponsor (`require_auth`).
- `active_from = now + waiting_secs`; `covered_until = now + period_secs`.
- `coverage` is added to `ZoneExposure(zone)` and the premium to `PoolAvailable`.
- The zone and the payout address **cannot be changed** afterwards.

**Events**
- Only accounts in `attesters` can report.
- The first call stores the event; later calls must match exactly on `hazard`, `value`, `occurred_at` and `zones`, or they fail.
- An attester does not count twice.
- When `quorum` is reached, `confirmed = true` and `factor_bps` is calculated.

**Payout factor (pro-rata)**
1. Take the rule with the highest `min_value` that the value satisfies for that hazard (`payout_bps`).
2. Estimated liability = sum, over the affected zones, of `ZoneExposure(zone) * payout_bps / 10_000`.
3. `free = PoolAvailable - PoolReserved`; `factor_bps = min(10_000, free * 10_000 / liability)`.
4. `reserved = liability * factor_bps / 10_000` is added to `PoolReserved` and stored in the event. The next event to be confirmed sees a smaller `free`, so two events confirmed before either is paid can never promise the same money.
5. The work is O(affected zones), not O(policies).

**Claim (`claim`)**
- The event must be confirmed and the policy must not have claimed that event.
- The policy's zone must be in `event.zones`.
- `active_from <= event.occurred_at <= covered_until`.
- Payout = `coverage * payout_bps / 10_000 * factor_bps / 10_000`.
- `Claimed` is set, the amount is deducted from `PoolAvailable` and from the event's `reserved` (and from `PoolReserved`), and **only then** is it transferred to `payout_to`. A claim can never draw more than what its own event reserved.

**Arithmetic:** `checked_mul` / `checked_div`; the payout never exceeds the available balance.

## Suggested errors

```rust
#[contracterror]
pub enum Error {
    AlreadyInitialized = 1,
    InvalidParams = 2,
    NotAttester = 3,
    EventMismatch = 4,
    AlreadyApproved = 5,
    EventNotConfirmed = 6,
    PolicyNotFound = 7,
    NotEligible = 8,
    AlreadyClaimed = 9,
    InvalidAmount = 10,
    InsufficientPool = 11,
}
```

## Contract events

`enrolled(policy_id, zone, coverage)`, `renewed(policy_id, until)`, `funded(donor, amount)`, `event_reported(ref, attester)`, `event_confirmed(ref, factor_bps)`, `paid(ref, policy_id, amount)`.

## Security: points to review

- `require_auth` in `enroll`, `renew`, `fund` and `report_event`.
- `claim` does not authenticate the beneficiary by design; confirm that it **only** transfers to `payout_to`.
- State updated **before** transferring funds.
- Attesters and quorum immutable after `initialize`.
- Limit on zones per event to bound costs.
- Storage TTL: extend the lifetime of persistent entries (policies live for months). **Verify `extend_ttl` in the current documentation.**

## Known MVP limits

1. **Trusted attesters.** A k-of-n quorum of known accounts, not a decentralized oracle. This is the largest trust point in the design.
2. **Self-declared zone.** Mitigated by the waiting period, the maximum coverage and the fixed zone; not eliminated. For forecastable hazards (hurricane, rainfall) the waiting period must be longer than the forecast horizon.
3. **Conservative liability.** `ZoneExposure` includes expired or waiting policies, which can reduce the payout factor more than necessary. The part of the reserve that no eligible policy ends up claiming stays locked until the event is closed out; releasing it needs an explicit close step or a claim deadline (not designed yet).
4. **Flat premium.** Every zone pays the same `premium_bps` regardless of how exposed it is. A high-risk zone is subsidized by the others. A per-zone risk multiplier and a per-zone exposure cap relative to the pool are the natural next step; they are deliberately left out of the MVP.
5. **One fund per deployment.**
6. **Insurance regulatory framework** unresolved; this is a post-pilot step.

## Tests (minimum to demonstrate correctness)

1. Valid `initialize`; reject invalid parameters and a second initialization.
2. `enroll` charges the correct premium and updates exposure and pool.
3. `report_event`: attesters only; exact match; no double counting; confirms at quorum.
4. `claim` pays `payout_to` the expected amount.
5. No payout: outside the zone, during the waiting period, expired, without a confirmed event.
6. The same event cannot be claimed twice.
7. Insufficient pool: pro-rata payout; never pays more than is available.
8. Two events confirmed before either is paid: the second one sees the pool minus the first reserve, and the sum of both payouts never exceeds the pool.
9. Conservation of funds: the sum of payouts plus the pool balance equals what was contributed.
10. Nobody can redirect the payout to another address.

Use `soroban-sdk` with `testutils`, `mock_all_auths` and ledger timestamp manipulation.

## Open decisions

- Fixed premium per period or proportional to the coverage? (Proposal: proportional, simpler.)
- What happens to the surplus if no event occurs? (MVP: it stays in the pool.)
- How is the zone catalog defined? (MVP: fixed list in the frontend configuration.)
