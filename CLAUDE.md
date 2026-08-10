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

## Build verification (non-negotiable for imports, globs, build transforms)

**Anything touching imports, globs, or build output must be verified against a production build, never the dev server.**

Vite resolves globs and imports differently between dev mode (`npm run dev`) and build mode (`npm run build`). The dev server can hide build-time failures.

**Standing rule:** For any code change involving:
- `import.meta.glob()`
- Dynamic imports (`import()`)
- Asset imports that resolve at build time
- Anything in Astro's build pipeline

Verify with:
```
npm run build && npm run preview
```

Then test against the preview URL, not `localhost:3000` or `npm run dev`.

**Why this matters:** On 2026-08-09, an icon import bug (`import.meta.glob()` returning module objects instead of raw strings) shipped to production three times because all local verification ran against the dev server. The dev server's Vite instance resolved the glob differently than the production build, so every local test passed while production failed.

**Test procedure:**
1. Make code change
2. `npm run build` (full rebuild, not dev)
3. `npm run preview` (serve the built output)
4. Verify the feature works in preview (not dev server)
5. Write a verification check that FAILS on broken state and PASSES when fixed
6. Run the check before committing

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

## Copy

- No em-dashes in site copy or in reports. Use a full stop where the clause stands alone, a comma where it's parenthetical, parentheses for appositional detail.
- Avoid AI-writing markers: seamlessly, effortlessly, powerful, robust, elevate, unlock, leverage, dive into, rule-of-three constructions.
- Copy changes are never bundled with other work. Separate commit, before/after quoted for review.
- When asked to paste file contents: output the actual file. Never reconstruct, paraphrase, or approximate. If you cannot read the file, say so. Every quoted excerpt must be accompanied by file path and line numbers. Fabricated quotes break trust when the user relies on them to understand their own codebase.

## File quotation discipline

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

## Verification

- **Local verification is not deployment verification.** After pushing, confirm the change on the deployed site before reporting it done. The dev server (`localhost:4321`) is not the source of truth.
- **Cannot verify deploys via API or curl.** The site is private on Netlify (returns 401). When deploy verification is needed, ask the user to check the live site directly. Do not poll or attempt to read deployed HTML.
- **Report the deploy status and SHA alongside any "complete."** When the user confirms the fix is live, include that confirmation in the report. Example: "Pushed to main (commit abc123d). User verified fix is live at basalio.netlify.app."

## Contrast ratio verification (required for color claims)

Contrast claims must ALWAYS come from actual computed styles in the browser, never from token lookups or screenshots.

**When reporting contrast:**
1. Paste the raw `rgb()` values from `getComputedStyle()`:
   ```javascript
   getComputedStyle(document.querySelector('h1')).color
   getComputedStyle(document.querySelector('h1 .accent-word')).color
   getComputedStyle(document.querySelector('.hero')).backgroundColor
   ```
2. Show the rgb() values side by side with the calculated ratio.
3. Example: "H1: rgb(246, 244, 239) on rgb(28, 25, 23) = 15.91:1 WCAG AAA"

**Why:** Token lookup (e.g. `--text-on-ink #F6F4EF` on `--surface-ink #1C1917`) gives the theoretical value. Screenshots cannot show hex values. Only getComputedStyle reflects the actual color the browser renders after CSS cascade, inheritance, and specificity resolution. Third report with unverified contrast values broke trust; this rule prevents it.

## MECHANISM FACTS — established the expensive way, do not re-derive

- Astro scoped CSS does NOT apply to slotted content. A slotted element
  carries the PAGE's astro-cid, not the component's. Styles for slotted
  content must live in global.css.
- getComputedStyle returns the REQUESTED font stack, not the resolved
  font. It reports success even when the font never loaded. Use
  document.fonts.check() plus a rendered-width comparison.
- Playwright's animations:'disabled' FREEZES media at its current
  playback position — it does not pin a frame. Two captures taken
  milliseconds apart can match and then differ wildly. Force
  reducedMotion:'reduce' and ASSERT the video is suppressed and the
  poster is rendering before any capture.
- Full-page pixel-diff is invalid for any change that alters layout
  height. Use a fixed-viewport region diff instead.
- Cropping a full-page capture to viewport height does NOT produce a
  valid fixed-viewport baseline.
- data-surface describes what a section's background IS. It is not a
  switch to make the observer fire. Mislabelling it makes the header
  invisible.
- backdrop-filter clips to the element's own bounds. It never spills
  outward. Blur with no background-color shows raw blurred content —
  frosted glass needs a tint too.
- Orphaned build assets are 0% of page weight by definition. Build size
  and page weight are different metrics and must never be blended.
- A 401 from basalio.com means check the NETLIFY PROJECT PRIVACY setting
  first. Not Cloudflare, not a bot filter.
- Netlify deploys main only. Pushing to a branch does not deploy.

## PROCESS RULES

- Restart the dev server before any verification pass or device
  recording. A 21-hour-old server produced observations that did not
  reflect the code.
- Measurement deliverables are the pasted data. A checkmark or "verified"
  is not evidence. If a task is too large for one pass, say so and
  propose a split — never mark it complete.
- Screenshots for review go to ~/Desktop/basalio-screenshots/, never
  /tmp. Do not delete them before they have been reviewed.
- Every screenshot claiming to show an applied style must be paired with
  the computed value proving it applied.
- One commit per item. Do not batch.
- Report every change made, including adjacent ones. Unreported changes
  have shipped twice.
- Never infer an external system's capabilities from your own
  configuration. Reading a font's available weights from your own <link>
  tag is circular.
- Never substitute calculation for measurement. If a tool fails, report
  the failure and stop.
- When told to report and stop, stop.
- npm run verify:overflow must stay at 104/104. 320px and 360px are
  required — WCAG 1.4.10 needs 320, and 360 is the most common Android
  width.
- **Deferred items decay.** Before an item from "still open" / "deferred" earns
  priority, re-verify it against production first. Six sessions prioritized
  the [object Module] bug that had already shipped fixed on 2026-08-09 because
  the HANDOFF item was never re-verified. A stale open issue in HANDOFF.md is
  documentation debt, not a bug list. Cheapest check: curl production, grep for
  the symptom, grep the codebase for the fix.
