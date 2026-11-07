# Quintti

> Community protection against natural disasters. Small, fast and direct, like a hummingbird.

**Quintti** (*qínti*, hummingbird in Quechua) is a community fund that automatically pays digital dollars to families in a zone hit by a natural disaster. No forms, no assessments: when public data confirms the event, a Stellar contract sends the money. Anyone living abroad can protect their family with a small monthly premium.

## Status

Interactive prototype running on simulated data (see [frontend/README.md](frontend/README.md)). The Soroban contract is not written yet. Testnet only. It is not a regulated insurance product and is not ready for real money.

## How it works

1. **You protect:** you enroll a relative in their zone and pay a small premium.
2. **The event is confirmed:** attesters report an earthquake (or another hazard) using public data.
3. **The contract pays:** the money reaches the address fixed in advance, within minutes.

## Stack

- **Contract:** Rust + Soroban (Stellar), planned.
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind, design inspired by Cupertino. Built.
- **Wallet:** simulated in the prototype; Freighter planned (passkeys as an improvement).
- **Network:** Stellar testnet.

## Run the prototype

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 for the presentation page and http://localhost:3000/app for the prototype.

## Documentation

Start with [docs/00-idea.md](docs/00-idea.md). The full index is in [docs/README.md](docs/README.md).

## Structure

```
docs/         documentation and decisions
contracts/    Soroban contract (coming soon)
frontend/     Next.js web app: presentation page and interactive prototype
scripts/      deployment and demo data (coming soon)
```

## Team and license

Team and license: to be defined.
