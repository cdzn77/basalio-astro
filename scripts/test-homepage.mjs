import { chromium } from 'playwright';

const URL = process.env.URL || 'http://localhost:4321/';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto(URL, { waitUntil: 'networkidle' });

// Give inline scripts a moment to bind
await page.waitForTimeout(500);

const results = await page.evaluate(() => {
  const out = [];

  // --- Grid Reveal replay event ---
  const grRoot = document.querySelector('[data-sample-gr-root]');
  if (grRoot) {
    const grStage = grRoot.querySelector('[data-sample-stage]');
    const grBtn = grStage?.querySelector('[data-sample-replay-trigger]');
    let grFired = false;
    if (grStage && grBtn) {
      grStage.addEventListener('basalio:replay', () => { grFired = true; }, { once: true });
      grBtn.click();
    }
    out.push({ test: 'grid-reveal-event', fired: grFired, hasStage: !!grStage, hasButton: !!grBtn });
  } else {
    out.push({ test: 'grid-reveal-event', error: 'root not found' });
  }

  // --- Text Reveal replay event ---
  const trRoot = document.querySelector('[data-sample-tr-root]');
  if (trRoot) {
    const trStage = trRoot.querySelector('[data-sample-stage]');
    const trBtn = trStage?.querySelector('[data-sample-replay-trigger]');
    let trFired = false;
    if (trStage && trBtn) {
      trStage.addEventListener('basalio:replay', () => { trFired = true; }, { once: true });
      trBtn.click();
    }
    out.push({ test: 'text-reveal-event', fired: trFired, hasStage: !!trStage, hasButton: !!trBtn });
  } else {
    out.push({ test: 'text-reveal-event', error: 'root not found' });
  }

  // --- Filterable Grid: Identity filter ---
  const fgRoot = document.querySelector('[data-sample-fg-root]');
  if (fgRoot) {
    const identityTab = fgRoot.querySelector('[data-sample-fg-tab="Identity"]');
    if (identityTab) identityTab.click();
    const items = Array.from(fgRoot.querySelectorAll('[data-sample-fg-item]'));
    const visible = items.filter(i => !i.classList.contains('is-hidden'));
    const boxes = visible.map(i => i.getBoundingClientRect());
    out.push({
      test: 'filterable-grid-identity',
      totalItems: items.length,
      visibleItems: visible.length,
      expectedVisible: 2,
      leftAligned: boxes.length > 0 ? Math.min(...boxes.map(b => b.left)) : null,
    });
  } else {
    out.push({ test: 'filterable-grid-identity', error: 'root not found' });
  }

  return out;
});

console.log(JSON.stringify(results, null, 2));

await browser.close();
