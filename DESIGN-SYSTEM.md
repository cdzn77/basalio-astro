# Basalio Design System

## Color Palette

### Primary Colors
- **Accent Yellow**: `#DFFF00` - Hero sections, buttons, highlights, interactive elements
- **Black**: `#0A0A0A` - Primary text, buttons, UI elements
- **True Black**: `#000000` - Text on yellow backgrounds

### Neutral Grays
- **Light Gray**: `#E8E8E8` - Light module backgrounds
- **Beige**: `#DFDCD5` - Light warm background (Grid Reveal)
- **Off-White**: `#F6F4EF` - Very light backgrounds
- **Medium Gray**: `#B3B3B3` - Secondary backgrounds
- **Mid-Gray**: `#D0D0D0` - Tertiary backgrounds
- **Dark Gray**: `#2D2D2D` - Dark module backgrounds
- **Darker Gray**: `#1A1A1A` - Very dark backgrounds
- **Very Dark**: `#1C1917` - Performance section background
- **Custom Black**: `#0B0B0A` - Case Study Transition dark background

### Text Colors
- **Primary**: `#000000` - Main text on light backgrounds
- **Secondary**: `#666666` - Secondary text
- **Tertiary**: `#AAA` - Tertiary text on dark backgrounds
- **Light Text**: `#FFFFFF` - Text on dark backgrounds
- **Muted**: `#D4CABE` - Muted text on dark backgrounds

---

## Typography

### Font Families
1. **Space Grotesk** (Display/Headlines)
   - Font weights: 500, 600, 700
   - Usage: H1, H2, H3, Navigation, Buttons, UI labels

2. **Inter** (Body/UI)
   - Font weights: 400, 500, 600, 700
   - Usage: Body text, descriptions, module content

3. **IBM Plex Mono** (Monospace/Code)
   - Font weights: 400, 500
   - Usage: Eyebrows, labels, small UI text
   - Text transform: UPPERCASE
   - Letter spacing: 0.08em

4. **Fraunces** (Serif Italic)
   - Font weight: 500
   - Font style: Italic
   - Usage: Accent italic text in headlines (e.g., "a foundation")

### Type Scale

#### Headings
- **H1** (Hero): 48px–96px (clamp), Space Grotesk 700, Letter spacing -0.02em
- **H2** (Section): 32px–72px (clamp), Space Grotesk 700, Letter spacing -0.02em, Margin-bottom: 40px
- **H3** (Module): 32px, Inter 400, Line height 42px, Margin-bottom: 16px
- **H4** (Modal): 18px, Font weight 600

#### Body
- **Large Body**: 18px, Inter 400, Line height 24px
- **Body**: 16px, Inter 400, Line height 1.5
- **Small**: 14px, Font weight 400
- **Micro**: 12px, Font weight 400

#### Labels & UI
- **Eyebrow**: 12px, IBM Plex Mono 400, Uppercase, Letter spacing 0.08em, Color: Secondary
- **Button**: 14px, Space Grotesk 600, Uppercase, Letter spacing 0.08em

---

## Spacing System

### Base Units (8px Grid)
- `xs`: 8px
- `sm`: 12px
- `md`: 16px
- `lg`: 20px
- `xl`: 24px
- `2xl`: 32px
- `3xl`: 40px
- `4xl`: 60px
- `5xl`: 80px
- `6xl`: 100px
- `7xl`: 120px

### Common Spacing Values
- **Section padding**: 100px (vertical), 40px (horizontal)
- **Module tile padding**: 60px (top/sides), 0 (bottom)
- **Module content margin-bottom**: 60px
- **Gap between grid items**: 0 (no gap in module grid)
- **Responsive (tablet)**: 60px → 40px
- **Responsive (mobile)**: 40px → 20px

---

## Components

### Navigation
- **Position**: Fixed, top 14px
- **Background**: rgba(255, 255, 255, 0.95)
- **Backdrop**: blur(14px)
- **Border**: 1px solid rgba(0, 0, 0, 0.08)
- **Border-radius**: 999px (full pill)
- **Padding**: 8px 8px 8px 22px
- **Shadow**: 0 24px 48px -24px rgba(0, 0, 0, 0.15)
- **Z-index**: 50

#### Nav Links
- **Font**: Space Grotesk 700, 18px
- **Color**: #000
- **Hover state**: Color transition 0.15s ease

#### Mobile Menu Button
- **Display**: Hidden on desktop, block on tablet (768px and below)
- **Size**: 44px × 44px
- **Background**: None
- **Color**: #000

#### Mobile Menu
- **Position**: Fixed full screen
- **Background**: #fff
- **Padding-top**: 80px
- **Links**: Full width, padding 16px 20px, border-bottom 1px solid rgba(0, 0, 0, 0.08)
- **Hover**: Background rgba(0, 0, 0, 0.05), color #000

---

### Buttons

#### Button Base
- **Font**: Space Grotesk 600, 14px
- **Padding**: 15px 32px
- **Min-height**: 44px
- **Border**: 2px solid #000
- **Border-radius**: 0 (sharp corners)
- **Cursor**: Pointer
- **Transition**: all 0.25s cubic-bezier(0.16, 1, 0.3, 1)
- **Display**: Inline-flex, center-aligned

#### Button States
- **:hover**: transform translateY(-2px), box-shadow elevation
- **:active**: transform scale(0.98), reduced shadow
- **:focus**: outline 2px solid #000, outline-offset 2px

#### Button Variants

**Dark Button** (.btn-dark)
- **Background**: #000
- **Color**: #DFFF00
- **Shadow**: 0 4px 12px rgba(0, 0, 0, 0.15)
- **Hover shadow**: 0 8px 24px rgba(0, 0, 0, 0.25)

**Light Button** (.btn-light)
- **Background**: #DFFF00
- **Color**: #000
- **Border-color**: #000
- **Shadow**: 0 4px 12px rgba(0, 0, 0, 0.08)
- **Hover shadow**: 0 8px 24px rgba(0, 0, 0, 0.12)

#### Nav Button Primary
- **Background**: #000
- **Color**: #fff
- **Font**: Space Grotesk 600, 13px
- **Padding**: 12px 24px
- **Border-radius**: 999px (full pill)
- **Shadow**: 0 2px 8px rgba(0, 0, 0, 0.15)

---

### Module Tile System

#### Module Row Container
- **Display**: Grid
- **Grid columns**: 1fr 1fr (2-column, full-bleed single columns on responsive)
- **Gap**: 0 (no gap)
- **Max-width**: 1320px
- **Height**: 600px (container height)
- **Padding**: 0 60px
- **Overflow**: hidden
- **Align-items**: stretch

#### Module Tile
- **Display**: flex, flex-direction column
- **Height**: 100%
- **Padding**: 60px 60px 0 60px
- **Background variants**:
  - `.bg-light`: #E8E8E8
  - `.bg-dark`: #2D2D2D
  - `.bg-mid-dark`: #2D2D2D
  - `.bg-accent`: #B3B3B3
  - Custom backgrounds via inline styles

#### Module Content
- **Margin-bottom**: 60px
- **Padding**: 0
- **Flex**: Column

#### Module Image
- **Width**: 100%
- **Flex**: 1
- **Overflow**: hidden
- **Margin**: 0
- **Min-height**: 0
- **Video object-fit**: 
  - Default: cover
  - .case-study-video: contain (override with !important)

#### Module Full-Bleed (Single Module Rows)
- **Background**: #2D2D2D
- **Color**: #fff
- **Padding**: 120px 60px
- **Margin**: 0
- **Display**: flex, flex-direction column
- **Justify-content**: flex-start

---

### Hero Section

- **Width**: 100%
- **Min-height**: 100vh
- **Background**: #DFFF00
- **Display**: flex, center-aligned
- **Padding**: 120px 40px 60px
- **Text-align**: center

#### Hero Content
- **Max-width**: 1200px

#### Hero Eyebrow
- **Font**: IBM Plex Mono 12px, uppercase
- **Letter-spacing**: 0.08em
- **Color**: #000
- **Margin-bottom**: 40px

#### Hero H1
- **Font**: Space Grotesk 700
- **Font-size**: clamp(48px, 8vw, 96px)
- **Line-height**: 1.1
- **Margin-bottom**: 40px
- **Color**: #000
- **Letter-spacing**: -0.02em

#### Hero Subtitle
- **Font-size**: clamp(16px, 2.5vw, 20px)
- **Color**: #000
- **Max-width**: 65ch
- **Margin-bottom**: 40px
- **Line-height**: 1.6

#### Hero CTA
- **Display**: flex, gap 16px
- **Justify-content**: center
- **Align-items**: center
- **Flex-wrap**: wrap

---

### Interactive Module Components

#### Scroll Sequence (Range Slider)
- **Progress bar**: 40px height
- **Background**: rgba(255, 255, 255, 0.08)
- **Fill gradient**: linear-gradient(90deg, #DFFF00, #B8CC00)
- **Slider thumb**: 18px circle, #DFFF00
- **Hover state**: 22px circle, enhanced shadow

#### Image Counter Display
- **Font-size**: 64px
- **Font-weight**: 700
- **Color**: #0A0A0A
- **Background**: #F0F0F0
- **Padding**: 16px 24px
- **Border-radius**: 12px
- **Display**: Inline-block

#### Parallax Container
- **Background**: linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)
- **Border-radius**: 12px
- **Overflow**: hidden
- **Layers**: Multiple radial gradients with DFFF00 accents
- **Visual element**: 200px×200px rotated diamond with #DFFF00 border

#### Text Reveal Words
- **Animation**: slideWord 0.4s cubic-bezier(0.16, 1, 0.3, 1)
- **Display**: inline-block
- **Margin-right**: 6px
- **Stagger**: 0.06s between words

#### Hover Zoom Box
- **Size**: 240px × 240px
- **Background**: linear-gradient(135deg, #E0E0E0 0%, #D0D0D0 100%)
- **Border-radius**: 12px
- **Transition**: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)
- **Hover scale**: 1.08
- **Hover shadow**: 0 16px 48px rgba(0, 0, 0, 0.12)

#### Click Expand Cards
- **Background**: rgba(255, 255, 255, 0.1)
- **Border**: 1px solid rgba(255, 255, 255, 0.15)
- **Padding**: 32px 24px
- **Color**: #fff
- **Border-radius**: 0
- **Min-height**: 120px
- **Display**: flex, center-aligned
- **Hover**: Background rgba(255, 255, 255, 0.15), elevated shadow
- **Icon color**: #DFFF00

#### Scroll Lock Frames
- **Background**: linear-gradient(90deg, #D0D0D0 0%, #C0C0C0 100%)
- **Display**: flex, gap 30px
- **Padding**: 60px 40px
- **Frame background**: rgba(255, 255, 255, 0.3)
- **Animation**: slideWord 0.6s ease-out with stagger (0.15s between)

---

## Animations & Motion

### Timing Functions
- **Standard**: cubic-bezier(0.16, 1, 0.3, 1) - Snappy, energetic
- **Easing**: ease-out - Smooth deceleration
- **Linear**: Default for scroll-based

### Transition Times
- **Fast**: 0.15s - Hover states, color changes
- **Normal**: 0.2s–0.3s - Button interactions
- **Medium**: 0.4s–0.6s - Module reveals, text animations
- **Slow**: 1s+ - Large sequence animations

### Key Animations
- **riseIn**: 0–1s, opacity fade + translateY(0)
- **benchPulse**: Pulsing box-shadow, 0.4s cycle
- **fillBar**: Progress bar fill, 2s
- **countUp**: Counter animations, 1s ease-out
- **slideUp**: Element slide up, 0–1s opacity + transform
- **slideWord**: Word-by-word reveal, 0.4s stagger

### Scroll Animations
- **Module reveals**: Fade in + translateY(60px) on scroll trigger
- **Section headings**: Fade in + translateY(40px) on scroll trigger
- **Scroll trigger start**: "top 85%"
- **Scroll trigger end**: "top 50%"

---

## Layout Grid

### Container Widths
- **Max-width**: 1200px (content)
- **Max-width**: 1320px (modules)
- **Full-width**: 100%

### Responsive Breakpoints

#### Desktop (1024px+)
- **Padding**: 40px sides
- **Module padding**: 60px
- **Section padding**: 100px

#### Tablet (768px–1024px)
- **Padding**: 40px sides
- **Module padding**: 40px
- **Section padding**: 60px
- **Grid**: Single column (1fr)
- **Module height**: auto, min-height 400px

#### Mobile (480px–768px)
- **Padding**: 20px sides
- **Module padding**: 40px
- **Section padding**: 60px
- **Grid**: Single column, 1fr

#### Small Mobile (360px–480px)
- **Padding**: 16px sides
- **Module padding**: 30px
- **Section padding**: 40px

---

## Shadows

- **xs**: 0 2px 8px rgba(0, 0, 0, 0.15)
- **sm**: 0 4px 12px rgba(0, 0, 0, 0.15)
- **md**: 0 8px 24px rgba(0, 0, 0, 0.12)
- **lg**: 0 8px 24px rgba(0, 0, 0, 0.25)
- **xl**: 0 24px 48px -24px rgba(0, 0, 0, 0.15)
- **inset**: inset 0 0 0 1px rgba(0, 0, 0, 0.1)

---

## Border Radius

- **sharp**: 0 (primary, buttons, modules)
- **sm**: 2px (small elements)
- **md**: 12px (demo boxes, interactive elements)
- **full**: 999px (navigation, pill buttons)

---

## Focus & Accessibility

### Focus States
- **Outline**: 2px solid (context-dependent color)
- **Outline-offset**: 2px (usually), -2px (interactive cards)
- **Color**: #000 (light backgrounds), #DFFF00 (dark backgrounds)

### Touch Targets
- **Minimum size**: 44px × 44px (all interactive elements)
- **Spacing**: Adequate padding between touchable areas

### Color Contrast
- **Text on yellow (#DFFF00)**: #000 (contrast ratio: 19.56:1 ✓)
- **Text on black (#0A0A0A)**: #fff (contrast ratio: 21:1 ✓)
- **Text on gray (#E8E8E8)**: #000 (contrast ratio: 14:1 ✓)

---

## Motion Preferences

### Prefers Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | #DFFF00 | Accent, highlights |
| `--color-text` | #000 | Primary text |
| `--color-text-secondary` | #666 | Secondary text |
| `--color-bg-light` | #E8E8E8 | Light backgrounds |
| `--color-bg-dark` | #2D2D2D | Dark backgrounds |
| `--font-display` | Space Grotesk | Headlines |
| `--font-body` | Inter | Body text |
| `--font-mono` | IBM Plex Mono | Labels, code |
| `--space-md` | 16px | Default spacing |
| `--space-lg` | 24px | Section spacing |
| `--transition-fast` | 0.15s | Quick interactions |
| `--transition-normal` | 0.3s | Standard transitions |
| `--radius-sharp` | 0 | Primary radius |
| `--radius-full` | 999px | Pill shapes |

---

## Usage Guidelines

### When to Use Colors
- **Yellow (#DFFF00)**: Call-to-action buttons, hero section backgrounds, interactive highlights, focus states on dark backgrounds
- **Black (#0A0A0A/000)**: Primary text, navigation, buttons, interactive elements
- **Light Gray (#E8E8E8)**: Module backgrounds, secondary UI surfaces
- **Dark Gray (#2D2D2D)**: Dark module backgrounds, contrast sections
- **Beige (#DFDCD5)**: Warm light backgrounds (Grid Reveal, editorial)

### When to Use Typography
- **Space Grotesk (Bold)**: Headlines (H1–H3), navigation, large buttons
- **Inter (Regular–Bold)**: Body copy, module descriptions, UI text
- **IBM Plex Mono**: Labels, eyebrows, small UI text, metadata
- **Fraunces (Italic)**: Accent text within headlines for emphasis

### Component Pairing
- **Light backgrounds**: Dark text, dark borders, dark shadows
- **Dark backgrounds**: Light text, light borders, subtle shadows
- **Interactive states**: Yellow accent, shadow lift, color transitions
- **Focus states**: Sharp outline, high contrast

