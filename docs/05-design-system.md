# 5. Design system

> Status: **implemented in the prototype.** The source of truth for values is `frontend/src/app/globals.css`; this document describes the intent. The logo is a traced prototype of the delivered artwork and will be replaced when the final version arrives. Before changing UI, apply `toolkit/skills/interface-design/` and `toolkit/skills/ui-ux-pro-max/`.

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

## Color: green for action, deep teal for titles

The brand palette is `#004E64`, `#00A5CF`, `#9FFFCB`, `#25A18E` and `#7AE582`. The interface is light only: white is friendlier, so the canvas is white and color is used for accents. The greens carry action and recovery; the deep teal carries titles, links and structure.

Tokens are named after the product's world, not after their appearance. Source of truth: `frontend/src/app/globals.css`.

| Token | Value | Use |
|-------|-------|-----|
| `canvas` | `#FFFFFF` | Page background |
| `mist` | `#F2F9FB` | Tinted bands and inner surfaces |
| `cloud` | `#FFFFFF` | Cards and sheets |
| `ink` | `#0A3342` | Body text |
| `ink-soft` / `ink-faint` | `#3F6372` / `#577684` | Supporting and tertiary text |
| `hairline` | `rgb(0 78 100 / 0.12)` | Separators |
| `lagoon` | `#004E64` | Titles, links, the bird in the logo. Contrast on white about 9:1 |
| `leaf` / `leaf-strong` | `#7AE582` / `#62D46D` | Main buttons, active menu item, scroll-to-top button. Text on it is `on-leaf` (`#003B4D`), about 6:1 |
| `canopy` | `#25A18E` | Green fills and accents, scrollbar, progress. Not used for small text (about 3:1 on white) |
| `canopy-strong` / `canopy-deep` | `#1B7A6B` / `#14604F` | Green text, the "execute payouts" button and its hover |
| `canopy-soft` | `#E5FBEE` | Tinted backgrounds for green elements, secondary buttons |
| `sky` | `#00A5CF` | Decorative accent: ripples, map dots. Not used for text (about 2.9:1) |
| `lagoon-soft` | `#E1F4F9` | Tinted backgrounds for informational elements |
| `mint` | `#9FFFCB` | Washes and text selection |
| `clay` | `#A35508` | Cautions: waiting period, partial funding |
| `ember` | `#B3261E` | Errors |

Rules:

- Green means "you can act" and "this is protected or paid". Deep teal means "this is a title or a link".
- The bright palette colors fail contrast for small text, so text uses `lagoon`, `canopy-strong` or `on-leaf`.
- Gradients only as a quiet wash of mint, leaf and sky behind the top of the landing page, never on controls.
- No dark mode: the interface stays light regardless of the system setting.
- The scrollbar thumb is `canopy` (`scrollbar-color`, with a WebKit fallback).
- Contrast values were computed by hand from the hex codes and have not been audited with a tool.

## Logo

A hummingbird inside an open ring. The ring is a gradient from `#7AE582` to `#25A18E` and the bird is `#004E64`. The mark spins one full turn when the mark, or the logo group it belongs to, is hovered; reduced motion disables it. The vector in `frontend/src/components/atoms/brand-mark-paths.ts` and `frontend/public/quinti-logo.svg` was traced automatically from the prototype image, so its edges are slightly irregular at large sizes. Replace it with the designer's vector when available.

## Navigation and page chrome

The logo is not part of the menu.

- **Landing page:** the floating menu comes first, at the very top, with the section links centered and no button (people reach the app by its route). The menu hugs its four links instead of stretching. The hero sits right below it and is deliberately minimal and centered: logo, large name, one line of three words, one short paragraph and two actions. On load the name comes into focus letter by letter (pure CSS) and the rest rises in after it; reduced motion shows everything at once. Sizes and gaps in the hero follow the window height, so the buttons keep breathing room at any zoom level.
- **App:** the logo sits at the top left of a header, next to the account, and the menu floats under it.
- **Menu:** a rounded bar at 75 to 80% of the width. On phones it floats above the bottom edge. On the landing page only the first and last links fit next to the button on small screens.
- **Scroll to top:** a round green button at the bottom left, visible after scrolling about 480 px. In the app it sits above the bottom menu on phones.
## Shape and spacing

- Large, soft corners (12 to 20 px). Grouped cards with thin separators.
- Spacing in multiples of 4 px.
- Depth strategy: soft, diffuse, low-opacity shadows plus translucent blurred materials for bars and sheets. No mixing with hard borders.

## Base components

Floating rounded menu (top on large screens, bottom on phones), large page titles, card, option cards (radio group), segmented control, text field with hint and error, primary, safe, soft and ghost buttons, bottom sheet for confirmations (native dialog), empty and error states, progress bar, status badge, inline notice.

## Motion

Short (150 to 300 ms), purposeful transitions: sheet entry, payment confirmation. `prefers-reduced-motion` is respected.

## Key screens

- **Protect someone:** stepped form with cost and waiting period always visible.
- **Pool and events:** zone map, balance card and timeline.
- **Payment received:** a clear, warm closing moment without excess.

## About neobrutalism.dev

It was considered and is **not adopted as the base**. Thick borders, hard shadows and saturated colors are the opposite of the Cupertino direction, and mixing both produces an incoherent interface. The brand tone (emergencies, family money) also calls for calm. If used at all later, it would only be for an isolated piece such as the attester console of the demo. See [decisions/0005-design-direction.md](decisions/0005-design-direction.md).

The site and its components were not reviewed; this assessment is based on the neobrutalist style in general.

## Signature: the ripple

Concentric rings that spread from a point. They read as a seismic wave, a ripple on water and a hovering wing, and they echo the open ring of the logo. They appear in the landing hero, on the zone map while an event is open (amber) or confirmed (green), and on the "payment sent" and "protected" moments. They are decorative, hidden from assistive technology, and become static rings when reduced motion is requested.

## Identity

- Name: **Quinti** (*qínti*, hummingbird in Quechua).
- Logo: see the Logo section above.
- Tone: warm, direct, hopeful, never dramatic.
