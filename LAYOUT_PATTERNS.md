# Layout Patterns Reference — Ramp Studio Clone

Canonical definitions for structural patterns reused across this site. Reference these BY NAME in prompts instead of re-describing them — re-describing from memory each time is how drift creeps in.

---

## PATTERN: `header-split-35-65`
Used in: What We Do, Our Courses, Our Resources, Monthly Retainer, FAQ

```
┌─────────────────────────────────────────────────────────┐
│ ┌─────────────┐  ┌────────────────────────────────────┐ │
│ │  EYEBROW     │  │  (varies by section — description,  │ │
│ │  35% width   │  │   heading, cards, list, etc.)       │ │
│ │              │  │   65% width                         │ │
│ └─────────────┘  └────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```
```css
.row { display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start; }
.left  { flex: 1 1 0%; max-width: 35%; }
.right { flex: 1 1 0%; max-width: 65%; }
```
Eyebrow text style (always identical): Azeret Mono, 14px, weight 500, uppercase, letter-spacing 2.8px, color ink.

CRITICAL: any content BELOW this header row that should align under the right column (lists, grids) needs to be EXPLICITLY placed inside a matching 35/65 wrapper — it does NOT inherit alignment from the header row above it just by being a sibling. This was the exact bug on Our Resources — verify alignment with getBoundingClientRect, don't assume.

---

## PATTERN: `divider-list`
Used in: What We Do (stats), Our Resources (resource rows)

```
┌──────────────────────────────┐
│ ─────────────────────────────│ ← divider, 1px, rgba(0,0,0,0.1)
│  Row content                  │
│ ─────────────────────────────│ ← divider
│  Row content                  │
│ ─────────────────────────────│ ← divider (closing — AFTER last row too)
└──────────────────────────────┘
```
N rows = N+1 dividers (one above each row, PLUS one closing divider after the last row — do not forget the closing one).
```css
.list { display: flex; flex-direction: column; gap: 20px; }
.divider { height: 1px; background: rgba(0,0,0,0.1); }
```

---

## PATTERN: `two-pill-button` (the site's universal CTA)
Used in: header, Our Courses, Our Resources, Monthly Retainer (x2), footer nav — reuse the SAME component everywhere, never rebuild

```
┌──────────────┬───────┐
│  TEXT PILL    │ ICON  │  ← flush together, gap: 0, no space between
│  (grows to    │ 40px  │
│   fit text)   │ x44px │
└──────────────┴───────┘
```
```css
.btn { display: flex; flex-direction: row; gap: 0; }
.text-pill { background: ink; color: paper; border-radius: 8px; padding: 12px 16px;
             font: Azeret Mono, 14px, weight 500, uppercase, letter-spacing 2.8px; }
.icon-pill { background: ink; border-radius: 8px; width: 40px; height: 44px;
             display: flex; align-items: center; justify-content: center; }
.icon-pill svg { transition: transform 200ms ease-out; }
.btn:hover .icon-pill svg { transform: translateX(3px); }
```
Real `<a href>`, always — never a JS-only onClick.

---

## PATTERN: `accordion` (two variants — do not conflate them)

**FAQ variant**: black card (bg ink, radius 6px, padding 20px), whole row is the click target, multi-open confirmed, height-animates.
**Resources variant**: no card background (stays on page bg), icon-only is the click target (not whole row — unconfirmed if whole-row works), height-animates.

Both variants share: static "+" icon that NEVER rotates or changes on toggle. Do not add rotation to either.

---

## PATTERN: `card-grid-2col`
Used in: Courses listing page

```
┌───────────────┐  ┌───────────────┐
│  image tile   │  │  image tile   │
│  (yellow,     │  │  (yellow,     │
│   icon inside)│  │   icon inside)│
└───────────────┘  └───────────────┘
  Title below tile    Title below tile
  Description          Description
  [tag pill]           [tag pill]
```
CRITICAL: title/description/tag sit OUTSIDE and BELOW the image tile, on the page background — NOT nested inside a bordered card wrapper. Two visually separate pieces per grid item, not one boxed card.
```css
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }
.tile { aspect-ratio: 1.5; background: brand-yellow; border-radius: 8px; }
```

---

## PATTERN: `sticky-footer-reveal`
Used in: footer (last section before it needs this)

```css
/* on the LAST content section before the footer */
.last-section { border-radius: 0 0 40px 40px; }
/* on the wrapper containing all main content */
.main-wrapper { position: relative; z-index: 2; }
/* on the footer's own wrapper */
.footer-wrapper { position: sticky; bottom: 0; z-index: 1; }
```
If the section order changes, the `border-radius` and the "last section before footer" designation must move with it.

---

## How to use this file in prompts

Reference like: *"Use PATTERN: header-split-35-65 for the top row (see LAYOUT_PATTERNS.md)."* Only describe what's DIFFERENT from the canonical pattern in prose — not the whole thing again.
