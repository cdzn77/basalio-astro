import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

// HARD ASSERTION: reducedMotion suppression must have applied
const suppressed = await page.evaluate(() => {
  const video = document.querySelector('.hero-bg-video');
  const poster = document.querySelector('.hero-bg-poster');

  if (!video || !poster) {
    return { ok: false, reason: 'video or poster element not found' };
  }

  const videoDisplay = window.getComputedStyle(video).display;
  const videoPaused = video.paused;
  const videoSrc = video.src;
  const posterDisplay = window.getComputedStyle(poster).display;

  // Video must be either display:none, visibility:hidden, or paused (prefers-reduced-motion active)
  const videoSuppressed = videoDisplay === 'none' || video.style.display === 'none';
  const posterVisible = posterDisplay !== 'none';

  return {
    ok: videoSuppressed && posterVisible,
    videoDisplay,
    videoPaused,
    videoSrc: videoSrc ? 'loaded' : 'empty',
    posterDisplay,
    reason: !videoSuppressed ? 'video not suppressed' : !posterVisible ? 'poster not visible' : 'ok'
  };
});

if (!suppressed.ok) {
  console.error('FATAL: reducedMotion suppression NOT applied');
  console.error(`  Video display: ${suppressed.videoDisplay}`);
  console.error(`  Video paused: ${suppressed.videoPaused}`);
  console.error(`  Poster display: ${suppressed.posterDisplay}`);
  console.error(`  Reason: ${suppressed.reason}`);
  console.error('\nCapture FAILED. Suppression must apply before screenshot.');
  await context.close();
  await browser.close();
  process.exit(1);
}

console.log('✓ reducedMotion suppression verified:');
console.log(`  Video: ${suppressed.videoDisplay || 'paused'}`);
console.log(`  Poster: visible`);
console.log('');

const outputPath = process.argv[2] || '/Users/angelomanzanojr/basalio-astro/baseline-hero-section-2026-08-04.png';
await page.screenshot({ path: outputPath, fullPage: false });

console.log(`✓ Baseline captured: ${outputPath}`);
console.log('Config:');
console.log('  1440×900 fixed viewport');
console.log('  fullPage: false');
console.log('  reducedMotion: reduce');
console.log('  Suppression: ASSERTED');

await context.close();
await browser.close();
