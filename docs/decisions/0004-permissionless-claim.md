# 0004. Permissionless claim to a fixed address

**Status:** Accepted

## Context
After a disaster, the beneficiary may have no signal, may have lost their phone, or may be unable to sign. Requiring their signature to claim contradicts the goal of speed.

## Decision
`claim(event, policy)` can be called by **anyone**. The money can only go to the payout address (`payout_to`) fixed when the policy was enrolled, which can belong to a relative outside the zone.

## Why
- An automated service, the sponsor or a volunteer can execute claims without risk of diversion.
- It lets the money arrive without any action from the beneficiary.
- It avoids iterating over all policies within a single transaction.

## Consequences
- It must be tested that nobody can redirect the payout.
- The payout address and the zone are immutable after enrollment.
- A mistake when choosing the payout address cannot be corrected; the interface must confirm it clearly.
