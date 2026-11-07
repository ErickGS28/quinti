# Quinti

> Community protection against natural disasters. Small, fast and direct, like a hummingbird.

**Quinti** (*qínti*, hummingbird in Quechua) is a community fund that automatically pays digital dollars to families in a zone hit by a natural disaster. No forms, no assessments: when public data confirms the event, a Stellar contract sends the money. Anyone living abroad can protect their family with a small monthly premium.

Project for the **Código Cordillera (BAF × Stellar)** hackathon, November 6–8, 2026.

## Status

Prototype in preparation. Testnet only. It is not a regulated insurance product and is not ready for real money.

## How it works

1. **You protect:** you enroll a relative in their zone and pay a small premium.
2. **The event is confirmed:** attesters report an earthquake (or another hazard) using public data.
3. **The contract pays:** the money reaches the address fixed in advance, within minutes.

## Planned stack

- **Contract:** Rust + Soroban (Stellar).
- **Frontend:** TypeScript + React, design inspired by Cupertino.
- **Wallet:** Freighter (passkeys as an improvement).
- **Network:** Stellar testnet.

## Documentation

Start with [docs/00-idea.md](docs/00-idea.md). The full index is in [docs/README.md](docs/README.md).

## Structure

```
docs/         documentation and decisions
contracts/    Soroban contract (coming soon)
frontend/     web application (coming soon)
scripts/      deployment and demo data (coming soon)
```

## Team and license

Team and license: to be defined.
