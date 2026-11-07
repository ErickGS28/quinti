# 1. Vision and pitch

## Problem

Communities in seismic, flood-prone or hurricane-exposed zones across Latin America face the same pattern after a disaster:

| Problem | Consequence |
|---------|-------------|
| Traditional insurance is slow, expensive and paperwork-heavy | Low-income households almost never have it; those who do wait weeks |
| Money arrives in local accounts that may be unusable | The balance exists, but it cannot be used |
| Family abroad can only react after the disaster | Help arrives late and in a disorganized way |
| Donations are opaque | Trust erodes and nobody knows whether the money arrived |

## Solution

**Quinti** is a community protection fund with **parametric payouts**: the contract pays when a public, measurable data point crosses a threshold in a zone. It does not assess individual damage, does not ask for documents and does not depend on anyone approving a claim.

- A **small monthly premium** in digital dollars, which a relative in another country can pay.
- A **common pool** that donors can also contribute to.
- **Generic triggers**: earthquake, extreme rainfall and other hazards with public data.
- **Automatic payout** to an address fixed in advance, which can belong to a relative outside the zone.

## Value proposition

| For whom | Value |
|----------|-------|
| Family in a risk zone | Liquidity in minutes, with no paperwork, when they need it most |
| Relative abroad | Protect loved ones before the event, with a premium they can afford |
| Donor | Contribute to a pool whose rules and payouts are verifiable |

## Why Stellar and Soroban (and not web2)

The social side and the data work the same in web2. What changes is **who holds the money and who enforces the payout rule**.

| Need | Web2 / traditional insurance | Stellar + Soroban |
|------|------------------------------|-------------------|
| Payout after the event | Claim, assessment, approval | The contract pays once the event is confirmed |
| Custody of the pool | A licensed company | The contract; nobody moves funds outside the rules |
| Transparency | "Trust us" | Public rules, balance and payouts |
| Premiums of a few dollars | Fees eat the premium | Minimal network fees |
| The payer is far away | Expensive, slow international transfers | Direct payment from anywhere |
| Money that is usable after the disaster | Tied to a local bank | On the ledger; withdrawn through anchors when access exists |

Core message for the judges: **"We did not invent parametric insurance; we make it accessible, cheap and verifiable for the people who are left out today."**

## Use cases

- **Earthquake** in Chocó, Yaracuy or La Guaira: payout by magnitude and zone.
- **Extreme rainfall or flooding** in a vulnerable region.
- **Diaspora protecting their family** with a monthly premium.
- **Organization or company contributing to the pool** of a region.

## Pitch (30 seconds)

> "When an earthquake knocks down the town bank, traditional insurance takes weeks, if it exists at all. Quinti pays in minutes. A premium of a few dollars, which a son or daughter can pay from another country, protects the family. When public data confirms the earthquake in their zone, a contract on Stellar sends the money automatically, with no forms and no intermediaries. Small, fast and direct, like a hummingbird."

## Realistic scope for the hackathon

A fund that works end to end on testnet: enroll, pay a premium, contribute to the pool, confirm an event (with trusted attesters) and claim the payout, with a clear dashboard. The demo states openly what is real and what is simulated (see [07-demo-and-risks.md](07-demo-and-risks.md)).

## Positioning (internal)

*For families in risk zones in Latin America and their relatives abroad, Quinti is a community parametric fund that pays in minutes when a disaster occurs, unlike slow and exclusionary traditional insurance, because the payout is executed by a public contract based on objective data.*

Hypotheses to validate (not facts): that the diaspora would pay a premium to protect their family, and that a parametric payout is enough liquidity for the first days.
