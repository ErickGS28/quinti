# 4. Architecture and stack

## Overview

```
 Public data source (USGS, etc.)
          │  (read by an attester, off-chain)
          ▼
 Attester console ──► Quinti contract ◄── Web frontend ◄── User
                                  │                   │
                                  │                   └── Wallet (signs)
                                  └── Token contract (USDC / test token)
```

There is no custom backend in the MVP. The frontend talks to the Soroban RPC; state lives in the contract. Reading public data and reporting the event is done by an attester, through a console in the demo.

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
| Hosting | Vercel or similar | Demo link |

Versions and binding-generation commands: confirm at `developers.stellar.org` before starting.

## Repository structure

Structure and import rules follow `toolkit/AGENTS.md` (feature-based + atomic design). If they differ, that document prevails.

```
project/
├── README.md
├── docs/                         this documentation
│   └── decisions/                design decisions (ADR)
├── contracts/
│   └── quinti/src/               lib.rs · types.rs · errors.rs · events.rs · storage.rs · logic.rs · test.rs
├── frontend/src/
│   ├── app/                      routes, composition only
│   ├── features/
│   │   ├── protect/              enroll and renew policies
│   │   ├── pool/                 balance, contributions, map
│   │   ├── events/               timeline and attester console
│   │   └── claims/               payouts
│   ├── components/               atoms · molecules · organisms · templates
│   ├── lib/                      stellar/ · wallet/ · format/
│   ├── contracts/generated/      bindings, never by hand
│   └── config/                   validated environment and constants (zones, token)
└── scripts/                      deployment and demo data
```

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
- **Short waiting period in the demo** (minutes) to show the full cycle without waiting weeks.
- **UI copy in Spanish for the target audience, isolated in dedicated copy files so an English version can be added later.** Amounts in USD and abbreviated addresses.
- **Off-ramp to local currency:** validate with anchors during the mentorship sessions; if that is not achieved, show it as a next step.
