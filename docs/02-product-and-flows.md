# 2. Product and flows

## Actors

| Actor | Role |
|-------|------|
| **Sponsor** (*sponsor*) | Pays the premium for a policy. Usually a relative abroad. Can be the beneficiary themselves. |
| **Beneficiary** (*beneficiary*) | The protected person. Receives the payout, or the payout address that was set receives it. |
| **Donor** (*donor*) | Contributes to the pool without receiving coverage. |
| **Attester** (*attester*) | Trusted account that reports events confirmed by public data. A few accounts, defined when the fund is initialized. |
| **Anyone** | Can execute the claim of an eligible policy. The money only goes to the fixed address. |

There is no administrator with access to the funds. That is the key property.

## Concepts

| Concept | What it is |
|---------|------------|
| **Pool** | Common balance: premiums plus contributions minus payouts |
| **Policy** | Coverage for one person in one zone: covered amount, validity period and payout address |
| **Zone** | Discrete area at department or state level (for example Chocó in Colombia or La Guaira in Venezuela), identified by a number. It is not a country or a city. The interface groups zones by country |
| **Hazard** (*hazard*) | Type of event: earthquake, extreme rainfall, etc. |
| **Payout rule** | "If hazard X exceeds threshold Y, pay Z % of the coverage" |
| **Waiting period** | Days after enrollment during which the policy does not yet cover |
| **Event** | Occurrence reported by attesters; confirmed when the quorum is reached |

## Fund parameters (set at initialization)

| Parameter | Example |
|-----------|---------|
| Token | Testnet USDC (or a test token) |
| Attesters and quorum | 3 accounts, quorum 2 |
| Waiting period | 14 days (one minute in the test configuration) |
| Premium duration | 30 days |
| Payout rules | Earthquake ≥ 5.0 → 20 %; earthquake ≥ 6.5 → 100 % |
| Minimum and maximum coverage | 25 to 200 USDC |

## Policy states

- `Waiting`: enrolled, but still within the waiting period.
- `Active`: covers events while the premium is current.
- `Expired`: the premium ran out; no coverage until renewed.
- `Claimed` for an event: already received the payout for that event (can claim for a different event).

## Flows

### Flow 1: protect yourself or a relative
1. The sponsor connects their wallet.
2. They enter the beneficiary's zone, the coverage and the payout address.
3. They see the premium cost and the waiting period.
4. They sign; the policy is created.
5. They receive a summary to share with the beneficiary.

### Flow 2: renew the premium
1. The sponsor opens the policy.
2. They pay the premium; the validity period is extended.

### Flow 3: contribute to the pool
1. A donor connects their wallet and enters an amount.
2. They sign; the pool grows and the contribution is public.

### Flow 4: event and confirmation
1. An attester reports the event: hazard, measured value, date, public reference and affected zones.
2. Another attester reports the same. When the quorum is reached, the event is **confirmed**.
3. The contract calculates the payout factor based on the pool balance.

### Flow 5: claim
1. Anyone (the beneficiary, the sponsor or an automatic service) executes the claim for an eligible policy.
2. The contract checks zone, validity and waiting period, and pays the fixed address.

### Flow 6: view the status
Dashboard with: pool balance, policies by zone, map, recent events and payouts made.

## Screens (MVP)

1. **Home:** what Quinti is, connect wallet, protect someone, contribute.
2. **Protect:** form for zone, coverage, payout address and premium.
3. **My policies:** status, validity, renew.
4. **Pool and events:** balance, map by zones, timeline of events and payouts.
5. **Verifiers panel:** register an event, confirm it between attesters and execute the payouts.
6. **Guides (public, no wallet needed):** one page per way of helping, reached from the landing page. Each shows the process as a visual timeline: open the wallet, choose, pay or contribute, the event is confirmed, the money arrives.

## Possible extensions

- **Second hazard** (extreme rainfall), using the same generic logic.
- **Automatic claims** by a service that watches events and executes the claims.
- **Off-ramp** to local currency through a testnet anchor.
- **Wallet recovery** without a seed phrase (passkeys), if the ecosystem supports it today.
- **Local attesters** who attest to each person's zone (reduces location fraud).
