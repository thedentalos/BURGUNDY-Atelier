# Feature checklist

Copy this into the PR description for every feature. A feature is not done until every box is
ticked or explicitly waived with a reason.

## 0. Before code

- [ ] Intent paragraph written: role, signature move, type, image, mobile, failure mode
- [ ] `design-director` approved the intent
- [ ] Security threat model from `security` if the feature accepts input, calls an API, or touches
      customer data

## 1. Build

- [ ] All values resolve through `@theme` tokens — no raw hex, no arbitrary values
- [ ] Server component by default; every `"use client"` justified
- [ ] Mobile composition designed at 375px first
- [ ] Every image has `width`, `height`, `sizes`, and an aspect ratio
- [ ] Copy written, not generated

## 2. Security

- [ ] Input validated server-side
- [ ] Rate limiting on unauthenticated writes
- [ ] No secrets in the client bundle
- [ ] No PII in URLs, logs, or third-party requests
- [ ] New dependencies justified
- [ ] `npm audit --production` clean of HIGH/CRITICAL
- [ ] Security headers present in the production build

## 3. Accessibility

- [ ] Contrast measured (4.5:1 body, 3:1 large and UI)
- [ ] Focus visible everywhere; keyboard walk completed
- [ ] Heading order valid; one `h1`
- [ ] Alt text describes the garment
- [ ] Touch targets ≥ 44×44
- [ ] 200% zoom: no clipping, no horizontal scroll
- [ ] Reduced motion honored, content still visible

## 4. Performance

- [ ] LCP ≤ 2.0s mobile throttled
- [ ] CLS ≤ 0.05
- [ ] INP ≤ 200ms
- [ ] Route JS ≤ 170KB gz
- [ ] Hero image ≤ 200KB AVIF, `priority` set
- [ ] Fonts ≤ 2 files, ≤ 80KB total

## 5. Visual QA

- [ ] Screenshots at 320, 375, 430, 768, 1024, 1440, 1920
- [ ] 375 at 200% zoom
- [ ] No horizontal scroll at any width
- [ ] No clipping, no overlap, no orphan words
- [ ] Baselines updated only for intentional changes

## 6. Voice

- [ ] No banned lexicon
- [ ] Case system respected: uppercase headlines, lowercase supporting, Title Case products
- [ ] Product names follow `[Color] [Name] [Garment]`
- [ ] No invented product facts

## 7. Verdict

- [ ] `design-director` score ≥ 4.0 average, no item below 3
- [ ] Specificity test passed: could this belong to another brand?

---

## Waivers

| Item | Why waived | Approved by | Date |
| --- | --- | --- | --- |
| | | | |
