# Basalio — Site Maintenance Recipes

Verified recipes for common maintenance tasks. Each task names the file to edit and what updates automatically. No aspirational entries — only what has been tested.

---

## 1. CHANGE THE ACCENT COLOR

**Task:** Update the neon green accent (current: #EDFF10) site-wide.

**File to edit:** `src/styles/tokens.css`  
**Line:** 20  
**Old:** `--acid: #EDFF10;`  
**New:** `--acid: #YOUR_HEX_VALUE;`

**What updates automatically:** 45 references across all pages, components, and buttons (verified via grep).

**No additional edits required.** All --acid token uses will re-compute.

---

## 2. CHANGE FOOTER COPY OR LAYOUT

**File to edit:** `src/components/Footer.astro`

**If changing copy (text only):**
- Update any string inside the component markup
- Lines 14–51 contain most footer copy

**If changing layout (structure, spacing, columns):**
- Edit the grid/flex rules in the `<style>` block
- Lines 67–130 contain CSS

**If adding/removing footer sections:**
- Add or delete a `<div class="footer-*-section">` block
- May require CSS updates

**What updates automatically:** All 13 pages that import Footer will render the new version on next build.

---

## 3. SWAP THE HERO VIDEO

**File:** `public/basalio-hero.mp4`  
**Poster file:** `public/basalio-hero-poster.webp`

**Steps:**
1. Replace `public/basalio-hero.mp4` with your new video (keep the filename exactly the same)
2. Replace `public/basalio-hero-poster.webp` with the new poster image (keep the filename exactly the same)
3. Run `npm run build`

**What updates automatically:** Homepage and /hero-lab page will load the new video (referenced by filename in src/pages/index.astro and src/pages/hero-lab.astro).

**Files touched:** 2 (video + poster in public/)

---

## 4. SWAP AN IMAGE IN THE "WHO IT'S FOR" SECTION

**Files:**
- Image file: `public/assets/uxui_whoitsfor.webp` (and 3 others)
- References: `src/data/whoitsfor.ts`

**Steps:**
1. List the four images in /src/data/whoitsfor.ts (lines 12, 25, 36, 49):
   - uxui_whoitsfor.webp
   - videographer_whoitsfor.webp
   - director_whoitsfor.webp
   - agency_whoitsfor.webp

2. To swap one image:
   - Replace the .webp file in `public/assets/` (keep the filename exact)
   - No code changes required

3. Run `npm run build`

**What updates automatically:** WhoItsFor component re-loads the new image on all pages that use it (homepage, /early-access).

**Note:** If you rename the file, you MUST update the path in `src/data/whoitsfor.ts`. Keep filenames stable to avoid edits.

---

## 5. ADD OR REPLACE A BLOCK ICON

**Files:**
- Icon: `public/assets/icons/blocks/BLOCK_NAME.svg`
- Loader: `src/components/BlocksCarousel.astro` and `src/pages/blocks.astro`

**Steps:**
1. Drop a new `.svg` file into `public/assets/icons/blocks/`
2. **Filename MUST match the block slug exactly.** Examples:
   - Block slug "grid-reveal" → file name "grid-reveal.svg"
   - Block slug "magnetic-button" → file name "magnetic-button.svg"
3. Run `npm run build`

**What updates automatically:** The glob pattern `/public/assets/icons/blocks/*.svg` picks up the new file. Icon appears automatically wherever the block is displayed (blocks.astro carousel, /blocks page details).

**Verification:** After build, check that the icon renders on /blocks page.

**No code edits required.** The glob pattern handles discovery.

---

## 6. ADD A NEW PAGE

**DO NOT hand-assemble a page.** Use the template.

**Steps:**
1. Copy `src/templates/NEW-PAGE.astro` to a new file in `src/pages/`
   - Example: `src/pages/my-new-page.astro`
2. Edit the frontmatter (first 10 lines):
   - `title`: "Page Title - Basalio"
   - `description`: "SEO description for search results"
   - `heading`: "Main heading"
   - `body`: "Optional subheading text"
   - `width`: 'narrow' (760px) or 'wide' (1786px)
3. Replace the example sections with your content
4. Run `npm run build`

**What updates automatically:**
- Header, Footer, and canonical page structure (from PageLayout.astro)
- Container width via tokens (--container-narrow or --container-wide)
- Responsive styles for mobile/tablet/desktop

**Files that do NOT need editing:** BaseLayout, Header, Footer, responsive CSS. The template wraps all of that.

---

## 7. CHANGE SPACING OR TYPOGRAPHY VALUES

**DO NOT hardcode values.** Use design tokens.

**File to edit:** `src/styles/tokens.css`

**Common tokens:**
- Font sizes: `--font-size-body: 18px` (line ~53)
- Font weights: `--font-weight-normal: 400` (lines ~67–70)
- Letter spacing: `--heading-letter-spacing: -0.02em` (line ~83)
- Spacing scale: `--space-8`, `--space-16`, `--space-20`, etc. (lines ~98–102)
- Container widths: `--container-narrow: 760px`, `--container-wide: 1786px` (lines ~106–107)

**Steps:**
1. Find the token in `tokens.css`
2. Update the value
3. Run `npm run build`

**What updates automatically:** All components and pages using that token re-compute. Example: changing `--font-size-body` from 18px to 20px updates body text site-wide.

**Never hardcode.** Search for existing tokens first — they're stable and reusable.

---

## 8. BEFORE PUSHING TO PRODUCTION

**Run this command:**
```bash
npm run pre-deploy
```

**What it does:**
- Type-checks all Astro pages (`npx astro check`)
- Verifies no horizontal overflow on responsive viewports (`npm run verify:overflow`)
- Verifies heading structure is correct (`npm run verify:headings`)
- Verifies all images/videos load properly (`node scripts/verify-images.mjs`)
- Verifies touch targets meet WCAG 2.5.8 (44×44px at mobile) (`node scripts/verify-touch-targets.mjs`)

**Expected output:**
- `✅ Type check: 0 errors`
- `✅ Overflow: 104/104 checks pass`
- `✅ Headings: 12/12 routes pass`
- `✅ Images: 0 broken`
- `⚠️ Touch targets: [number] undersized` (may have warnings; fix if possible, but not a blocker)

**If all green:** Safe to push.  
**If any red:** Fix the error before pushing.

---

## SUMMARY

| Task | File | Automatic Updates | Edits Required |
|------|------|-------------------|-----------------|
| Accent color | tokens.css | 45 refs | 1 value |
| Footer copy/layout | Footer.astro | All pages | Varies |
| Hero video | public/basalio-hero.mp4 | 2 pages | Replace file only |
| WhoItsFor images | public/assets/*.webp | All pages using WhoItsFor | Replace file only |
| Block icons | public/assets/icons/blocks/*.svg | Glob loads automatically | Replace file + match slug |
| New page | Copy NEW-PAGE.astro | Header, Footer, layout | Template + content |
| Spacing/typography | tokens.css | All uses of token | 1 value |
| Pre-deploy | — | — | npm run pre-deploy |

---

**Last updated 2026-08-11**
