# Design audit — Burgundy Atelier

Measured on the built site at 1440 and 375, 9 Nov 2026. Numbers come from computed styles
(`scripts/audit.mjs`), not from looking at screenshots.

---

## Verdict

| # | Criterion | Score | Note |
| --- | --- | --- | --- |
| 1 | Specificity | 3 | Reads quiet-luxury, but could be any label with the name swapped |
| 2 | Hierarchy | 4 | Clear path on every page |
| 3 | Type | 4 | Well set, but uniform — no typographic surprise |
| 4 | Image | 3 | Consistent 3:4, but no art direction across backgrounds |
| 5 | Restraint | 4 | Restrained, except the announcement bar |
| 6 | Responsive | 3 | Mobile keeps desktop spacing; hero taller than the phone |
| 7 | Motion | 3 | Hover only; safe but flat |
| 8 | Voice | 4 | Specific, dry, on-brand |

**Average 3.5 — REVISE.** *Applied 9 Nov: Tier 1, Tier 2 and the Tier 3 details below.* The foundation is right. The gap between "nice template" and
"expensive" is almost entirely in spacing, hierarchy of actions, and one loud component.

---

## Measured system

| Element | Desktop 1440 | Mobile 375 |
| --- | --- | --- |
| Container | 1132px content (1180 − 24×2) | 335px |
| Header | 81px | 81px |
| Announcement | 40px | 40px |
| Hero height | **702px** (78% of viewport) | **997px** (123% of viewport) |
| H1 | 84px / 85.7 / 300 | 44px / 44.9 / 300 |
| Section H2 | 48px / 52.8 | 48px / 52.8 |
| Body | 16px / 28 (1.75) | 16px / 28 |
| Hero paragraph | 17px / 28.9, 388px wide | 17px, 327px |
| Product name | 20px serif, no tracking | 20px |
| Price | **11px, 2.9px tracking** | same |
| Buttons | **51px tall**, 16/36 padding, 11px, 2.9px tracking | 281×51 |
| Product grid | 4 × 265px, gap **24 / 48** | 2 × 157.5px, gap **20 / 48** |
| Section padding | 110 / 72 / 110 / 110 | **110 / 72 / 110 / 110** |
| Footer | 72 top / 40 bottom | same |

Contrast: every pair passes AA. Lowest are the footer copyright at 4.58:1 and the price at 5.9:1.

---

## What is working — do not change

- **The type pairing.** Cormorant Garamond 300 at 84px against Jost 400 at 16px is doing the
  premium work. The italic emphasis on one word is correct and should not be extended.
- **The palette.** Cream / rose / burgundy is coherent and the burgundy statement band is the
  page's best moment.
- **The header.** Centred wordmark with the 9px letterspaced subline is the most "old money"
  component on the site.
- **Button craft.** 51px height, 2.9px tracking, full invert on hover. Solid.

---

## Findings

### A. The announcement bar is the least expensive thing on the page — HIGH

`components/site-announcement.tsx`

A full-width solid burgundy strip is the first thing a visitor sees. That is the visual language of
a discount code, and it currently competes with the statement band and footer for the brand colour.
It also adds 40px to the 121px of chrome before the hero.

**Fix:** make it quiet — `bg-rose-soft`, burgundy `caption` text, 1px `line` bottom border, 34px
tall. Or remove it and move the line into the footer. Either reads more expensive than a
full-bleed burgundy bar.

### B. Mobile inherits desktop section padding — HIGH

Every section uses `py-section-md` = **110px at all widths**. On a 812px phone that is 27% of the
viewport spent in padding per section, and it is why the home page is 4,709px tall.

The `responsive` skill says mobile rhythm should be ~60% of desktop. It is currently 100%.

**Fix:** make the spacing tokens fluid:
`--spacing-section-md: clamp(4.5rem, 3rem + 4vw, 6.875rem)`.
One token change fixes every section. Desktop stays 110; mobile lands at ~72.

### C. The mobile hero is taller than the phone — HIGH

`app/page.tsx`

997px against an 812px viewport. The image does not appear until after the fold, so the hero's
only job — showing the clothes — fails on the device most customers use.

**Fix:** image `min-h-[52svh]` instead of `62svh`, text `py-12`, and reduce the gap between
headline and paragraph by 4px on mobile. Target: hero ≤ 780px at 375.

### D. Every action is a boxed button — MEDIUM

Five bordered buttons on the home page, two of them solid. When everything is a button, nothing
is emphasised. Premium fashion sites usually have **one** boxed action per page and use underlined
text links for the rest.

**Fix:**
- Hero: switch to `variant="ghost"` (outlined). A solid burgundy block competes with the photograph.
- "View all pieces" and "Read more": new tertiary link style — underlined, letterspaced, no box.
- Keep one solid button: "Message us on Instagram" in the ordering section.

### E. Prices read as labels, not prices — MEDIUM

`components/product-card.tsx` — 11px with 2.9px tracking. Tracking that wide signals a section
label. Beside a 20px product name it looks like metadata.

**Fix:** 13px, tracking `0.04em`, `muted`. Keep the name at 20px. The gap between them goes from
4px to 8px.

### F. The grid gutters are too tight for four columns — MEDIUM

24px between 265px cards. At this density the row reads as a spreadsheet. Premium 4-up grids run
30–40px gutters.

**Fix:** column gap 32px (`gap-x-8`), row gap 64px. Cards become 259px — the proportion barely
changes, the air does.

### G. Header links are imbalanced — LOW

Two links left, one right. The eye registers the asymmetry under a centred wordmark.

**Fix:** add a fourth link, `Size & Fit` → `/atelier#fit-and-care`, on the right. 2/2 balances
without inventing a page.

### H. Section rhythm is uniform — MEDIUM

110 / 72 / 110 / 110. Only the statement band varies. The `anti-slop` skill calls out uniform
section spacing specifically.

**Fix:** collection 128, statement 96, story 112, ordering 128 on desktop. Small differences read
as composition rather than as a template.

### I. The page has no editorial interruption — MEDIUM

Hero → section head → grid → band → split → centred block. Every section is a variation on
"centred heading + content". There is no moment where the eye stops.

**Fix:** one full-bleed image band between the grid and the story, 21:9, with an off-grid caption
(`Fall 2026 — The Lawn Edit`). Uses an existing photo. This is the single highest-impact addition
for the editorial feel.

### J. There is no closing wordmark — LOW

The footer opens with a 20px version of the logo. Luxury sites typically close with the brand at
display size.

**Fix:** a 72–96px wordmark above the footer columns, cream on burgundy, letterspaced.

### K. Everything is `medium` weight — LOW

Nav, captions, prices, buttons, body all sit within 400–500. There is no tonal variation in the
small type.

**Fix:** use Jost 300 for navigation and buttons (currently 400), 400 for body, 500 only for the
footer column headings. Three tones instead of one.

---

## Component additions

| Component | Why it earns its place |
| --- | --- |
| `EditorialBand` | Full-bleed image + off-grid caption. Breaks the section rhythm. |
| `TextLink` | Underlined tertiary action. Lets buttons mean something. |
| `ProductIndex` | `01 — 05` beside product names. Catalogue language, very old-money. |
| `ClosingWordmark` | Oversized footer logotype. The last impression. |
| `Announcement` (quiet variant) | Removes the discount-banner read. |

---

## Prioritised plan

**Tier 1 — the "expensive" gap (≈2 hours)**
1. Quiet announcement bar (A)
2. Fluid section spacing, mobile-correct (B)
3. Mobile hero under the fold (C)
4. Hero button → ghost; add text-link variant (D)
5. Price + grid gutter tuning (E, F)

**Tier 2 — the editorial layer (≈3 hours)**
6. Editorial image band (I)
7. Section rhythm variation (H)
8. Closing wordmark (J)
9. Header balance (G)

**Tier 3 — detail (≈1 hour)**
10. Three weights of small type (K)
11. Old-style figures for prices (`font-feature-settings: "onum"`)
12. `ProductIndex` numbers

Tier 1 alone moves the rubric from 3.5 to roughly 4.1. Tier 2 is what makes it look like a house
rather than a shop.

---

## Contradictions to resolve with the client

- The reference template (Maison Rosalie) uses a **solid burgundy announcement bar** and **solid
  buttons everywhere**. Tier 1 deliberately departs from it. If the client wants fidelity to the
  template over the premium read, A and D should be skipped.
- Photography backgrounds vary — garden green, warm interior, cool doorway. No CSS fix is allowed
  (no filters); the only real fix is shooting or selecting against a consistent background.
