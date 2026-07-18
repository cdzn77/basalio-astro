# Basalio — Ramp Studio Skeleton Tracker

Source template: `ramp-studio-template` (Framer, free template)
Purpose: track which sections started as a 1:1 structural clone of the source and where each one currently stands, so nothing gets forgotten mid-divergence.

**Standing rule (added 2026-07-17 after the RampResources debugging saga):** Never mark a section "reviewed/matched" below based on a text summary from Claude Code alone. Require one of: (a) a screenshot from `scripts/verify-section.js`, (b) a manual browser screenshot, or (c) a DevTools Styles-panel inspection. Three consecutive "everything is working ✓" reports for Our Resources turned out to be wrong or unverifiable — the actual bug (stale Vite cache) was only found by pasting raw curl/grep output. See `CLAUDE.md` in project root for the full verification protocol now enforced project-wide.

**How to use this:**
- Add a row every time you pull a new section into the skeleton.
- Update Status as work happens — don't wait until a section is "done," update it the day you touch it.
- Source Copy Removed = the literal Ramp Studio placeholder text is gone (this is the one that matters most for the licensing question, since structure/layout patterns are generic but their sentences aren't).
- Keep this file in the project root or `/Documents/` so it survives even if you jump between machines.

## Status legend
- 🟥 **1:1 Clone** — structure, spacing, type, and copy still match the source exactly (QA phase)
- 🟨 **Structure Kept / Reskinned** — layout mechanics unchanged, but Basalio type/color/tokens applied
- 🟩 **Fully Original** — layout, content, and styling all diverged from source; no longer traceable to Ramp
- ⬛ **Removed** — pulled from Basalio entirely, not in current build
- 🆕 **New (Not from Ramp)** — section added independently, has no source counterpart

## Section Log

| Section | Status | Source Copy Removed? | Date Added | Last Updated | Notes |
|---|---|---|---|---|---|
| What We Do (stats/dividers block) | 🟥 1:1 Clone | ❌ No | 2026-07-17 | 2026-07-17 | Skeleton built for QA match against source. Flex-grow-push mechanic (not space-between) confirmed. Real copy TBD via Claude CLI. |
| Our Courses (heading + View All + carousel) | 🟥 1:1 Clone | ❌ No | 2026-07-17 | 2026-07-17 | More complex than most sections — flag for extra QA attention: (1) left column uses justify-content:space-between on 2 children, not fixed gaps, to pin button to bottom; (2) "View All" is a real `<a href>` anchor built as two fused pill shapes (text pill + separate icon pill), not one button; (3) carousel is hover-triggered (mouseenter, not click) page-based paging with invisible full-height hit-zones at each edge, boundary-disabled via pointer-events + tabindex — built as reusable paging function, not hardcoded pixel offsets. Confirmed live via actual DOM interaction testing, not just static CSS read. |
| Our Resources (heading + description + View All + resource list) | 🟥 1:1 Clone | ❌ No | 2026-07-17 | 2026-07-17 | RESOLVED after a multi-round debugging saga — this is the section that prompted the standing verification rule above. Root cause #1 (unstyled render, serif fallback font): stale Vite dev cache, fixed via `npm run dev:clean`. Root cause #2 (full-width/misaligned layout after the styling fix): gap in the original spec (Claude's miss, not Claude Code's) — `.resources-eyebrow` needed `flex: 1 1 0%; max-width: 35%`, `.resources-header-right` needed `max-width: 65%`, and `.resources-list` was never told to align under the same right-hand column as the header row above it. Both fixed and independently verified via direct browser measurement (0px alignment diff between `.resources-header-right` and `.resources-list`) plus a real screenshot — not a self-reported summary. Reuses the same "View All" component as Our Courses. |

## Divergence Checklist (per section, once you start customizing)

- [ ] Basalio brand colors applied (ink #0A0A0A / paper #FFFFFF / stone #DFDCD5 / acid #DFFF00)
- [ ] Basalio typography applied (Instrument Sans / project type stack) — no source fonts (Azeret Mono, Switzer) remaining
- [ ] Placeholder/source copy replaced with real Basalio content
- [ ] Structural mechanic still matches source (intentional) OR has diverged (intentional) — note which
- [ ] Status updated in table above

## Open Items

- [ ] **License check** — confirm `ramp-studio-template`'s license terms permit derivative commercial product use, not just personal/portfolio use. Do this before more than 2–3 sections are built, not after.
- [ ] **Divergence deadline** — set a target date/milestone by which all sections move off 🟥/🟨 to 🟩. Structural clones are easiest to forget about once they "just work."

---
*Update this file directly — ask Claude to add a new row anytime a section is pulled from the template, or to update statuses in bulk after a customization pass.*
