# 4. Architecture and stack

## Overview

```
 Public data source (USGS, etc.)
          │  (read by an attester, off-chain)
          ▼
 Attester console ──► Quintti contract ◄── Web frontend ◄── User
                                  │                   │
                                  │                   └── Wallet (signs)
                                  └── Token contract (USDC / test token)
```

There is no custom backend in the MVP. The frontend talks to the Soroban RPC; state lives in the contract. Reading public data and reporting the event is done by an attester, through the verifiers panel.

## Components

| Component | Technology | Notes |
|-----------|-----------|-------|
| Contract | Rust + `soroban-sdk` | See [03-contract-design.md](03-contract-design.md) |
| CLI and deployment | Stellar CLI | Build, deploy and test on testnet |
| Frontend | TypeScript + React (Next.js or Vite) | Per `toolkit/playbooks/frontend.md` |
| Wallet | Freighter (MVP); passkeys as an improvement | Verify the current support status |
| Client SDK | `@stellar/stellar-sdk` | Simulate, sign, submit, read state |
| Styles and UI | See [05-design-system.md](05-design-system.md) | Cupertino-style visual direction |
| Event data | USGS (earthquakes) | Public query; verify format and limits |
| Token | Testnet USDC or own test token | Use a controlled one for the core flow |
| Hosting | Vercel or similar | Public URL |

Versions and binding-generation commands: confirm at `developers.stellar.org` before starting.

## Repository structure

Structure and import rules follow `toolkit/AGENTS.md` (feature-based + atomic design). If they differ, that document prevails.

```
project/
├── README.md
├── docs/                         this documentation
│   └── decisions/                design decisions (ADR)
├── contracts/
│   └── quintti/src/              lib.rs · types.rs · errors.rs · events.rs · storage.rs · logic.rs · test.rs
├── frontend/src/                 Next.js (App Router), see frontend/README.md
│   ├── app/                      routes, composition only: / (landing), /como-funciona/* (guides) and /app/* (prototype)
│   ├── features/
│   │   ├── landing/              presentation page (header, floating menu, explanation, FAQ), fully static
│   │   ├── flows/                "how it works" guide pages with a visual timeline per way of helping
│   │   ├── demo-mode/            session data reset
│   │   ├── policies/             the user's protections and received payouts
│   │   ├── protect/              three-step enrollment wizard and confirmation sheet
│   │   ├── pool/                 balance, zone map, contributions
│   │   └── events/               event timeline and the demo attester console
│   ├── components/               atoms · molecules · organisms · templates
│   ├── lib/
│   │   ├── fund/                 domain types, pure rules, FundClient interface, mock client
│   │   ├── wallet/               WalletAdapter interface, mock adapter, session store
│   │   ├── format/               amounts, addresses, time
│   │   ├── clock/ · demo/ · ui/  time source, demo identities, class names
│   ├── contracts/generated/      bindings, never by hand (added with the contract)
│   └── config/                   constants
└── scripts/                      deployment and demo data
```

Payouts are executed from the attester console in the prototype (`events/`); there is no separate `claims/` feature until an automatic payout service exists.

## Prototype data layer

The prototype runs on a local mock that follows the contract rules, so the whole flow can be shown without a deployed contract:

- `lib/fund/rules.ts` holds the pure rules (premium, payout share, pro-rata factor, eligibility). They mirror [03-contract-design.md](03-contract-design.md).
- `lib/fund/fund-client.ts` defines the `FundClient` interface the UI depends on. `lib/fund/mock/` implements it in memory and persists to local storage.
- `lib/wallet/wallet-adapter.ts` defines the wallet interface. A simulated adapter stands in for Freighter.
- To go live, replace the implementation returned by `get-fund-client.ts` with a client built on the generated contract bindings, and the adapter in `wallet-store.ts` with Freighter. Components and features do not change. See [decisions/0006-mock-fund-client.md](decisions/0006-mock-fund-client.md).

## Technical flow of a transaction

1. The frontend builds the contract call.
2. It is **simulated** first (shows errors before signing).
3. The wallet signs.
4. It is submitted and the status is polled with a retry limit.
5. State is refreshed by reading the contract.

## Technical decisions

- **No backend** in the MVP; an automatic claim service is optional.
- **A single controlled token** for the core flow. Testnet assets are fragmented; anything simulated is stated openly.
- **Prepared demo accounts and data** (sponsor, beneficiaries, donor, 3 attesters) so the demo does not depend on live faucets.
- **Short waiting period in the test configuration** (minutes) so the full cycle can be exercised without waiting weeks.
- **UI copy in Spanish for the target audience, isolated in dedicated copy files so an English version can be added later.** Amounts in USD and abbreviated addresses.
- **Off-ramp to local currency:** validate with anchors; until then it stays a next step.
