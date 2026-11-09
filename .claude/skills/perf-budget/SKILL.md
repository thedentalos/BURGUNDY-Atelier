---
name: perf-budget
description: Performance budgets and measurement method for Burgundy Atelier — Core Web Vitals targets, image and font weight limits, JS budget, and the specific optimizations for an image-heavy fashion site. Load before shipping a page or whenever images, fonts, or scripts change.
---

# Performance budget

Measure on **mobile, throttled** (Lighthouse mobile preset / Moto G class, Fast 4G). A desktop
score is not evidence.

## Budgets

| Metric | Budget | Fails at |
| --- | --- | --- |
| LCP | **≤ 2.0 s** | > 2.5 s |
| CLS | **≤ 0.05** | > 0.1 |
| INP | **≤ 200 ms** | > 200 ms |
| TTFB | ≤ 400 ms | > 800 ms |
| Total JS (gz) | ≤ 170 KB | > 200 KB |
| Total CSS (gz) | ≤ 30 KB | > 45 KB |
| Fonts | ≤ 2 files, ≤ 80 KB total | > 120 KB |
| Hero image | ≤ 200 KB AVIF | > 300 KB |
| All images above the fold | ≤ 400 KB | > 600 KB |
| Third-party requests | ≤ 2 | > 3 |

The target is *budget*, not *fails at*. Ship to the budget.

## Images — the main event

This site is 90% photography by weight. Everything here matters more than any JS optimization.

- **LCP image:** `priority` on the `next/image`, preloaded, `fetchpriority="high"`, no fade-in
  longer than 420ms, never inside a client component that mounts late.
- **`sizes` must be real.** A full-bleed mobile image is `100vw`; a 2-up grid on desktop is
  `(min-width: 1024px) 50vw, 100vw`. A wrong `sizes` is the most common cause of a 4× overweight
  image on mobile.
- **Formats:** AVIF primary, WebP fallback. Never JPEG above 200KB for a web hero.
- **Dimensions:** cap at 2048px wide. A 4:5 hero at 2048×2560 is already generous.
- **Decode hints:** `decoding="async"` on below-fold images.
- **No CSS background images for content.** They cannot be optimized by the pipeline and break
  `sizes`.
- **LQIP:** 20px base64 blur, inlined. Never a blurred full-size placeholder.

## Fonts

- Two families, self-hosted via `next/font`, subset to `latin` (+ `latin-ext` only if needed for
  the copy).
- `display: swap`, with a metric-compatible fallback (`size-adjust`) to keep CLS at zero.
- Preload only the display face used above the fold. The body face can wait.
- Variable fonts are fine if the variable range is used; otherwise a static weight is smaller.
- Check the actual woff2 byte size — a display serif with a full character set can exceed 90KB on
  its own.

## JavaScript

- Marketing pages are server components. A single `"use client"` at the top of a layout can pull
  the entire tree into the client bundle — check the build report.
- No animation library for a fade. CSS handles this skill's entire motion vocabulary.
- No carousel library. Scroll-snap does it with zero JS.
- `next/dynamic` for anything genuinely interactive and below the fold.
- Check `npm run build` output for the route's First Load JS.

## Third parties

Each one is a tax paid on every visit.

- Instagram embed: heavy, splits from CSP, and slow. Prefer a static grid of images that links to
  the profile.
- Analytics: load after interaction or consent, `defer`, never in `<head>` blocking.
- Chat widgets: usually not worth it. A WhatsApp link is a line of HTML.

## CLS sources to check

- Images without explicit dimensions
- Web font swap without a matched fallback metric
- Banners or consent notices injected above content
- Lazy content inserting above the viewport
- Ads (there are none; keep it that way)

## Measurement

```bash
npm run build && npm start
npx lighthouse http://localhost:3000 --preset=desktop   # never trust this alone
npx lighthouse http://localhost:3000 --emulated-form-factor=mobile --throttling-method=simulate
```

Read the **waterfall** and the LCP element identification, not just the score. Then confirm on a
real mid-range Android device on 4G before launch.
