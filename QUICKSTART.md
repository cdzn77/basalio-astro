# Ramp Astro Template - Quick Start Guide

Get up and running with the Ramp Astro template in 5 minutes.

## Installation

### Option 1: Clone the Template
```bash
# Copy the template directory
cp -r /Users/angelomanzanojr/Projects/themes/ramp-astro-template ~/my-new-site

cd ~/my-new-site

# Install dependencies
npm install

# Start dev server
npm run dev -- --port 4321
```

Visit `http://localhost:4321/index-ramp-rebuild`

### Option 2: Fresh Astro Project
```bash
npm create astro@latest my-new-site -- --template
cd my-new-site
# Copy template files into src/ directory
npm install
npm run dev
```

## Configuration

### 1. Update Site Metadata
Edit `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  // other config
});
```

### 2. Customize Brand
Edit `src/components/RampHeader.astro`:
```astro
const { brand = "Your Brand." } = Astro.props;
```

### 3. Update Colors
Edit component CSS files and change hex values:
- Yellow hero: `#FFEA00` → your color
- Button text: `#000000` → your color
- Background: `#FAFAFA` → your color

### 4. Configure Navigation
Edit `src/components/RampHeader.astro` (lines 24-28):
```astro
<a href="/your-page" class="menu-item">YOUR LINK</a>
```

## Creating New Pages

### Add a New Page
1. Create file in `src/pages/your-page.astro`
2. Import layout and components
3. Build your page

Example:
```astro
---
import RampTemplateLayout from '../layouts/RampTemplateLayout.astro';
import RampHeader from '../components/RampHeader.astro';
import Button from '../components/Button.astro';

const title = "Your Page";
const description = "Page description";
---

<RampTemplateLayout title={title} description={description}>
  <Fragment slot="header">
    <RampHeader />
  </Fragment>

  <section class="your-section">
    <h1>Welcome</h1>
    <Button label="Click Me" href="/" />
  </section>
</RampTemplateLayout>

<style>
  .your-section {
    padding: 40px;
    background: white;
  }
</style>
```

## Using the Button Component

The Ramp template includes a unified Button component:

```astro
import Button from '../components/Button.astro';

<!-- Basic usage -->
<Button label="Click Me" href="/page" />

<!-- With custom styling -->
<Button 
  label="Subscribe" 
  href="/subscribe" 
  fontSize="16px"
  fontWeight="600"
  letterSpacing="3px"
  uppercase={true}
/>
```

### Button Props
- `label` (required) - Button text
- `href` (optional) - Link URL
- `onClick` (optional) - JavaScript click handler
- `fontSize` - Default: "14px"
- `fontWeight` - Default: "500"
- `letterSpacing` - Default: "2.8px"
- `uppercase` - Default: true

## Development Commands

```bash
# Start dev server (localhost:4321)
npm run dev

# Type check
npx astro check

# Build for production
npm run build

# Preview production build
npm run preview

# Take screenshots
npx playwright screenshot \
  --browser chromium \
  --full-page \
  --viewport-size "1440,900" \
  http://localhost:4321/index-ramp-rebuild \
  screenshot.png
```

## Git Workflow

```bash
# Check status
git status

# Commit changes
git add .
git commit -m "Your message"

# Push to remote
git push origin main

# View commit history
git log --oneline
```

## Deployment (Netlify)

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/`
4. Push to main branch
5. Netlify auto-deploys (~1-3 minutes)

## Customizing Sections

### Hero Section
Edit `src/components/RampHero.astro`:
- Change heading text
- Update course teaser text
- Modify background color/image

### Courses Section
Edit `src/components/RampCourses.astro`:
- Update course data
- Change heading
- Modify grid layout

### Pricing/Retainer
Edit `src/components/RampRetainer.astro`:
- Update pricing tiers
- Change plan features
- Modify card colors

### Footer
Edit `src/components/RampFooter.astro`:
- Add social links
- Update company info
- Change footer links

## Styling Tips

### Global Styles
Edit `src/styles/` directory:
- `global.css` - Global reset and utilities
- `animations.css` - Keyframes and animations
- `components.css` - Component styles

### Component Scoping
Each `.astro` component has its own `<style>` block:
```astro
<style>
  /* Scoped to this component only */
  .my-class {
    color: red;
  }
</style>
```

### CSS Variables
Use `define:vars` to pass props to CSS:
```astro
<style define:vars={{ bgColor, textColor }}>
  .element {
    background: var(--bgColor);
    color: var(--textColor);
  }
</style>
```

## Troubleshooting

### Dev Server Not Starting
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Build Fails
```bash
# Type check first
npx astro check

# Clear build cache
rm -rf dist .astro
npm run build
```

### Styles Not Applying
1. Check scoped CSS in component
2. Verify CSS specificity
3. Use `!important` if needed for overrides

### Images Not Loading
1. Place images in `public/` directory
2. Reference as `/image-name.png`
3. Use relative paths for assets

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Astro API Reference](https://docs.astro.build/en/reference/api-reference/)
- [CSS Guide](https://docs.astro.build/en/guides/styling-css/)

## Support

For template-specific issues:
1. Check `TEMPLATE-README.md` for detailed docs
2. Review component source code for examples
3. Check git history for implementation details

---

**Ready to launch?** Follow these steps:
1. Clone/copy template
2. Run `npm install`
3. Run `npm run dev`
4. Customize content
5. Deploy to Netlify

Happy building! 🚀
