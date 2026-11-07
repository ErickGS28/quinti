# 5. Design system

> Status: **direction defined, values provisional.** Final token values live in the frontend token file and this document is updated when they settle. The hummingbird logo is added when it is delivered. Before building UI, apply `toolkit/skills/interface-design/` and `toolkit/skills/ui-ux-pro-max/`.

## Direction

**Cupertino: simple, calm, beautiful.** Quinti is about emergencies and family money. The interface should convey serenity, clarity and trust, not noise.

Principles:

1. **Clarity first.** One primary action per screen.
2. **Deference.** Content leads; chrome steps aside.
3. **Subtle depth.** Layers, blur and soft shadows. No heavy borders.
4. **Human language.** "Protect your family", not "create policy".
5. **Accessible by default.** AA contrast, 44 px touch targets, reduced motion respected.

## Typography

- System stack: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif`.
- *SF Pro* is not redistributable, so the system font is used with *Inter* as the web fallback.
- Large titles, a clear hierarchy in few sizes.
- Money uses tabular figures.

## Color: serene blue and green

The palette comes from the places Quinti protects: the sky and the Pacific, and the green of the Chocó rainforest. Blue carries trust and action. Green carries safety and arrival of help. Warm colors are reserved for alerts.

| Role | Provisional value | Use |
|------|-------------------|-----|
| Canvas | `#F4F8FA` | App background, a cool off-white |
| Surface | `#FFFFFF` | Cards |
| Ink | `#0F2A3D` | Primary text (deep blue-black) |
| Ink secondary | `#4A6475` | Supporting text |
| Hairline | `rgba(15, 42, 61, 0.12)` | Separators |
| Primary (blue) | `#1F6FB2` | Main actions, links, focus. Contrast on white about 5.3:1 |
| Primary soft | `#E3EFF8` | Tinted backgrounds for blue elements |
| Safe (green) | `#167A5C` | Pool, confirmed, paid. Contrast on white about 5.3:1 |
| Safe soft | `#E0F3EC` | Tinted backgrounds for green elements |
| Warning | `#B25E09` | Waiting period, expiring cover |
| Danger | `#B3261E` | Errors, failed transactions |

Rules:

- One accent per screen area: blue means "you can act", green means "this is protected or paid".
- Gradients only as a quiet sky-to-forest wash in the landing hero, never on controls.
- Dark mode from the start, same hierarchy; semantic colors slightly desaturated.
- Contrast values above were computed by hand from the hex codes and must be re-checked in the browser.

## Shape and spacing

- Large, soft corners (12 to 20 px). Grouped cards with thin separators.
- Spacing in multiples of 4 px.
- Depth strategy: soft, diffuse, low-opacity shadows plus translucent blurred materials for bars and sheets. No mixing with hard borders.

## Base components

Navigation bar with large title, grouped list, summary card, segmented control, switch, primary and secondary button, bottom sheet for confirmations, empty state, progress indicator, status badge.

## Motion

Short (150 to 300 ms), purposeful transitions: sheet entry, payment confirmation. `prefers-reduced-motion` is respected.

## Key screens

- **Protect someone:** stepped form with cost and waiting period always visible.
- **Pool and events:** zone map, balance card and timeline.
- **Payment received:** a clear, warm closing moment without excess.

## About neobrutalism.dev

It was considered and is **not adopted as the base**. Thick borders, hard shadows and saturated colors are the opposite of the Cupertino direction, and mixing both produces an incoherent interface. The brand tone (emergencies, family money) also calls for calm. If used at all later, it would only be for an isolated piece such as the attester console of the demo. See [decisions/0005-design-direction.md](decisions/0005-design-direction.md).

The site and its components were not reviewed; this assessment is based on the neobrutalist style in general.

## Identity

- Name: **Quinti** (*qínti*, hummingbird in Quechua).
- Logo: hummingbird (pending).
- Tone: warm, direct, hopeful, never dramatic.
