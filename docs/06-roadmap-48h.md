# 6. 48-hour plan

Hackathon **Código Cordillera (BAF × Stellar)**, November 6–8, 2026, 100 % online. The exact kickoff and Demo Day times are not published on the official page; adjust once they are known.

## Priorities

| Priority | Scope |
|----------|-------|
| **Must** | Contract with enroll, fund, report event with quorum and claim, with basic tests; working frontend; demo on testnet |
| **Should** | Map by zones, attester console with a real USGS event, demo accounts, README and short video |
| **Could** | Second hazard (rainfall), automatic claims, off-ramp, passkeys, local attesters |

Rule: **do not start a "could" until the "must" is deployed and demonstrable.**

## Roles (adjust to the team)

- **Contract:** Rust/Soroban, tests, deployment.
- **Frontend:** UI, wallet and SDK integration.
- **Product/pitch:** script, slides, video, QA and visual design.

If working solo: same order, no "could" items and a minimal interface.

## Schedule

### Day 1 (Friday 6): foundations
- Kickoff; ask for the **evaluation criteria** and exact dates.
- Environment: Rust, Stellar CLI, testnet account, wallet.
- Decide the test token and the zone catalog.
- Contract: types, `initialize`, `enroll`, `fund`, reads.
- Frontend: skeleton, wallet connection and base design system.
- **Outcome:** enroll and contribute from the UI on testnet.

### Day 2 (Saturday 7): core
- Contract: `report_event` with quorum, payout factor and `claim`; contract events.
- Tests from document 3.
- Frontend: pool and events screen, attester console, states.
- Mentorship sessions: validate on-ramp/off-ramp, oracles and passkey support.
- **Outcome:** full cycle enroll → event → claim.

### Day 3 (Sunday 8): demo and submission
- Morning: fix bugs, extend TTL, rehearse with demo accounts.
- Record a backup video.
- Slides (max. 5) and at least 3 timed rehearsals.
- Push the repository with a clear README and a visible deployment.
- Reserve time before Demo Day so nothing is improvised.

## Submission checklist

- [ ] Contract deployed on testnet, address documented
- [ ] Frontend reachable by URL
- [ ] Repository with README and run instructions
- [ ] Backup demo video (1–2 minutes)
- [ ] Pitch slides
- [ ] Funded demo accounts verified
- [ ] Known limits explained (what is real and what is simulated)

## What to do when blocked

- No real token: use an own test token and say so.
- Wallet problems: continue with the CLI to demonstrate the contract while the UI is fixed.
- If pro-rata gets complicated: pay in claim order until the pool is exhausted and leave pro-rata as an improvement.
- If USGS does not respond: use a pre-recorded real event (local file) and say so.
