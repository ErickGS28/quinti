# 6. Risks, limits and common objections

## Known limits

These are properties of the current design. They are stated openly because they shape what the product can promise.

1. **Trusted attesters.** A fixed group of known accounts confirms events with a k-of-n quorum. It is not a decentralized oracle, and it is the largest trust point of the design. Evolution path: a decentralized oracle or independent attesters such as local organizations, universities and geological services ([decision 0003](decisions/0003-trusted-attesters-mvp.md)).
2. **Self-declared zone.** A person chooses their zone when enrolling. The waiting period, the coverage cap and the fixed zone reduce abuse, but do not eliminate it. For forecastable hazards (hurricanes, heavy rain) the waiting period must be longer than the forecast horizon. Local attesters who vouch for each zone are a possible next step.
3. **Conservative liability estimate.** Exposure per zone includes policies that are waiting or expired, which can lower the funding factor more than necessary.
4. **Flat premium.** Every zone pays the same rate regardless of its risk, so higher-risk zones are subsidized by the rest. A per-zone risk multiplier and a per-zone exposure cap are the next step, not part of the MVP.
5. **One shared pool.** Premiums from every zone fund payouts in any zone ([decision 0007](decisions/0007-shared-pool-across-zones.md)). When several events happen at once, the first confirmed reserves its share and later events are paid pro-rata from what remains. A very large disaster can therefore pay less than 100 %.
6. **The pool can run out.** Payouts are reduced proportionally and the contract never pays more than it holds. The surplus when no disaster occurs stays in the pool; whether it is returned to members is an open decision.
7. **Regulation.** Quintti is a community fund of mutual aid, not a regulated insurance policy. A legal framework is required before it handles real money.
8. **Cash-out.** Payouts are in digital dollars. Converting them to local currency depends on ramps and cash-out agents that are not solved by the product itself.
9. **Unaudited contract.** An independent audit is required before real value is held.

## Product risks

| Risk | Likelihood | Mitigation |
|------|------------|-----------|
| Users reject paying into a pool that serves other countries | Medium | Name the protected person, explain mutual aid, show zones grouped by country; test with real users and consider per-country pools |
| Trust in attesters perceived as a weakness | Medium | State it first and present the path to a decentralized oracle |
| Location fraud | Medium | Waiting period, coverage cap, fixed zone |
| Perception of an unregulated "insurance product" | Medium | Frame it as a community fund; get legal advice before a pilot |
| Storage expiry (TTL) | Medium | Extend the lifetime of persistent entries on every interaction |
| A public data source is unavailable when an event happens | Low | Allow attesters to use more than one source and keep a reference to the original record |
| Contract bug | Low likelihood, high impact | Few functions, no administrator, fund-conservation tests, audit before real money |

## Common objections

**Why is this not a traditional insurance product?**
Traditional insurance has to assess each case, and that is the slow and expensive part. Here the payout depends on an objective, public data point and is executed by a contract. In exchange, it does not cover individual losses: it provides fast liquidity, not indemnification.

**Who says the earthquake happened? Can it be manipulated?**
A small group of known attesters confirms the event with a k-of-n quorum. This is the largest trust point and it is stated openly. The next step is a decentralized oracle or independent attesters.

**What if someone declares a false zone to collect?**
There is a waiting period, a maximum coverage amount, and the zone is fixed once enrolled. This reduces fraud for unpredictable events such as earthquakes. For forecastable hazards the waiting period must be longer. The next step is to add local attesters who vouch for the zone.

**What happens if the pool is not enough?**
The payout is reduced proportionally. The contract never promises more than it holds, and this is public. When a disaster is confirmed, the money its payouts need is reserved right away, so a second disaster confirmed before the first is paid cannot be promised the same funds.

**What is the money worth without infrastructure?**
It sits on the ledger rather than in a local bank. The payout is automatic to an address that can belong to a relative outside the zone. Turning it into cash depends on ramps and cash-out agents.

**Why would I pay into a fund that also pays people in other countries?**
Your premium buys coverage for the person you name. The pool is mutual aid, like a cooperative: disasters rarely hit every zone at once, so sharing lets a small premium back a meaningful payout, and the person you protect also gets the support of the rest. Payouts are calculated per zone (a department or state), so only people protected where the event happened are paid. If this model does not convince users, the alternatives are per-country pools or donor-directed contributions; see [decisions/0007-shared-pool-across-zones.md](decisions/0007-shared-pool-across-zones.md).

**Is it legal?**
It is a community fund of mutual aid. A real insurance product requires a regulatory framework and legal advice, which would be part of a pilot.

**How would it make money?**
Without touching the funds: a small fee on premiums, funds sponsored by organizations, or services for entities that want to finance coverage.

**What if the contract has a bug?**
It is a real risk. It is limited by design: few functions, no administrator, and fund-conservation tests. An audit is required before real money.
