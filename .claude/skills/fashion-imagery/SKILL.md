---
name: fashion-imagery
description: Photography handling for Burgundy Atelier — aspect ratios, art-directed crops, hover behaviour, loading strategy, and alt text for garments. Load before placing any image, adding a product shot, a lookbook grid, or writing alt text for fashion photography.
---

# Fashion imagery

On this site the photographs are the product. Everything else is a frame. An image placed carelessly
is a bigger design failure than a wrong color.

## Ratios

| Ratio | Use |
| --- | --- |
| **3:4** | Default. Campaign and product. Matches the brand's own photography |
| 3:4 | Full-length on-body, taller editorial rows |
| 1:1 | Detail crops: embroidery, fabric, hardware, a hem |
| 16:9 / 2.35:1 | Wide editorial bands, collection banners |
| 2:3 | Lookbook pages, story sections |

**One ratio per grid.** A product grid mixing 3:4 and 1:1 is a mistake unless the 1:1 is a
deliberate detail tile that occupies a different row size.

## Placement

- **Edge to edge.** Images touch at least one viewport edge somewhere on every page. This is the
  single strongest signal that the site is editorial.
- **No frames.** No border, no radius, no shadow, no white mat. The photograph is the object.
- **Full-bleed** on the hero at `100svh`, `object-cover`, `object-position` tuned per image.
- **Crop with intent.** A garment should not lose its hem, its sleeve, or its neckline to a careless
  `object-cover`. Set `object-position` explicitly when the subject is off-center.

## Art direction

- **Product shots:** consistent background, consistent light, consistent distance. If the source
  set varies, normalize with crop and a shared background tone — do not apply CSS filters to make
  them match.
- **On-body:** two images minimum — front and movement. The second image is the hover state.
- **Detail crops** are how fabric sells: chikankari thread, a button, a cuff. Include at least one
  per product.
- **No filters.** No saturation boosts, no vignettes, no duotone. If the image needs work, it is a
  photography problem.
- **Placeholders:** until real photography exists, use a flat `oyster` block at the correct ratio
  with the product name in caption type. Never a stock image, never an AI image, never a
  grey rectangle that will get shipped by accident. Label it `PLACEHOLDER` in the filename.

## Hover behaviour

One pattern, site-wide:

- Product card: cross-fade from primary to secondary image in `--duration-quiet` (180ms).
- Campaign image: a very slow scale from `1.0` to `1.02` over 900ms, `transform-origin` at the
  subject. Optional — use only if the page has no other motion.
- Touch devices: no hover state. Show a small second-image indicator (two dots) instead.

Nothing else hovers. No zoom-on-hover of the whole card, no color overlay, no text sliding up.

## Loading

```tsx
<Image
  src={...}
  alt={...}
  width={1600}
  height={2000}
  sizes="(min-width: 1024px) 58vw, 100vw"
  priority={isHero}
  placeholder="blur"
  blurDataURL={...}
/>
```

- Hero: `priority`, preloaded, AVIF first.
- Everything else: lazy by default (next/image does this), with `sizes` that matches the actual
  layout — a wrong `sizes` is how a phone downloads a 2000px image.
- LQIP: generate a 20px base64 blur, store beside the image metadata. Do not use a CSS blur on a
  full-size image.
- Cap delivered width at 2048px. Nobody needs more.
- Square-crop thumbnails for grids, so the browser can reuse the cache across views.

## Alt text

Alt text describes the garment as a customer would describe it to a friend. It is not SEO keyword
stuffing and it is not "product image".

Good:
- `Model in the cobalt Marlow set: wide-leg trouser and cropped shirt, ivory dupatta over one shoulder.`
- `Close crop of ivory chikankari embroidery on cotton lawn, showing the leaf motif along the cuff.`
- `Espresso Mardana kurta worn full length, side slit visible, paired with skinny shalwar.`

Bad:
- `product image`
- `burgundy atelier pakistani lawn suit buy online`
- `IMG_4821.jpg`

Decorative images — a fabric texture used as a background, a blur behind a heading — get `alt=""`
and `aria-hidden="true"`. They are not content.

If an image shows a recognizable person in a campaign (not an anonymous model in a product shot),
only use their name if the brand has permission and the CMS field is populated. Do not guess.

## In the repository

```
public/images/
  campaign/2026-fall/...
  products/<slug>/
    01-primary.jpg      4:5
    02-movement.jpg     4:5
    03-detail.jpg       1:1
  placeholders/          labeled, correct ratios
```

Filename: `lowercase-kebab`, no spaces, no camera filenames.
