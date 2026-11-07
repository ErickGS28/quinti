# 0003. Trusted attesters with quorum in the MVP

**Status:** Accepted (MVP only)

## Context
A contract cannot read an external source such as USGS on its own. Someone has to bring the data on-chain.

## Decision
A small, fixed set of known attesters reports the event. It is confirmed with a k-of-n quorum (for example, 2 of 3). The set and the quorum are fixed when the fund is initialized and do not change.

## Alternatives considered
- **Decentralized oracle:** more robust, but its availability and its coverage of disaster data are not verified, and it would add scope before a first release.
- **A single attester:** simpler, but a single point of failure and easy to challenge.

## Consequences
- This is the largest trust point in the design and it is stated openly.
- Evolution path: decentralized oracle or independent attesters (local organizations, universities, geological services).
- Check whether a suitable oracle exists in the ecosystem.
