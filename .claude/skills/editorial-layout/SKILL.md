---
name: editorial-layout
description: Fashion-editorial composition principles for Burgundy Atelier — how to lay out heroes, lookbooks, collection pages, product pages, and story sections so the site reads as a lookbook rather than a product grid. Load when composing any page or section layout, or when a layout feels generic.
---

# Editorial layout

The site is a magazine that happens to sell clothes. Composition is what separates that from a
catalog. This skill is about *where things sit*, not what color they are.

## The five moves

Use at least two per page. Never all five — that is noise, not editorials.

**1. The bite.** A full-bleed image where the headline overlaps the image edge and runs past it
onto the ivory ground. Type is not contained by the image; it crosses the boundary.

**2. The empty column.** A text block occupies 5 of 12 columns and the other 7 hold nothing but
image or air. Deliberate emptiness is the most reliable luxury signal on the web.

**3. The off-grid caption.** A small caption — collection name, season, location — sits at 11px,
aligned optically rather than to the grid, in the lower-left of a full-bleed image. Like a contact
sheet annotation.

**4. The interruption.** A run of product images is broken by one enormous type line that spans the
full width, or by a single image that is twice the height of its neighbours. The eye should stop.

**5. The negative space hero.** No image at all above the fold — a display line, a season, and a
lot of ivory. Extreme, but it makes the first image land twice as hard.

## Page archetypes

### Home

```
[ full-bleed campaign image, 100svh, headline overlapping bottom-left edge ]
[ short season line, 6/12 columns, offset right ]
[ collection strip: 3 images at 4:5, 2/3/3 columns — not equal ]
[ one full-width type interruption ]
[ signature piece: single image 7/12, caption off-grid ]
[ footer ]
```

One scroll should feel like one chapter. Do not put five equal sections on the home page.

### Collection / shop

- The grid is the design. Choose a **rhythm**, not a uniform 3-up: e.g. rows of 2, 3, 3, 1.
- Product images at 4:5, edge-to-edge in the grid cell — no padding, no card, no border, no radius.
- Product name and price below the image, left-aligned, caption size. Price in `mink`.
- Filtering is a text row, not a sidebar of checkboxes, on desktop. On mobile it is a full-screen
  sheet.
- A collection page must still have one editorial moment — a full-bleed banner at the top with the
  collection name set at `display-xl`.

### Product

- Split: image column 7/12 (scrolls through the shoot), detail column 4/12, one empty column.
- The first image is 4:5. Second image is a detail crop (1:1 or 3:4). Third is on-body.
- Title in `display-md`. Price in `body`. Fabric and fit in `body` — these are the actual selling
  copy, give them space.
- Size selection is a row of text buttons, not a dropdown. Sold-out sizes are struck through, not
  greyed to invisibility.
- If commerce is not live: one clear line — `Orders via WhatsApp` — and the message link. No fake
  cart.

### Story / atelier

- Two-column asymmetric text with a full-bleed image between sections.
- Drop the grid: let one paragraph run narrow (4/12) and the next run wide. Variation in measure is
  an editorial signal.
- Pull-quotes in `display-md`, no quotation marks, no italic.

## Typographic composition

- Headlines break deliberately. Write them with a line break in mind:
  `FALL` / `2026` stacked, not "Fall 2026" wrapping wherever it lands.
- Use `text-wrap: balance` for headlines and `pretty` for paragraphs.
- Mixed case is content, not decoration: uppercase campaign words, lowercase supporting lines.
- A headline may sit *under* an image, clipped by it, or behind it at low opacity — but only one of
  these per page.

## Rhythm

Alternate **dense** and **sparse**. A dense grid section should be followed by a sparse one. If two
consecutive sections have similar density, one of them is wrong.

```
dense product grid → sparse single image → dense grid → sparse type-line
```

## Mobile composition

At 375px, the moves survive but change:

- The bite becomes a full-bleed image with the headline overlapping its bottom edge by ~20%.
- The empty column becomes a 40–60px inset that only some blocks respect — varying margins is the
  mobile equivalent of an empty column.
- The interruption becomes a full-width display line between two products, not a second column.
- Never simply stack the desktop layout. Re-decide.

## Failure modes

- Everything centered. Editorial layout is mostly left-aligned with deliberate asymmetry.
- A headline that fits exactly one line at every width. Vary it.
- An image grid where every cell is the same size.
- A section with no image and no large type — just cards.
- "Editorial" achieved by adding a serif font. The composition does the work, not the typeface.
