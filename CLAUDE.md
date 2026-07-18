# Basalio marketing-site — Standing Instructions

## Required reading at session start

Also read `LAYOUT_PATTERNS.md` in this same directory at the start of every session — it defines canonical structural patterns (header splits, lists, buttons, grids) used throughout this site. Check it before writing any layout CSS/JSX; if a section's structure matches a named pattern there, implement that pattern's canonical CSS rather than deriving structure from prose alone.

## Layout clarity protocol (added 2026-07-17 after repeated layout mismatches on Resources and Courses page)

Prose descriptions of layout ("flex row, 35% left column...") are ambiguous enough that they've caused real mismatches — sections built stacked instead of split, grids built as 1 column instead of 2. Prose alone is not sufficient input for layout work going forward.

Before writing layout CSS/JSX for any section, require ALL of the following to be present:
1. An ASCII wireframe box diagram in the prompt showing nesting and column splits — if one isn't provided, ask for it rather than inferring structure from prose alone.
2. A reference to LAYOUT_PATTERNS.md for any pattern that matches an existing canonical definition (header-split-35-65, divider-list, two-pill-button, accordion, card-grid-2col, sticky-footer-reveal) — implement the canonical CSS from that file, don't re-derive it from a paragraph.
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
