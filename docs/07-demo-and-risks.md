# 7. Demo, judge questions and risks

## Demo script (approx. 3 minutes)

**Setup beforehand:** funded testnet accounts (sponsor, beneficiaries, donor, 3 attesters), a pool already started with a waiting period of a few minutes, and a real USGS event chosen in advance.

1. **Hook (20 s).** "Luz lives in Chocó. When a strong earthquake hits, insurance takes weeks, and the village bank may not open."
2. **Protect (30 s).** Andrés, her son living abroad, enrolls her in the zone, chooses a coverage amount and pays the first premium. The pool visibly grows. It is shown that he can set the payout to a sister outside the zone.
3. **Contribution (15 s).** A donor contributes to the pool; it is public.
4. **The event (40 s).** The real earthquake is shown in the public source. Two attesters report it; on the second, the contract **confirms** it.
5. **The payout (40 s).** The claim is executed; the beneficiary's wallet receives the money within seconds. The transaction is shown in the explorer.
6. **Transparency (20 s).** What is real (contract, payouts, data) and what is simulated (trusted attesters, on-ramp/off-ramp to local currency).
7. **Closing (15 s).** "Small, fast and direct, like a hummingbird."

**Fallback:** recorded video of the flow, and the attester console with a pre-recorded event.

## Hard questions and answers

**Why is this not a traditional insurance product?**
Traditional insurance has to assess each case, and that is the slow and expensive part. Here the payout depends on an objective, public data point and is executed by a contract. In exchange, it does not cover individual losses: it provides fast liquidity, not indemnification.

**Who says the earthquake happened? Can it be manipulated?**
In the MVP, a small group of known attesters confirms the event with a k-of-n quorum. This is the largest trust point and it is stated openly. The next step is a decentralized oracle or independent attesters.

**What if someone declares a false zone to collect?**
There is a waiting period, a maximum coverage amount, and the zone is fixed once enrolled. This reduces fraud for unpredictable events such as earthquakes. For forecastable hazards the waiting period must be longer. The next step is to add local attesters who vouch for the zone.

**What happens if the pool is not enough?**
The payout is reduced proportionally. The contract never promises more than it holds, and this is public.

**What is the money worth without infrastructure?**
It sits on the ledger rather than in a local bank. The payout is automatic to an address that can belong to a relative outside the zone. Turning it into cash depends on ramps and cash-out agents; this is validated with anchors and is not solved today.

**Is it legal?**
It is a community fund prototype on testnet. A real insurance product requires a regulatory framework and legal advice, which would be part of a pilot.

**How would it make money?**
Without touching the funds: a small fee on premiums, funds sponsored by organizations, or services for entities that want to finance coverage. It is not the focus of the hackathon.

**What if the contract has a bug?**
It is a real risk. It is limited by design: few functions, no administrator, and fund-conservation tests. An audit would be needed before real money.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|-----------|
| Soroban/Rust learning curve | High | Contract first; official examples; mentoring sessions |
| Excessive scope | High | Must/should/could rule |
| Trust in attesters perceived as a weakness | Medium | State it first and present the path to a decentralized oracle |
| Location fraud | Medium | Waiting period, coverage cap, fixed zone |
| Wallet or test network problems | Medium | Prepared accounts, video, CLI demo |
| Storage expiry (TTL) | Medium | Extend lifetime on interaction |
| Perception of an unregulated "insurance product" | Medium | Frame as a community fund and prototype |
| Asset fragmentation on testnet | Medium | A single controlled token, declared |
| USGS or other sources go down during the demo | Low | Pre-recorded event as fallback |
| Little time to polish the pitch | Medium | Reserve the final half day for rehearsal |

## What convinces the judges (hypothesis)

The official page does not publish criteria. Working assumption, to be confirmed at kickoff:
1. A real, emotionally clear problem.
2. Genuine use of Soroban (rules, quorum, automatic payout), not just moving a token.
3. A smooth demo, with a real event and money moving.
4. Honesty about what is simulated and the next steps.
5. Careful design that is understandable in seconds.
