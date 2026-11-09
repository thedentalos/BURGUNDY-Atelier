# Burgundy Atelier — project constitution

A Pakistani womenswear label: modest, everyday-luxury, lawn and chikankari. Editorial and
image-led. The benchmark is a fashion house's own site — a lookbook you scroll slowly — not a SaaS
landing page and not a Shopify template.

Read this file before every task. It overrides your default instincts about what a website
"usually" looks like.

---

## The brand, as evidenced

- **What it sells:** chikankari shirts, baggy shirts, skinny shalwars, trousers, overskirts,
  dresses, headscarves; bags and bangles as accessories. Price band roughly **Rs 5,500–10,500**.
- **Positioning:** "Thoughtfully designed for effortless everyday luxury." Feminine, modest,
  boutique scale, personal-service sales.
- **Reference site:** `sakatelier.com` — quiet-luxury South Asian womenswear. Warm cream ground,
  near-black type, minimal chrome, product photography carrying the color. Uppercase short
  campaign headlines ("VELVETS", "AFTER HOURS") against lowercase, dry supporting lines
  ("your winter uniform, sorted"). Product names are `[Color] [Name] [Garment]`.
- **Instagram:** `@burgundyatelierofficial` — deep crimson anchor; supporting palette of oyster,
  blush, lavender, vanilla, sunflower, ivory. Sells by DM today.
- **Design language:** cream ground, rose panels, burgundy structure. Cormorant Garamond display
  with Jost text. Logo centred in the header, letterspaced uppercase.
- **Product names:** `[COLOUR OR MOTIF] [CUT]`, in caps — `BLUSH BAGGY`, `SUNFLOWER IVORY`.
- **Prices:** shirt alone, or with the trouser/shalwar — e.g. Rs. 5,500 / Rs. 7,500.
- **Brand reference colour:** PANTONE 15-1906 TCX ≈ `#C79DA7` (`mauve` token). Never used as text.

### Catalog on hand

`BLUSH BAGGY`, `LAVENDER VANILLA`, `SUNFLOWER IVORY`, `LILAC TIE & DYE` — all Fall 2026. Prices and
prints in `docs/brand-brief.md`. Photography is low-resolution Instagram crops; originals needed.

### Commerce posture

The brand currently takes orders **via Instagram DM**. Therefore:

- The site's first job is **lookbook + inquiry handoff** (DM / WhatsApp), not a cart.
- Commerce stays **additive**: product data in a plain shape in `lib/products.ts`, product pages
  that do not assume a cart exists.
- Do not build a cart, checkout, or "Add to bag" until the commerce decision is explicitly made.

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4** — CSS-first config in `app/globals.css` via `@theme`
- **next/image** for all photography, with `sizes` on every instance
- Fonts via `next/font`, self-hosted, subset

## Non-negotiables

1. **Tokens only.** No raw hex, no arbitrary Tailwind values (`text-[#7a2f33]`, `p-[13px]`).
   Everything resolves through `@theme`. Missing a value? Add the token first.
2. **No component is built before its intent is written.** One paragraph: role, signature move,
   type, image handling, mobile behavior, and the generic version it must never become. The design
   director approves it before code exists.
3. **Every feature passes the gate** (below) before it is called done.
4. **Photography is art-directed, never decorated.** Defined ratio, crop, placement. Images sit
   edge-to-edge or full-bleed — not inside rounded cards.
5. **Two typefaces, three weights.** Display type is large and deliberate.
6. **Burgundy is structural, not decorative.** It may own the statement band, the footer, and the
   primary button. Body sections stay cream and rose; never tint a card or a section with it.
7. **Motion is scarce.** At most two patterns per page. `prefers-reduced-motion` honored at every
   call site.
8. **If it would fit on any other clothing brand's site, it is wrong.** See `anti-slop`.
9. **No stock or AI-generated imagery in a shipped page.** Until brand photography exists, use
   labeled placeholders at the correct aspect ratio so the layout is honest.
10. **Copy is written, not generated.** All strings go through `brand-copy` and the banned list.

## Who does what

| You need | Agent |
| --- | --- |
| Art direction, layout decisions, pre-build review, ship verdict | `design-director` |
| Building or changing UI, tokens, responsive behavior | `frontend` |
| Threat model, input/auth/secrets/dependency review | `security` |
| Contrast, focus, keyboard, screen reader, motion sensitivity | `accessibility` |
| Core Web Vitals, image weight, font loading, bundle size | `performance` |
| Breakpoint screenshots, overflow, tap targets, visual regression | `qa-visual` |
| Headlines, product names, descriptions, microcopy, banned words | `brand-copy` |

**Reviewers are read-only.** They report findings with `file:line` and a concrete fix. They never
patch. Only `frontend` writes.

## The gate

Do not skip ahead; a later stage does not excuse an earlier failure.

```
1. intent       design-director   approve the concept in one paragraph
2. build        frontend          implement against tokens
3. security     security          threat model + checklist
4. a11y         accessibility     WCAG 2.2 AA
5. perf         performance       budgets
6. visual       qa-visual         screenshots 320 → 1920
7. voice        brand-copy        copy + microcopy
8. verdict      design-director   anti-slop rubric, pass or revise
```

`/ship` runs stages 3–8 on the current diff. Stages 1–2 happen before you ask.

## Skills

Load with the Skill tool. These are the standards; this file is the index.

| Skill | Use when |
| --- | --- |
| `brand-system` | Any color, type, spacing, grid, or token decision |
| `anti-slop` | Building or reviewing any UI. Banned patterns + rubric |
| `responsive` | Any layout work. Breakpoint matrix, fluid sizing, tap targets |
| `editorial-layout` | Composing pages: hero, lookbook, collections, story |
| `fashion-imagery` | Any image: ratio, crop, hover, loading, alt text |
| `motion` | Any animation, transition, or scroll effect |
| `copy-voice` | Any user-facing string |
| `security-protocol` | Any form, API route, third-party script, or order handoff |
| `a11y-audit` | Reviewing a built page |
| `perf-budget` | Reviewing a built page |

## Still unknown — do not invent

- Final brand kit: exact burgundy hex, logotype, official typefaces
- Photography originals: current assets are ~428px Instagram crops
- Whether DMs or WhatsApp is the primary order channel
- Launch scope: how many collections ship at launch

`docs/brand-brief.md` holds the slots. Tokens in `app/globals.css` are marked `DERIVED` where they
were inferred from the feed rather than supplied. Do not treat a derived value as a brand decision.
