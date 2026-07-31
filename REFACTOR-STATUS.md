# Basalio Refactor Status

## LAUNCH BLOCKERS

### TOKEN MIGRATION — ~300 hardcoded hex across 27 files

**Why it blocks launch:** The brand colour pass (Ramp yellow → acid #DFFF00) is deferred to launch-end. With tokens working, it's 4 edits to tokens.css. As-is it's a 300-instance hunt across 27 files, landing exactly when we're trying to ship.

**Sequence when we get to it:**

#### 1. DELETE DEAD COMPONENTS FIRST — free win, ~50 instances

Verify each is unused, then remove:
- `RampCourses.astro` (course pages deleted)
- `RampTestimonials.astro` (legacy, superseded by V2)
- `RampTrustedBy.astro`
- `RampRetainer.astro`
- `RampWhatWeDo.astro`
- `RampRoles.astro`

Report which are genuinely unreferenced before deleting.

#### 2. RESOLVE THE DUPLICATE FAQ COMPONENT

`FAQ.astro` and `RampFAQ.astro` both exist. Same forking pattern as the four footers. Report what each is used by and consolidate to one.

#### 3. MIGRATE REMAINING FILES, highest count first

One commit each, pixel-verified. Shared components before pages — fixing `RampFooter` and `RampHeader` propagates everywhere.

**Files affected (by hex instance count):**
- RampTemplateLayout.astro (36)
- index.astro (38)
- pricing.astro (32)
- contact.astro (32)
- RampFooter.astro (24)
- RampTestimonialsV2.astro (18) — PARTIAL FIX: focus outline done
- RampTestimonials.astro (18) — DELETE CANDIDATE
- roadmap.astro (15)
- support.astro (15)
- terms.astro (12)
- privacy.astro (12)
- RampHeader.astro (10)
- RampCourses.astro (9) — DELETE CANDIDATE
- RampPricing.astro (8)
- RampRoles.astro (9) — DELETE CANDIDATE
- RampHero.astro (6)
- RampWhatWeDo.astro (5) — DELETE CANDIDATE
- RampTrustedBy.astro (5) — DELETE CANDIDATE
- Button.astro (4)
- FAQ.astro (4) — CONSOLIDATE CANDIDATE
- RampFAQ.astro (4) — CONSOLIDATE CANDIDATE
- RampRetainer.astro (3) — DELETE CANDIDATE
- components.css (3)
- responsive.css (3)

---

## Status: NOT STARTED

Logged for pre-launch execution. Do not begin until homepage is complete and brand colour pass is scheduled.

---

## LAUNCH DAY CHECKLIST

**REQUIRED — All three must be completed before public launch:**

- [ ] **REQUIRED:** Netlify → Site settings → Access & security → Visitor access: change Private → Public
- [ ] **REQUIRED:** Remove `<meta name="robots" content="noindex, nofollow" />` from `src/layouts/BaseLayout.astro`
- [ ] **REQUIRED:** Remove or update `public/robots.txt` (currently blocks all crawlers)

**Why:** Site is currently private in Netlify and search engines are blocked. These must be completed to enable public access and organic discovery.
