---
name: security-protocol
description: Security checklist and threat model for Burgundy Atelier. Load before implementing or reviewing any feature that accepts input, touches auth or customer data, calls an API, uploads files, adds a dependency or third-party script, or hands orders off to WhatsApp/DM/email.
---

# Security protocol

This is a small brand site, which makes it a target mainly for automated abuse — spam, scraping,
card testing once payments exist — rather than targeted attack. The risks are still real and mostly
cheap to prevent. Prevent them at build time.

## Threat model

| Asset | Why it matters | Primary risk |
| --- | --- | --- |
| Product catalog and photography | The brand's entire inventory of creative work | Scraping, hotlinking, unauthorized resale |
| Customer inquiries (name, phone, address) | PII of a paying customer | Leakage through logs, URLs, third-party embeds |
| Order handoff | The commercial transaction | Spam flooding, impersonation, lost orders |
| Admin/CMS access | Controls all content | Credential stuffing, token theft |
| Payment (if added) | Direct financial loss | Card testing, skimming, PCI scope creep |

**Actors:** anonymous visitor · customer · bot · staff.
**Trust boundaries:** contact/order forms · URL parameters · CMS content · uploaded images ·
webhooks · third-party embeds (Instagram, analytics) · WhatsApp deep links.

## Pre-build checklist

Answer all of these before writing code. If an answer is "we'll handle it later", that is a BLOCK.

- [ ] What untrusted data enters, and exactly where is it validated?
- [ ] Is validation server-side? (Client validation is UX, never security.)
- [ ] Does any code path trust a hidden field, a URL param, or a client-supplied ID?
- [ ] What is the abuse case, and what limits it? (rate limit, captcha, honeypot)
- [ ] Does this require auth? Is authorization re-checked on the server for every action?
- [ ] What new dependency or third-party script does this add, and why is it necessary?
- [ ] Does any customer data end up in a URL, a log line, or a third-party request?
- [ ] What happens on failure — does the error message leak internals?

## Implementation rules

### API routes and server actions

- Parse and validate with a schema (zod) at the top of the handler. Reject unknown fields.
- Return generic errors to the client; log detail server-side without PII.
- Rate-limit every unauthenticated endpoint (`5 req/hour/IP` for inquiry forms).
- Never expose `process.env` values that are not `NEXT_PUBLIC_`. Anything secret stays server-side.
- Server actions are public endpoints. Treat them exactly like API routes.

### Forms (inquiry / order)

- Honeypot field + time-to-submit check + rate limit. Captcha only if spam actually appears.
- No PII in the URL. If a WhatsApp handoff is used, send a short server-generated reference, not
  the customer's address or phone number in the query string.
- Normalize and escape on output. Never render submitted text as HTML.
- Email notifications: send from the server, never expose the recipient address in client code.

### Headers and CSP

Set in `next.config.ts` / middleware:

```
Content-Security-Policy: default-src 'self'; img-src 'self' https://cdn.shopify.com data:;
  script-src 'self' 'nonce-...'; style-src 'self' 'unsafe-inline';
  frame-ancestors 'none'; base-uri 'self'; form-action 'self'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

- Dev mode needs `'unsafe-eval'` for HMR — scope it to development, never production.
- Instagram embeds must be allow-listed explicitly or replaced with static images that link out.

### Dependencies

- Every package is a trust decision. Check: last publish, maintainers, install size, transitive
  count.
- `npm audit --production` in CI.
- Pin major versions; commit the lockfile; never `npm install` a package you cannot name the
  maintainer of.

### Media and uploads

- MIME sniff the file, do not trust the extension. Reject SVG from untrusted sources.
- Cap size server-side.
- Store outside the app root / in object storage; serve through the image CDN.
- Strip EXIF (GPS) from uploaded photography before publishing.

### Secrets

- `.env*` ignored; `.env.example` documents keys with no values.
- No secrets in client bundles — grep the build output for known key prefixes before launch.
- Rotate anything that was ever committed.

### Third parties

- Analytics and pixels: consent-gated for EU/UK. No tracking before consent.
- Chat widgets: weigh the performance and privacy cost; a WhatsApp link is usually enough.
- Never load a script from a URL you cannot explain.

## Post-build verification

- [ ] Read the diff, not the summary.
- [ ] `npm audit --production` clean of HIGH/CRITICAL.
- [ ] No secret strings in `.next/static`.
- [ ] Headers present in production build (`curl -I`).
- [ ] Form rejects empty, malformed, oversized, and rapid-fire submissions.
- [ ] Error responses reveal nothing about the stack.
- [ ] New dependencies justified in the PR.

## Severity

CRITICAL — data exposure, auth bypass, injection, secret leak → BLOCK, fix now.
HIGH — missing rate limit on a public write, missing CSRF on a state change, PII in logs → BLOCK.
MEDIUM — missing header, weak CSP, unnecessary dependency → fix before launch.
LOW / INFO — hardening, future concern → note it.
