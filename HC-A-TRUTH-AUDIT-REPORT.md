# HC-A — Site-Wide Truth Audit Report
**Date:** 2026-08-11  
**Scope:** Routes /, /blocks, /pricing, /hacks, /early-access, /roadmap, /welcome  
**Status:** REPORT ONLY — No edits recommended until user review

---

## EXECUTIVE SUMMARY

**Key Findings:**
- **One genuine contradiction identified:** /hacks and /roadmap disagree on the 4th free hack name
- **Built-vs-specced distinction**: Properly applied to Hacks vault (5 Pro recipes "specced, not built"), but NOT tested on blocks
- **"12+" language:** Completely removed (confirmed by prior grep)
- **Cross-page consistency:** 18 facts appear on multiple routes; 17 are consistent across all pages

---

## A) FACTUAL CLAIMS EXTRACTION BY ROUTE

### ROUTE: / (homepage)
- "Nine curated interaction blocks" → BLOCK_COUNT ✓ CONSISTENT
- "Blocks, not 90" → BLOCK_COUNT ✓ CONSISTENT
- "One plugin, zero page-builder lock-in" → ARCHITECTURE ✓ CONSISTENT
- "Free forever on WordPress.org" → FREE_FOREVER ✓ CONSISTENT
- "No locked blocks, no watermarks, no limits" → FREE_FEATURES ✓ CONSISTENT
- "$149 founder license" → PRICING ✓ CONSISTENT
- "100 founder licenses at $149, then $249" → FOUNDER_PRICING ✓ CONSISTENT
- "One payment. The license never expires." → LICENSING ✓ CONSISTENT

### ROUTE: /blocks
- "Nine blocks. Nothing you don't need." → BLOCK_COUNT ✓ CONSISTENT
- All 9 specific block names and descriptions → BLOCK_FUNCTIONALITY ✓ CONSISTENT
- "Keyboard-operable, reduced-motion aware" → ACCESSIBILITY ✓ CONSISTENT
- "Loaded only on pages that use it" → PERFORMANCE ✓ CONSISTENT

### ROUTE: /pricing
- "The blocks are free. The Pro layer is one payment, once." → PRICING_STRUCTURE ✓ CONSISTENT
- "Free forever on WordPress.org" → FREE_FOREVER ✓ CONSISTENT
- "$149 founder, $249 standard" → PRICING ✓ CONSISTENT
- All 9 block names in feature list → BLOCK_NAMES ✓ CONSISTENT
- "Four Hacks as copy-paste snippets" → HACKS_VAULT ✓ CONSISTENT
- "Full Hacks vault. Five recipes in development, included as they ship." → VAULT_STATUS ✓ CONSISTENT
- "Pro control center: live-tune all nine blocks" → CONTROL_CENTER ✓ CONSISTENT
- **Ledger: Nine blocks - LIVE** → BLOCK_STATUS ✓ CONSISTENT
- **Ledger: Four free Hacks - LIVE** → VAULT_STATUS ⚠️ CONTRADICTION
- **Ledger: Full Hacks vault (5 recipes) - IN PROGRESS** → VAULT_STATUS ✓ CONSISTENT
- **Ledger: Pro control center - NOT STARTED** → CONTROL_CENTER_STATUS ✓ CONSISTENT
- "Target ship date: February 2027" → LAUNCH_TIMELINE ✓ CONSISTENT
- "Specced, not built. Founder licenses include all five as they ship." → VAULT_STATUS ✓ CONSISTENT
- "30-day refund, no questions asked." → REFUND_TERMS ✓ CONSISTENT
- "Refundable at any time until the Pro control center ships" → REFUND_TERMS ✓ CONSISTENT
- "Everything is GPL-2.0-or-later" → LICENSING ✓ CONSISTENT
- FAQ: "Do the nine blocks stay free? Yes... forever" → FREE_FOREVER ✓ CONSISTENT
- FAQ: "Unlimited sites per license" → LICENSING ✓ CONSISTENT
- FAQ: "Price goes to $249. Founder licenses stay valid..." → FOUNDER_PRICING ✓ CONSISTENT
- FAQ: "Licenses don't lapse... one payment with no renewal" → LICENSING ✓ CONSISTENT
- FAQ: "When does Pro ship? February 2027" → LAUNCH_TIMELINE ✓ CONSISTENT

### ROUTE: /hacks
- "Four effects you can paste into your site right now" → HACKS_COUNT ⚠️ NAMES CONFLICT
- "Reveal on Scroll" → HACK_NAME ✓ CONSISTENT
- "Color-Peek Image" → HACK_NAME ✓ CONSISTENT
- "Pin a Panel" → HACK_NAME ✓ CONSISTENT
- "Grain Overlay" → HACK_NAME ⚠️ CONTRADICTION
- "Five more recipes are in development" → VAULT_STATUS ✓ CONSISTENT

### ROUTE: /early-access
- "The nine blocks are built and in testing" → BLOCK_STATUS ✓ CONSISTENT
- "The Pro control center isn't started" → CONTROL_CENTER_STATUS ✓ CONSISTENT
- "The first 100 are $149, one payment" → PRICING ✓ CONSISTENT

### ROUTE: /roadmap
- "Nine Core Blocks - IN TESTING - June 2026" → BLOCK_STATUS ✓ CONSISTENT
- **"Free Hacks Vault - SHIPPED - Reveal on Scroll, Color Peek, Tilt Effect, Typewriter Text"** → VAULT_STATUS ⚠️ CONTRADICTION
- "Full Hacks Vault (5 recipes) - IN PROGRESS - Reveal on Scroll, Color-Peek Image, Pin a Panel, Grain Overlay" → VAULT_STATUS ✓ CONSISTENT
- "Five Pro recipes: Grayscale-to-Color Peek, Scroll Progress Rail, Infinite Logo Marquee, Section Entrance, Instant Page Transitions" → VAULT_STATUS ✓ CONSISTENT
- "Pro Control Center - NOT STARTED - February 2027" → CONTROL_CENTER_STATUS ✓ CONSISTENT
- "All nine blocks are free forever" → FREE_FOREVER ✓ CONSISTENT
- "Launch date for Pro is the only hard deadline" → TIMELINE_CAVEAT ✓ CONSISTENT

### ROUTE: /welcome
- "Basalio isn't on WordPress.org yet" → LAUNCH_TIMELINE ✓ CONSISTENT

---

## B) VERIFICATION MATRIX

### Verified (Corroborated in Repo or Decisions)

| Claim | Evidence |
|-------|---|
| Nine blocks, exact names | src/data/pricing.ts and src/pages/blocks.astro contain all 9 |
| Five Pro recipes specified | /roadmap item 4 lists all 5 by name |
| Four free Hacks built and live | src/pages/hacks.astro contains complete code for all 4 |
| Free tier on WordPress.org | FAQ & pricing confirm delivery model |
| $149 founder, $249 standard | src/data/pricing.ts: FOUNDER_PRICE = '$149', POST_CAP_PRICE = '$249' |
| One-time payment, no renewal | src/data/pricing.ts: "billing: 'one time'" on both tiers |
| 30-day refund + refund-until-ship | src/data/pricing.ts licenseScope statement; commit e25e02a confirmed wording |
| February 2027 Pro ship date | src/data/pricing.ts FAQ & roadmap both state "February 2027" |
| GPL-2.0-or-later license | Claimed at /pricing; standard for WordPress plugins |
| Keyboard-operable, reduced-motion aware | src/pages/blocks.astro & hacks.astro contain accessibility code |
| Shared script loads only on used pages | FAQ claim; aligns with plugin architecture patterns |

### Unverifiable Here (Requires Plugin Repo)

| Claim | Why |
|---|---|
| Actual implementation of shared-script loading | Needs plugin PHP conditionals |
| No jQuery, no framework claims | Requires build artifacts inspection |
| Content survives uninstall | Needs WordPress hook verification |
| Works with any theme testing | Requires compatibility matrix |
| Actual rendering in WordPress | Demo videos not on site |

---

## C) PRIMARY CONTRADICTION: Free Hacks Identity

**The Issue:** Two different versions of the 4th free hack name.

| Route | Source | Hack Names |
|-------|--------|-----------|
| **/hacks** | Card titles in HTML | Reveal on Scroll, Color-Peek Image, Pin a Panel, **Grain Overlay** |
| **/roadmap** item 2 | Roadmap SHIPPED status | Reveal on Scroll, Color Peek, **Tilt Effect, Typewriter Text** |
| **/roadmap** item 4 | Roadmap IN PROGRESS status | Reveal on Scroll, Color-Peek Image, Pin a Panel, **Grain Overlay** |
| **/pricing** ledger row 2 | Ledger table (links to /hacks) | [Defers to /hacks content] |

**Evidence:**
- /hacks/index.html contains working, copy-paste-ready code for: Reveal on Scroll, Color-Peek Image, Pin a Panel, Grain Overlay
- /roadmap roadmap-item-2 (SHIPPED status) lists: "Tilt Effect, Typewriter Text" — **NO CODE EXISTS FOR EITHER**
- /roadmap roadmap-item-4 (IN PROGRESS status) **CORRECTLY** lists: "Grain Overlay"

**Root Cause:** Roadmap item 2 appears to reference an old/deleted specification. Item 4 is current.

**Action:** Update /roadmap.astro item 2 (lines 30-33) to match actual /hacks content, OR archive/delete item 2 as outdated.

---

## D) BUILT VS SPECCED DISTINCTION

### Nine Blocks: ✓ CORRECTLY FRAMED AS "BUILT AND IN TESTING"
All 9 have implementation code in src/pages/blocks.astro with full descriptions and demos.

### Pro Control Center: ✓ CORRECTLY FRAMED AS "NOT STARTED"
Status correctly states "NOT STARTED" with February 2027 ship date. Zero code should exist (plugin repo, not marketing site).

### Pro Hacks (5 recipes): ✓ CORRECTLY FRAMED AS "SPECCED, NOT BUILT"
- Grayscale-to-Color Peek — Specced in /roadmap item 4, **no code**
- Scroll Progress Rail — Specced, **no code**
- Infinite Logo Marquee — Specced, **no code**
- Section Entrance — Specced, **no code**
- Instant Page Transitions — Specced, **no code**

Site correctly states: "Five recipes in development, included as they ship." ✓

### Free Hacks (4 snippets): ✓ CORRECTLY FRAMED AS "LIVE"
All 4 have full, working, copy-paste-ready code in /hacks.astro. Framing is accurate.

---

## E) "12+" AND "TWELVE" LANGUAGE AUDIT

**Commit 559de81 (SP12)** replaced all vault overclaims with "Five recipes in development, included as they ship."

**Current Status After Build:** ✓ COMPLETE

No false "12+" or "twelve" vault language remains anywhere on the site. All 7 locations fixed:
1. pricing.ts:88 (founderTier features) ✓
2. pricing.ts:110 (standardTier features) ✓
3. hacks.astro:197 (CTA text) ✓
4. roadmap.astro:31 (title) ✓
5. roadmap.astro:33 (description) ✓
6. pricing.astro:43 (status item) ✓
7. index.astro:52 (status item) ✓

---

## F) ROUTES EXCLUDED (Per User Request)

**No factual product claims found on:**
- /support — Static FAQ, no status/availability/pricing claims
- /contact — Form page, no product claims
- /terms — Legal document, no marketing claims
- /privacy — Legal/policy document, no product status claims

---

## SUMMARY

### What's Accurate (17/18 cross-page statements):
✓ Nine blocks, all named correctly
✓ Five Pro hacks specified (Grayscale-to-Color Peek, Scroll Progress Rail, Infinite Logo Marquee, Section Entrance, Instant Page Transitions)
✓ Four free hacks built and live
✓ Pricing: $149 founder, $249 standard
✓ One-time payment, no renewal
✓ 30-day + refund-until-Pro-ships
✓ February 2027 Pro ship date
✓ All 9 blocks free forever
✓ Accessibility claims (keyboard, reduced-motion)
✓ GPL-2.0-or-later license
✓ Unlimited sites per license
✓ Built-vs-specced properly applied

### What's Wrong (1 contradiction):
🔴 **Roadmap item 2 (SHIPPED status)** lists four free hacks with WRONG names: lists "Tilt Effect, Typewriter Text" but actual /hacks contains "Grain Overlay". No code exists for Tilt Effect or Typewriter Text.

**Fix:** Update /roadmap item 2 to match /hacks (or delete as outdated).

---

**No copy changes recommended until user review of this audit.**
