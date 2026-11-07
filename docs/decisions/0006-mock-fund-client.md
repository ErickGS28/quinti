# 0006. Prototype runs on a mock fund client

**Status:** Accepted (until the contract is deployed)

## Context
The contract does not exist yet, but the team needs a visual, clickable prototype now to align on the product and to exercise the whole flow.

## Decision
The frontend depends on a `FundClient` interface and a `WalletAdapter` interface. The prototype implements them with an in-memory mock that applies the same rules as the contract design (premium, payout share, pro-rata factor, quorum, eligibility, waiting period) and persists to local storage. The rules live in pure functions with unit tests.

## Why
- The whole flow (protect, confirm, pay) can be shown and tested without a network.
- The UI is built against the final shape of the data, so swapping the mock for the real client does not touch components.
- Rules in one place make it easy to check that the contract and the prototype agree.

## Consequences
- Nothing in the prototype touches the blockchain. This is documented in the README files; the interface presents the product as a finished experience.
- When the contract exists: generate bindings, implement `FundClient` on top of them with simulation before signing and bounded polling, implement `WalletAdapter` with Freighter, and change the two factory functions (`get-fund-client.ts`, `wallet-store.ts`).
- Any rule change must be made in the contract design, the pure rules and their tests together.
- Open question carried to integration: the prototype identifies a protected person by name only, while the contract design stores a `beneficiary` address. Decide whether that address is needed on-chain.
