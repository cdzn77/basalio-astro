# Basalio marketing-site — Standing Instructions

## Required reading at session start

Also read `LAYOUT_PATTERNS.md` in this same directory at the start of every session — it defines canonical structural patterns (header splits, lists, buttons, grids) used throughout this site. Check it before writing any layout CSS/JSX; if a section's structure matches a named pattern there, implement that pattern's canonical CSS rather than deriving structure from prose alone.

## Layout clarity protocol (added 2026-07-17 after repeated layout mismatches on Resources and Courses page)

Prose descriptions of layout ("flex row, 35% left column...") are ambiguous enough that they've caused real mismatches — sections built stacked instead of split, grids built as 1 column instead of 2. Prose alone is not sufficient input for layout work going forward.

Before writing layout CSS/JSX for any section, require ALL of the following to be present:
1. An ASCII wireframe box diagram in the prompt showing nesting and column splits — if one isn't provided, ask for it rather than inferring structure from prose alone.
2. A reference to LAYOUT_PATTERNS.md for any pattern that matches an existing canonical definition (header-split-primary, divider-list, two-pill-button, accordion, card-grid-2col, sticky-footer-reveal) — implement the canonical CSS from that file, don't re-derive it from a paragraph.
3. If a reference screenshot file exists in /reference/, open and look at it directly before writing code — don't rely solely on the text description of what it shows.

After building, compare your screenshot output against the reference screenshot side by side and describe any visual differences explicitly — don't just confirm the code compiles or that elements are present.

## Verification protocol (non-negotiable)

Do NOT report any UI/styling task as "working," "verified," "rendering correctly," or similar until you have done ALL of the following in the SAME turn:

1. Run `npm run dev:clean` if this task touched CSS/styles, to rule out stale Vite cache before investigating anything else.
2. Take an actual screenshot of the rendered page/section using Playwright (see `scripts/verify-section.js` — reuse this, don't write a new one-off each time) and save it to `/verification/`.
3. Paste the RAW output of any diagnostic command you ran (curl, grep, cat) directly into your response. Never paraphrase, summarize, or checklist-format a command's output — paste the literal text.
4. State explicitly what you actually looked at to reach your conclusion (e.g. "I viewed the screenshot at /verification/resources-2026-07-17.png and compared it against the reference") rather than describing what should be true based on the code.

A checklist of claims with checkmarks is NOT verification. A prose summary that a previous step "completed successfully" is NOT verification. The only acceptable evidence is: a real screenshot, or raw terminal/browser output pasted verbatim.

If you have not actually looked at a rendered screenshot, say so explicitly: "I have not visually confirmed this — here is what the code should produce, but I haven't verified the render." Do not imply visual confirmation happened if it didn't.

## Why this rule exists

On 2026-07-17, three consecutive "everything is working" reports for the RampResources section were incorrect or unverifiable, while the actual bug (stale Vite dev cache) was only found by pasting raw curl/grep output and inspecting DevTools directly. Confident-sounding summaries were the primary source of wasted iteration in that session, not the underlying bugs themselves.

## Cache issues

If styles aren't reflecting a saved change:
```
npm run dev:clean
```
Try this FIRST, before deep debugging. It clears `node_modules/.vite` and restarts fresh.

## Shared components — single source of truth
- Header and footer content lives ONLY in src/data/navigation.ts.
- Never pass link arrays, headings, or descriptions as props to
  shared components. Props are BEHAVIORAL only.
- Never create a second implementation of a shared component.
  Add a variant prop instead of forking.

## Terminology — locked

The product is **BLOCKS**. Never "modules," never "courses" — not in copy, meta tags, comments, props, variable names, or interface types. CSS class names and placeholder image filenames are the only exceptions.

**Why:** Phantom terminology in comments, variable names, and component props becomes invisible confusion in future sessions. A developer reading `courseButton` concludes we sell courses. A comment referencing deleted `RampCourses` creates search noise. Locked terminology in code prevents this drift.

## Hero background swaps

When changing the hero background and surface:

- `background` and `surface` are set in `index.astro`. `headerSurface` always equals `heroSurface` — never derive either from `background.type`. A light photo and a dark photo are both `type: 'image'`; the type says nothing about brightness.
- `surface` names the **SURFACE**, not the text:
  - `'acid'`  → light background → dark text → paper scrim
  - `'paper'` → light background → dark text → paper scrim
  - `'ink'`   → dark background  → light text → ink scrim
- `surface` changes **COLOUR ONLY** — never layout, order, size, or spacing.
- The portrait renders only when `background.type === 'color'`. For image/video/gradient backgrounds, the portrait is removed from the DOM (not hidden with CSS).
- Contrast over a photo is not guaranteed. Sample the lightest region under dark text and the darkest under light text; raise `scrim` opacity until both clear 4.5:1.

## Editing discipline
- Change only what was asked. Do not rewrite files, regenerate
  boilerplate, or "improve" adjacent code.
- Never modify a shared component during a page task unless
  told to.
- One change per commit.
- Before reporting done, run `git diff --stat` and confirm only
  the expected files changed.

## Deployment verification steps

Before pushing to main (and before reporting any layout/styling task complete):

1. **Footer overlap integrity** — Run the structural test:
   ```bash
   npm run build
   npm run dev -- --port 4321 &
   sleep 5
   node scripts/verify-footer-overlap.mjs
   ```
   All 8 routes must show `✓ PASS`. If any route fails, the page's last section is missing footer-overlap styling (40px bottom radius, -40px margin, non-transparent background). Fix before pushing.
   
   **Why:** Footer overlap selector uses `:last-of-type` which is fragile if pages add wrapper divs or component nesting changes. The test prevents silent breakage.

2. **Type checking** — No errors:
   ```bash
   npx astro check
   ```

3. **Build verification** — Production build succeeds:
   ```bash
   npm run build
   ```
