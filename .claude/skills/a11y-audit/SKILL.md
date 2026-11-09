---
name: a11y-audit
description: WCAG 2.2 AA audit checklist for Burgundy Atelier, tuned to a fashion site — ivory-on-cream contrast traps, hover-only product detail, image alt text, carousels, and size selectors. Load when reviewing a built page for accessibility.
---

# Accessibility audit — WCAG 2.2 AA

Automated tools catch about a third of real issues. Use them as a floor, then do the manual checks.

## Contrast — the biggest risk on this site

Ivory, oyster, and mink are all low-contrast by design. Every pairing must be measured.

- Body text: **4.5:1** minimum.
- Large text (≥24px, or ≥18.66px bold): **3:1**.
- UI components and focus indicators: **3:1** against adjacent colors.
- `mink` `#A89A8C` on `ivory` `#F6F1E7` is roughly **2.4:1** — it fails for body text. It is legal
  only for large display text, and only after measurement. Do not use it for captions.
- Burgundy `#5E1B23` on ivory is fine for text; burgundy on burgundy-deep is not a text pairing.
- Never use color alone to convey state: sold out, new, on sale, error. Add text or a symbol.

## Keyboard

- Every interactive element reachable in DOM order matching visual order.
- Focus visible at all times — 2px burgundy ring, 2px offset. Never `outline: none` without a
  replacement.
- No keyboard traps. Modal menu traps focus *and* returns it on close.
- Skip link to main content, visible on focus.
- Focus is moved deliberately when a menu, dialog, or sheet opens, and restored on close.
- Custom controls (size chips, filters, carousel arrows) are real `<button>` elements with
  `aria-pressed` / `aria-selected` as appropriate.

## Structure

- One `<h1>` per page. Heading levels descend without skipping.
- Landmarks: `header`, `nav`, `main`, `footer`. No duplicate `nav` without labels.
- Lists are lists. Product grids are `<ul><li>`.
- The page title (`<title>`) is unique and descriptive.
- Language set on `<html lang="en-PK">`.

## Images

- Product and campaign images: alt describes garment, color, silhouette.
- Detail crops: alt names what is shown.
- Decorative texture/background: `alt=""` and `aria-hidden="true"`.
- A product card's link and image should not produce duplicate accessible names —
  `alt=""` on the image when the link text already names the product.

## Forms and order handoff

- Every input has a visible `<label>`; placeholders are not labels.
- Errors are programmatically associated (`aria-describedby`) and announced.
- Required fields marked in text, not only with an asterisk.
- The WhatsApp/message handoff is a real link with descriptive text, not "click here".
- No time limits on forms.

## Motion and media

- `prefers-reduced-motion` respected — and the reduced state still shows all content.
- Carousels: pause control, no autoplay, arrow keys work.
- Video: captions, no autoplay with sound.
- Nothing flashes more than 3 times per second.

## Targets and zoom

- Interactive targets ≥ 24×24 CSS px (WCAG 2.2 minimum); this site targets 44×44.
- Text resizes to 200% without loss of content or function.
- Reflow at 320px width (equivalent to 400% zoom) with no 2D scrolling.
- Hover-revealed information is also available on focus and tap.

## Manual test script

1. Tab through the entire page from the browser chrome. Note every stop, and whether focus is
   visible.
2. Zoom to 200%. Check for clipping and horizontal scroll.
3. Turn on a screen reader (VoiceOver / NVDA). Navigate by headings, then by landmarks, then by
   links. Every link name should make sense out of context.
4. Navigate the mobile menu and product image gallery with keyboard only.
5. Emulate reduced motion and confirm content is still visible.

## Reporting

Any unresolved Level A or AA criterion is a FAIL. Report against the specific success criterion
number so the fix is unambiguous, with `file:line` and the concrete change.
