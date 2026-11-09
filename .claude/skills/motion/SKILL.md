---
name: motion
description: Motion standards for Burgundy Atelier — the permitted patterns, duration and easing tokens, reveal rules, reduced-motion handling, and what is banned. Load before adding any animation, transition, scroll effect, or page transition.
---

# Motion

Motion on this site has one job: **reveal content that was already there.** It never decorates, it
never competes with the photography, and a visitor should not notice it.

## Budget

**Two motion patterns per page. Maximum.** If a page already has an image reveal and a hover
cross-fade, it is full. Adding a third means removing one.

## Tokens

```
--duration-quick   180ms   hover, focus, small state change
--duration-calm    420ms   menu, image reveal, accordion
--duration-slow    900ms   campaign image settle on load

--ease-out-quiet   cubic-bezier(0.22, 1, 0.36, 1)   entering, revealing
--ease-in-out      cubic-bezier(0.65, 0, 0.35, 1)   moving between states
```

No `ease`, no `linear` except for continuous loops (a marquee — which is banned anyway).

## Permitted patterns

**1. Hero settle.** On first load, the campaign image scales from `1.04` to `1.0` over 900ms. Type
fades from 0 to 1 over 420ms, starting after 120ms. Once. It does not replay on scroll.

**2. Product hover cross-fade.** 180ms opacity swap between the primary and secondary image. This
is the site's workhorse.

**3. Menu transition.** Full-screen menu slides in 420ms with a clip-path or translate, links fade
in staggered by 40ms. Focus moves into the menu; focus is trapped; Escape closes.

**4. Reveal-on-first-view.** An image or section may fade and translate up by 16–24px when it first
enters the viewport. **Once per element.** Apply it to at most three elements per page — usually the
campaign image and the section title. Not to every card.

That is the whole vocabulary.

## Absolutely banned

- Scroll-jacking or scroll-hijacking libraries
- Per-letter or per-word text animation
- Number count-ups
- Parallax on more than one element
- A cursor follower or custom cursor
- Marquees (except a single carefully-designed type ticker, and only if approved)
- Autoplaying video with sound
- Carousels that auto-advance
- Loading spinners on route changes unless the load genuinely exceeds 300ms
- Animation on the footer
- Anything that changes layout (animating `height`, `width`, `top`, `left`). Animate `transform`
  and `opacity` only.

## Reduced motion

Every animated call site handles it. Not just a global CSS rule — the JS branch too, because
`prefers-reduced-motion` should also disable scroll-triggered reveals that rely on JS.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Reduced motion does not mean "no content". A reveal must end in the visible state, never leave an
element at `opacity: 0` because its trigger was suppressed.

## Performance rules

- Animate `transform` and `opacity` only. Promote with `will-change` sparingly and remove it after.
- No motion on elements that would trigger layout or paint across a large area.
- Scroll listeners use `IntersectionObserver`, not `scroll` events.
- Motion must not delay LCP. The hero image is never hidden behind a fade-in longer than 420ms, and
  must be `priority`.

## Judging a motion decision

Ask: *if this animation were removed, would anyone notice?* If no, remove it. If yes, ask *does it
help them see the clothes?* If not, remove it.
