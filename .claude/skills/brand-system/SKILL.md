---
name: brand-system
description: The Burgundy Atelier design system — colours, typography, spacing rhythm, grid, and motion tokens. Load before any colour, type, spacing, or layout decision, before adding a Tailwind utility, or whenever a component needs a value that is not yet a token. This is the single source of truth; components never carry raw values.
---

# Brand system

Everything visual resolves through these tokens. If a value is not here, add it here first, then
use it. No component may contain a raw hex or an arbitrary `[value]` class.

## Palette

Cream and rose carry the page. Burgundy is structural: it owns the statement band, the footer, and
the primary button — nothing decorative.

| Token | Hex | Role |
| --- | --- | --- |
| `cream` | `#FBF6F1` | Page ground |
| `rose-soft` | `#F9EDEF` | Alternate section panel |
| `rose` | `#F3DFE2` | Hero panel, image beds |
| `burgundy` | `#5C1427` | Headings, links, primary button, statement band |
| `burgundy-deep` | `#44101D` | Footer, pressed state |
| `ink` | `#2A1E22` | Body type |
| `muted` | `#6D5B60` | Captions, secondary type — 5.5:1 on cream |
| `line` | `#E4D0D4` | Hairlines and dividers |

Rules:

- Body copy is `ink` at 85–100%. Never pure black.
- `muted` is for captions and labels only, never for paragraphs.
- Burgundy on cream is 10.6:1; rose on burgundy is 9.4:1. Both pass AA.
- No second accent colour. The product photography supplies colour.
- No gradients in UI. The only gradient permitted is the hero scrim used for text legibility.

## Typography

Two families. Cormorant Garamond is the voice; Jost is the infrastructure.

| Token | Family | Use |
| --- | --- | --- |
| `font-display` | **Cormorant Garamond** 300/400/500 + italic | Headlines, product names, quotes |
| `font-sans` | **Jost** 300/400/500 | Body, navigation, buttons, captions |

- Display type is **light (300)** at large sizes, with italic used for one emphasis word — never a
  whole headline.
- Headlines are Title Case or caps in navigation; product names are UPPERCASE.
- Labels are 11px, uppercase, tracked `0.26em`.
- The logo is uppercase serif, tracked `0.14em`, with a 9px sans subline tracked `0.5em`.

**Scale**

```
display-xl   clamp(2.75rem, 6vw, 5.25rem)   hero
display-lg   clamp(2rem, 4vw, 3rem)         section heads
display-md   clamp(1.5rem, 2.6vw, 2rem)     product titles
body-lg      1.0625rem / 1.7                intros
body         1rem / 1.75                    default
caption      0.6875rem, tracking 0.26em     labels
price        0.8125rem, tracking 0.04em     product prices
micro        0.5625rem, tracking 0.5em      logo subline
```

Measure: 38–52ch. Never full-width paragraphs on desktop.

## Spacing and layout

- Page container: **1180px**, 20px gutters on mobile, 24px on desktop.
- Section rhythm is fluid and never uniform: `section-sm` 56→96px · `section-md` 72→112px ·
  `section-lg` 80→128px (mobile→desktop).
- Hero is a two-column split: text left on rose, image right at 3:4.
- Section heads are **centred**: serif heading + a 48px burgundy rule beneath.
- Product grids: 4-up on the home page, 3-up on shop, 2-up on mobile.

## Components

- **Buttons:** rectangular, no radius, 55px tall. Solid burgundy with rose text; ghost is burgundy
  border with transparent fill. Both invert on hover. Uppercase caption labels, Jost 300.
- **Text links:** underlined caption label with an arrow. Use these for tertiary actions so a
  boxed button means something.
- **Catalogue numbers:** `01`, `02` in Cormorant old-style figures beside product names.
- **Radii:** 0 everywhere. Circles only for icons.
- **Borders:** 1px `line` on cream; `rose/20` on burgundy.
- **Shadows:** none.
- **Focus:** 2px burgundy, 3px offset.

## Anti-patterns

- Burgundy used as a card background or a tint behind content.
- A gradient anywhere except the hero scrim.
- Rounded corners, drop shadows, glass blur.
- More than one italic word in a headline.
- Body copy in `muted`.
- Mixing a third typeface in "for hierarchy".
