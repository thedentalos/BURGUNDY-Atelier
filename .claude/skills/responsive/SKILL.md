---
name: responsive
description: Responsive standards for Burgundy Atelier — the breakpoint matrix, mobile-first method, fluid sizing, container queries, touch targets, and the failure checklist. Load before any layout work or breakpoint change, and when reviewing a page on smaller screens.
---

# Responsive

Mobile is the primary design, not the fallback. Most of this audience will see the site on a phone.
A layout that "works" at 375px by collapsing is not finished.

## Breakpoints

| Name | Width | Represents |
| --- | --- | --- |
| `xs` | 320 | Smallest supported. Hard floor. |
| `sm` | 375 | The design target. Every page is designed here first. |
| `md` | 768 | Tablet portrait |
| `lg` | 1024 | Tablet landscape / small laptop. Grid becomes 12-col |
| `xl` | 1280 | Desktop |
| `2xl` | 1536 | Large desktop — content caps, margins grow |

Tailwind defaults are close enough; use `sm/md/lg/xl/2xl` and add `xs` only where needed. Do not
invent a breakpoint at 900px because one component was awkward.

## Method

1. Lay out at 375px first. Decide what is *removed*, not just what is stacked. A desktop section
   with four items may become two items and a "view all" on mobile — that is a design decision.
2. Expand at `md`, `lg`, `xl`. Each step should change the *composition*, not just the column count.
3. Cap the content at 1440px; beyond that, margins absorb the width.

## Fluid sizing

Use `clamp()` for type and large spacing so there are no jumps between breakpoints.

```css
font-size: clamp(2rem, 5vw + 1rem, 4rem);
padding-block: clamp(3rem, 8vw, 8rem);
```

Rules:
- Never fluid-size body text below `1rem` at 375px.
- Don't clamp a value whose minimum and maximum are within 10% — just set it.
- Test at the intermediate widths (600px, 900px) where `vw` math misbehaves.

## Layout techniques

- **Grid:** CSS grid with named areas for page-level composition; flex for one-dimensional rows.
- **Container queries** for components that appear at different widths in different places
  (product card in a 3-up grid vs. in a 5-up strip). `@container (min-width: 30rem)`.
- **Aspect ratio** on every image wrapper so nothing reflows.
- **`svh`, not `vh`** for full-height heroes — `100svh` avoids the mobile browser chrome jump. Use
  `dvh` only where the change in height should be reflected.
- **`min()`, `max()`** for widths that should never exceed available space.

## Touch

- Interactive targets **≥ 44×44 CSS px**, with ≥ 8px between adjacent targets.
- Links inside paragraphs are exempt but must still be clearly distinguishable.
- Hover is an enhancement. Anything revealed on hover (second image, quick add, size hint) must be
  reachable by tap and by keyboard. On touch, a first tap may reveal, a second activate — but the
  target must be obvious.
- No drag-only interactions without a button alternative.

## Common failures

| Failure | Cause | Fix |
| --- | --- | --- |
| Horizontal scroll | Fixed-width element, `100vw` with scrollbar, an absolutely positioned halo | `overflow-x: clip` on the wrapper is a band-aid — find the element |
| Text clipped | `whitespace-nowrap` on a headline | Let it wrap, or reduce the clamp minimum |
| Sticky header covers content | Missing `scroll-margin-top` on anchors | Add it per anchor |
| Menu unreachable | `position: fixed` inside a transformed ancestor | Portal it |
| Tiny tap targets | Icon buttons at 20px with no padding | 44px hit area, icon stays 20px |
| Image distortion | `width/height` without `object-fit` | `object-cover` + aspect ratio |
| 200% zoom breaks | Fixed `px` heights, `overflow: hidden` | Use `min-height`, allow reflow |
| iOS safe-area overlap | Fixed footer/CTA | `env(safe-area-inset-bottom)` |
| Orphan word in headline | No balancing | `text-wrap: balance` |
| Desktop nav crammed at 768 | Breakpoint too late | Collapse to the mobile menu at `lg` |

## The 375px review

Before calling a layout done, look at it at 375 with a critical eye:

- Does it have its own composition, or is it the desktop layout in one column?
- Is the first screen one clear idea?
- Is the display type still large enough to be the brand, or has it shrunk to fit?
- Are margins varied, or is everything inset by the same 20px?
- Is there a full-bleed element somewhere, so the page touches the screen edge at least once?

## Testing

- Real device or DevTools device emulation at 320, 375, 430, 768, 1024, 1440, 1920.
- 375 at 200% browser zoom — the single most reliable detector of breakage.
- Landscape phone (667×375) at least once.
- Assert `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.
