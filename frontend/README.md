# Quinti frontend

Next.js (App Router) + TypeScript + Tailwind CSS. One app with two faces:

- `/` presentation page (static).
- `/app` interactive prototype: protect someone, see the fund, run a simulated disaster and watch the payout.

The prototype runs on a **local mock** that follows the contract rules. It does not touch the blockchain. See [docs/decisions/0006-mock-fund-client.md](../docs/decisions/0006-mock-fund-client.md).

## Run

Requires Node.js 20 or newer (developed on 24).

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build, the way to rehearse the demo:

```bash
npm run build
npm run start
```

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Development server |
| `npm run build` / `npm run start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, strict |
| `npm test` | Unit tests (Vitest), single run |

## Flow walkthrough

1. Open `/app` and connect the wallet (simulated in this build, holds no keys).
2. **Home** shows Luz, already protected in Chocó with the payout going to her aunt Marta.
3. **Protect** enrolls someone new. A new policy waits one minute (the real fund would wait days) before it covers events.
4. **Verificadores**: register an earthquake as Verifier 1, confirm it as Verifier 2, then execute the payouts.
5. **Home** now shows the payout received. **Fondo** shows the new balance and the event.
6. **Restablecer datos** (bottom of the Verificadores page) restores the initial state.

## Structure

Follows the project layering in `toolkit/AGENTS.md`. Imports go downward only:

```
app → features → components → lib → config
```

```
src/
  app/            routes only
  features/       landing · wallet-session · demo-mode · policies · protect · pool · events
  components/     atoms · molecules · organisms · templates (domain-agnostic)
  lib/            fund (rules, FundClient, mock) · wallet · format · clock · demo · ui
  config/         constants
```

Each feature exposes its public API through `index.ts`. UI text is Spanish and lives in each feature's `copy.ts`, so an English version can be added later.

## Going live

Replace two factory functions, nothing else:

- `lib/fund/get-fund-client.ts`: return a client built on the generated contract bindings (simulate before signing, poll with a retry limit).
- `lib/wallet/wallet-store.ts`: return a Freighter-backed `WalletAdapter`.

## Known limits

- Everything is simulated: wallet, attesters, data and time. Nothing is on-chain.
- The address check is format-only (no checksum). Use the SDK's StrKey validation once the SDK is added.
- Component and end-to-end tests are not written yet; only logic is covered by unit tests.
- The logo vector was traced automatically from the prototype image.
- `npm audit` reports moderate findings in the lint toolchain (dev dependencies only). The suggested fix is a downgrade of `eslint-config-next`, so it was left as is.
