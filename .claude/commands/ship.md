---
description: Run the full review gate on current changes — security, accessibility, performance, visual QA, voice, then the design verdict
argument-hint: [feature or path, optional]
---

Run the Burgundy Atelier ship gate on the current working tree (or on `$ARGUMENTS` if a path or
feature is named).

Do not fix anything yourself. This command produces a report. Fixes go back to `frontend` after the
report is reviewed.

## Step 1 — establish scope

Run `git status` and `git diff` (or read the named path). List the changed files and what they
appear to implement. If the working tree is clean and no path was given, stop and say so.

## Step 2 — parallel review

Launch these agents **in parallel** with the scope from step 1:

- `security` — pass 2 (post-implementation)
- `accessibility` — full audit
- `performance` — measure, don't estimate

Wait for all three.

## Step 3 — visual

Launch `qa-visual` at the breakpoint matrix. It needs the app running; if no dev server is
available, start one with `npm run dev` in the background, capture, then stop it.

## Step 4 — voice

Launch `brand-copy` on every user-facing string in the diff. It reports; it does not edit.

## Step 5 — verdict

Launch `design-director` in Mode B with all the reports above as input. It scores the 8-point
rubric and issues PASS / REVISE / REJECT.

## Step 6 — report

Output, in this order:

```
SHIP GATE — <scope>
Verdict: PASS | REVISE | REJECT

Blockers
  - [agent] file:line — issue → fix

Non-blocking
  - ...

Measured
  LCP / CLS / INP / JS — actual values

Waivers needed
  - anything that would ship with a known gap, and why
```

Rules:

- Any CRITICAL or HIGH security finding = the overall verdict is at best REVISE.
- Any WCAG A/AA failure = REVISE.
- Any metric over budget = REVISE.
- Any horizontal scroll or clipped layout = REVISE.
- Design director cannot pass work that another agent blocked.
- Never round a failure up to a pass because the deadline is close.
