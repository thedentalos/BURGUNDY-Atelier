---
name: anti-slop
description: The anti-AI-slop standard for Burgundy Atelier. Load before building any UI and before reviewing any UI. Contains the banned-pattern list with replacements, the specificity test, and the 8-point rubric the design director scores against. This is the skill that keeps the site from looking like a template.
---

# Anti-slop

AI slop is not poor craft. It is **default-seeking**: the model, given no constraint, produces the
statistically average website. Every rule here removes a degree of freedom so the average cannot
happen.

The governing test is one question:

> **Could this page belong to another clothing brand, unchanged?**

If yes, it is not a design. It is a default.

---

## Banned patterns — visual

Each of these is a hard fail. The right column is the replacement, not a suggestion.

| Banned | Replacement |
| --- | --- |
| Purple/blue gradient anywhere | Flat color from the palette |
| `backdrop-blur` glass cards | Opaque `paper` surface, or no surface |
| `rounded-xl` / `rounded-2xl` on cards, images, inputs | Radius 0. Circular only for arrows and dots |
| Three-column feature cards with a Lucide icon in a tinted circle | Delete it. If the content is real, set it as text in the grid |
| Centered hero: headline + subhead + two buttons + floating mockup | Image-led hero, type positioned off-center or overlapping the image edge |
| Emoji as icons | No icon, or an inline SVG drawn for this brand |
| Drop shadows on every surface | One hairline border, or nothing |
| `hover:scale-105` on cards | A crop change or a second image, never a transform |
| `bg-gray-50` alternating sections | Whitespace. Change the background only when the content changes register |
| "Trusted by" logo marquee | Delete it |
| Badge pills above headings ("✨ New") | Put the word in the headline |
| Blob/wave SVG dividers | A straight edge or a full-bleed image |
| Icon + label + paragraph, repeated four times | Vary the rhythm; one may be text-only |
| Autoplaying carousel with dots | A still image, or a deliberate scroll-snap row |
| Cookie-cutter FAQ accordion with plus signs | Plain question/answer text, or omit |
| Floating "chat with us" bubble over the hero | Nothing, or a line in the footer |

## Banned patterns — structure

- Every section is a centered `max-w-6xl` container with identical padding. **Vary the container.**
  One section full-bleed, one at 7/12, one at 5/12 offset right.
- Symmetric two-column image/text alternating forever. Use an asymmetric split at least once.
- Uniform 96px between every section. See the spacing rhythm in `brand-system`.
- A grid where every tile is identical. One tile should be double-width or double-height.
- Navigation with logo-left, five links-center, two icons-right *and nothing else*. Mobile: make the
  menu a full-screen typographic list, not a drawer of the same links.

## Banned patterns — motion

- Scroll-triggered fade-up on every element on the page.
- Parallax on more than one element.
- Text that animates per-letter.
- Numbers that count up.
- Anything that hijacks scroll.
- A cursor follower.

Max **two** motion patterns per page. See `motion`.

## Banned lexicon — copy

Never ship these words: *elevate, curated, timeless, discover, unleash, redefine, seamless,
effortlessly chic, luxe, luxurious, premium, exclusive, one-of-a-kind, crafted for the modern,
where X meets Y, not just a X — a Y, your new favorite, step into, own the room.* No exclamation
marks. No "Introducing" / "Say hello to" / "Meet the".

Full rules in `copy-voice`.

---

## The specificity test

Run this before showing anything to a reviewer:

1. **Swap test.** Replace "Burgundy Atelier" with "Aurelia". Does anything need to change? If the
   page survives untouched, it is generic.
2. **Screenshot test.** Put the page next to three competitors. Can a stranger identify which is
   ours from the thumbnail alone?
3. **Silhouette test.** On a phone, at arm's length, is there a recognizable composition — one
   strong shape, one strong type moment — or just stacked rectangles?

---

## The rubric

The design director scores each 1–5. **Pass = average ≥ 4.0 and no score below 3.**

| # | Criterion | 1 | 3 | 5 |
| --- | --- | --- | --- | --- |
| 1 | **Specificity** | Could be any brand | Has a signature element | Unmistakably ours at thumbnail size |
| 2 | **Hierarchy** | Eye has no path | Clear but conventional | One deliberate, surprising path |
| 3 | **Type** | Type labels content | Type is well set | Type *is* the layout |
| 4 | **Image** | Images in boxes | Consistent ratios | Art-directed, edge-touching, composed with type |
| 5 | **Restraint** | Decorative noise | Mostly purposeful | Nothing present without a job |
| 6 | **Responsive** | Desktop compressed | Fits everywhere | 375px is a distinct composition |
| 7 | **Motion** | Animates everything | Two patterns, safe | Motion reveals content, never decorates |
| 8 | **Voice** | Generic marketing | On-brand | Specific, dry, unmistakably theirs |

---

## What "good" looks like here

- One strong type moment per page: a display line that runs wider than its container, or breaks
  a line where you would not expect.
- An image that touches two edges of the viewport.
- Generous emptiness — a column that holds nothing but air.
- A caption set at 11px in the corner of a full-bleed image, like a contact sheet.
- A product grid where the row lengths are 2, 3, 3, 1 — not 3, 3, 3, 3.
- A section that ends without a call to action.

## What to do when the page feels empty

The instinct is to add a card, an icon, an accent, a badge. **Do not.** Instead:

1. Increase the type size of the existing headline.
2. Increase the whitespace and let the section breathe.
3. Move one element off the grid.
4. Let one image bleed further.
5. Delete the weakest element entirely.

Emptiness is a layout problem, never a decoration problem.
