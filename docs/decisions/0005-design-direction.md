# 0005. Design direction: Cupertino

**Status:** Accepted (can be changed if the team decides so)

## Context
The request was for a flawless, simple and beautiful design based on Cupertino, with neobrutalism.dev as possible support.

## Decision
The visual base is **Cupertino** (Apple HIG style): system typography, soft corners, subtle blur, grouped lists and spring motion. Neobrutalism is not adopted as the base.

Color direction: serene blue and green (see 05-design-system.md).

## Why
- They are opposite styles: Cupertino is fine, translucent and soft; neobrutalism uses thick borders, hard shadows and saturated colors. Mixing them produces incoherence.
- The subject (emergencies and families' money) calls for calm and trust.
- Cupertino reduces design decisions and looks polished with little work.

## Consequences
- The system font is used with *Inter* as fallback; *SF Pro* is not redistributed.
- Neobrutalism could only be used, if at all, in an isolated piece such as the attester console.
- Pending: brand accent based on the hummingbird logo.
- Not reviewed against neobrutalism.dev; the assessment is based on the style in general.
