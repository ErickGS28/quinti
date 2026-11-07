# 0007. One shared pool across zones

**Status:** Accepted for the MVP. To be revisited after talking to real users.

## Context
Zones are departments or states in several countries. Premiums from every zone go into one pool, so part of what a person pays can end up paying a claim in another zone or country. Some people may not like paying "for strangers abroad".

## Decision
Keep a single shared pool and make the model clear in the interface and the copy:

- A premium buys coverage for **the person the payer names**, not for strangers.
- The pool is mutual aid, like a cooperative. Disasters rarely hit every zone at once, so sharing lets a small premium back a meaningful payout.
- Payouts are calculated per zone, so only people protected where the event happened are paid.
- Donations are a separate, voluntary action that gives no coverage.

## Alternatives considered
- **One pool per country.** Easier to explain ("my money stays in my country") but each pool is smaller and less diversified, so payouts are smaller or premiums higher, and one large event can empty it.
- **Donor chooses a zone or country.** A good fit for donations, and a possible later feature. It needs a per-zone balance in the contract, which adds complexity not needed for the MVP.
- **Per-zone pools for premiums plus a shared reserve.** More robust, but a larger contract design.

## Consequences
- The landing page and the FAQ explain mutual aid and zones explicitly (sections "Solidaridad latinoamericana" and the question "¿Mi cuota ayuda a personas de otros países?").
- Validate with users whether people accept a shared pool. If not, per-country pools or donor-directed contributions are the next options.
- The contract design already computes the funding factor per event, so moving to per-zone balances later changes storage, not the payout rules.
