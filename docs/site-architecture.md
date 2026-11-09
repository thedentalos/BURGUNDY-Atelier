# Site architecture — Burgundy Atelier

The full component and endpoint map, written for SEO first. Commerce is still additive: the site
sells by Instagram handoff today, so nothing below assumes a cart. Where a component or route is
future-state, it is marked **P2**.

Legend: **P1** = launch · **P2** = after commerce or content volume justifies it.

---

## 1. Route map

| Route | Purpose | Rendering | Primary SEO signal |
| --- | --- | --- | --- |
| `/` | Campaign, season entry point | Static | `Organization`, `WebSite` + SearchAction |
| `/shop` | All pieces | Static / ISR | `CollectionPage`, `ItemList` |
| `/shop/[collection]` **P2** | Season or fabric collection | Static / ISR | `CollectionPage` |
| `/shop/[slug]` | Product detail | SSG + ISR | `Product` + `Offer`, `BreadcrumbList` |
| `/journal` **P2** | Editorial index | Static | `Blog` |
| `/journal/[slug]` **P2** | Article / lookbook story | SSG | `Article`, `BreadcrumbList` |
| `/atelier` | About, ordering, fit | Static | `AboutPage` |
| `/size-guide` | Measurements per garment | Static | `FAQPage` |
| `/delivery` | Delivery and exchange policy | Static | `WebPage` |
| `/contact` | Order and enquiry routes | Static | `ContactPage` |
| `/search` | Site search | Dynamic | **`noindex`** |
| `/legal/privacy`, `/legal/terms` | Legal | Static | `WebPage` |
| `not-found.tsx`, `error.tsx` | Recovery | Static | — |

Canonical host: one origin, HTTPS, `www` redirected to apex (or the reverse — pick one and 301 the
other). Every route declares `<link rel="canonical">`.

Language: `en-PK` on `<html>`. If Urdu is added later, `/ur` prefixes with `hreflang` pairs.

---

## 2. Components

### Layout and navigation

| Component | Responsibility |
| --- | --- |
| `SiteHeader` | Wordmark, primary nav, Instagram link. Transparent over the home hero, solid on scroll. |
| `MobileMenu` | Full-screen typographic menu. Focus-trapped, Escape closes, focus returns. |
| `AnnouncementBar` **P2** | One line: delivery window or a drop date. Dismissible. |
| `SiteFooter` | Wordmark, shop links, order channel, legal links. |
| `Breadcrumbs` | Visible trail + `BreadcrumbList` JSON-LD on every deep page. |
| `SkipLink` | Keyboard jump to `main`. |
| `Container` | Page gutter and max width. One implementation, used everywhere. |

### Editorial

| Component | Responsibility |
| --- | --- |
| `Hero` | Full-bleed image, centred display headline, lowercase line, outlined CTA. |
| `CampaignBand` **P2** | Image band with overlaid season title; used between product rows. |
| `EditorialSplit` | Asymmetric text/image block for the atelier story and journal. |
| `SectionHeading` | Eyebrow + display heading + optional rule. |
| `Rule` | The 1px oyster hairline. The only divider in the system. |
| `Statement` | Large type block with one short paragraph, offset into the grid. |

### Commerce and product

| Component | Responsibility |
| --- | --- |
| `ProductCard` | 4:5 image, name in caps, from-price. No card chrome. |
| `ProductGrid` | Staggered 12-column placement; the rhythm is the design. |
| `ProductGallery` | Primary, movement, detail crops. Keyboard-operable. **P2** for multi-image. |
| `ProductInfo` | Name, collection, price options, description, spec list. |
| `PriceOptions` | "Shirt" / "With skinny shalwar" / "With trouser" rows. Not a variant selector. |
| `OrderCTA` | Instagram handoff button. The single primary action. |
| `SizeGuideLink` **P2** | Link to `/size-guide`, anchored to the garment type. |
| `RelatedProducts` **P2** | Three pieces from the same collection. |
| `CollectionHeader` | Season title, count, one-line description. |
| `FilterBar` **P2** | Text-row filters, not a checkbox sidebar. |
| `EmptyState` | What to do when a filter or search returns nothing. |

### Media

| Component | Responsibility |
| --- | --- |
| `ProductImage` | `next/image` wrapper: ratio, `sizes`, priority, blur placeholder. |
| `HeroImage` | Full-bleed image with a contrast-checked scrim. Scrim opacity is a token. |
| `Figure` | Image + caption set off-grid, contact-sheet style. |

### Forms and data

| Component | Responsibility |
| --- | --- |
| `InquiryForm` **P2** | Name, contact, piece, size, note. Server-validated, rate-limited. |
| `NewsletterForm` **P2** | Single field, double opt-in. |
| `Field`, `Label`, `ErrorText` | Accessible form primitives. |

### System and SEO

| Component | Responsibility |
| --- | --- |
| `JsonLd` | Renders a typed `application/ld+json` block. |
| `Metadata` helpers | Title template, canonical, OG, Twitter card per route. |
| `StructuredData` | Product, Offer, BreadcrumbList, Organization, WebSite, Article. |
| `Analytics` **P2** | Consent-gated, deferred, single vendor. |
| `CookieConsent` **P2** | Only if tracking is added. |
| `Toast` **P2** | Form success and error feedback, announced to screen readers. |

---

## 3. Endpoints

### Page routes (server-rendered)

```
GET /                      campaign + featured collection
GET /shop                  full collection
GET /shop/[slug]           product detail
GET /atelier               brand, ordering, fit
GET /size-guide            measurements
GET /delivery              delivery + exchange
GET /contact               enquiry routes
GET /legal/privacy
GET /legal/terms
GET /search?q=             noindex, results only
```

All P1 pages are statically generated. Product pages use `generateStaticParams` and revalidate on
catalogue change. There is no client-side data fetching on any P1 page.

### Route handlers (API)

| Method | Endpoint | Purpose | Controls |
| --- | --- | --- | --- |
| `POST` | `/api/inquiry` **P2** | Order or product enquiry | zod schema, honeypot, 5 req/hr/IP, no PII in logs |
| `POST` | `/api/newsletter` **P2** | Subscribe | Double opt-in, rate limit, unsubscribe link |
| `POST` | `/api/revalidate` **P2** | CMS webhook → ISR | HMAC signature, timestamp window, allow-listed paths |
| `GET` | `/api/og` **P2** | Dynamic OG images per product/article | Cached, capped render time |
| `GET` | `/api/search` **P2** | Typeahead results | Debounced, max 10 results, noindex |
| `POST` | `/api/webhooks/shopify` **P2** | Catalogue sync | Signature verification, idempotency key |

No endpoint accepts a file upload at launch. If lookbook submissions are added later, they need
MIME sniffing, size caps, EXIF stripping, and storage outside the web root.

### SEO endpoints

| Endpoint | Implementation |
| --- | --- |
| `/sitemap.xml` | `app/sitemap.ts` — pages + every product, `lastModified` from data |
| `/robots.txt` | `app/robots.ts` — allow all except `/search`, point to sitemap |
| `/manifest.webmanifest` | `app/manifest.ts` — name, icons, theme color |
| `/journal/rss.xml` **P2** | `app/journal/rss.xml/route.ts` |
| `/opengraph-image` | `app/opengraph-image.tsx` — static brand card |
| `/shop/[slug]/opengraph-image` **P2** | Per-product card |

### Structured data

```
Organization      name, logo, url, sameAs → Instagram
WebSite           + potentialAction SearchAction
BreadcrumbList    every route below /shop
Product           name, image[], description, brand, offers[]
Offer             price, priceCurrency PKR, availability, url
CollectionPage    /shop and /shop/[collection]
Article           /journal/[slug]
FAQPage           /size-guide
```

`Offer.availability` must reflect reality. If stock is confirmed per message, use
`https://schema.org/PreOrder` or omit `availability` rather than claiming `InStock`.

---

## 4. SEO checklist

**Per page**

- [ ] Unique `<title>` (`%s — Burgundy Atelier`) and meta description, 150–160 chars
- [ ] One `<h1>`, headings descend without skipping
- [ ] Canonical URL
- [ ] OpenGraph + Twitter card, 1200×630 image
- [ ] Descriptive alt text on every content image; `alt=""` on decorative
- [ ] JSON-LD valid in the Rich Results test
- [ ] Internal links with descriptive anchor text

**Site-wide**

- [ ] Sitemap includes every product and page, excludes `/search`
- [ ] Robots disallows `/search`, allows everything else
- [ ] 301s for any renamed collection or product slug
- [ ] 404 returns HTTP 404, not a soft 200
- [ ] `hreflang="en-PK"`; add `ur-PK` only when the Urdu site exists
- [ ] Consistent NAP (name, area, phone) if a physical presence is published
- [ ] Instagram profile links to the site; site links back

**Performance (ranking + UX)**

- [ ] LCP ≤ 2.0s mobile throttled
- [ ] CLS ≤ 0.05
- [ ] INP ≤ 200ms
- [ ] JS ≤ 170KB gz per route
- [ ] Hero image ≤ 200KB AVIF; all images carry dimensions

**Content**

- [ ] Product descriptions unique per piece — no shared boilerplate
- [ ] Collection pages carry real copy, not just a grid
- [ ] Journal exists before claiming editorial authority; do not ship an empty blog

---

## 5. Data model

```ts
Product    slug, name, collection, print, cut, description,
           prices[{ label, amountPkr }], images[{ src, alt, ratio }],
           status: "available" | "made-to-order" | "sold-out"

Collection slug, title, season, description, productSlugs[]

JournalPost slug, title, excerpt, body, publishedAt, cover

Inquiry    name, contact, productSlug, size, note, source
```

`Product` currently lives in `lib/products.ts`. A CMS or Shopify adapter should populate the same
shape so no component changes.

---

## 6. Build order

1. **P1 now** — home, shop, product, atelier, size guide, delivery, contact, legal
2. **P1 SEO** — sitemap, robots, manifest, OG image, JSON-LD, canonicals
3. **P2 commerce** — cart decision, then `/api/inquiry` or Shopify
4. **P2 content** — journal, collection pages, RSS
5. **P2 growth** — newsletter, analytics, dynamic OG

Anything marked **P2** should not be scaffolded until the feature is funded — empty routes hurt
crawl quality more than they help.
