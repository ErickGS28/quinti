# 0002. Generic triggers per hazard

**Status:** Accepted

## Context
The idea started with earthquakes, but it must also work for other disasters (extreme rainfall, hurricanes, fires).

## Decision
The contract handles one generic rule: `hazard + measured value + zone + threshold → payout percentage`. It contains no logic specific to any hazard.

## Why
- A single logic serves every case.
- The demo can show a second hazard type without rewriting the contract.
- It keeps the contract small and auditable.

## Consequences
- Hazards are added as enum values and configuration rules.
- The MVP implements **earthquake**; **extreme rainfall** is an extra.
- Computing the value and the affected zones is done off-chain, by the attesters.
