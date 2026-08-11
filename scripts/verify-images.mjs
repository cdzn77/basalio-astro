import { chromium } from 'playwright';
import { ALL_ROUTES, NOT_FOUND_PROBE } from './routes.js';

const PORT = process.env.PORT || 4321;
const ROUTES = ALL_ROUTES;

async function verifyImages(browser, route) {
  const page = await browser.newPage();

  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle'
    });

    if (route === NOT_FOUND_PROBE) {
      const status = response.status();
      if (status !== 404) {
        throw new Error(
          `404 handler probe returned HTTP ${status}, expected 404.`
        );
      }
    }

    const results = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img')).map(
        (img, idx) => ({
          type: 'img',
          index: idx,
          src: img.src || img.getAttribute('src') || '(no src)',
          naturalWidth: img.naturalWidth,
          pass: img.naturalWidth > 0
        })
      );

      const videos = Array.from(document.querySelectorAll('video')).map(
        (vid, idx) => ({
          type: 'video',
          index: idx,
          src: vid.src || vid.firstChild?.src || '(no src)',
          videoWidth: vid.videoWidth,
          pass: vid.videoWidth > 0
        })
      );

      return { images, videos };
    });

    return {
      route,
      images: results.images,
      videos: results.videos,
      passCount: [
        ...results.images.filter(i => i.pass),
        ...results.videos.filter(v => v.pass)
      ].length,
      failCount: [
        ...results.images.filter(i => !i.pass),
        ...results.videos.filter(v => !v.pass)
      ].length
    };
  } catch (error) {
    return {
      route,
      error: error.message
    };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  let totalFailures = 0;

  console.log('\n' + '═'.repeat(70));
  console.log('IMAGE/VIDEO LOADING VERIFICATION (naturalWidth > 0)');
  console.log('═'.repeat(70) + '\n');

  for (const route of ROUTES) {
    const result = await verifyImages(browser, route);
    results.push(result);

    if (result.error) {
      totalFailures++;
      const label = route === NOT_FOUND_PROBE ? '404 handler' : route;
      console.log(`❌ ${label.padEnd(15)}: ERROR: ${result.error}`);
    } else {
      const label = route === NOT_FOUND_PROBE ? '404 handler' : route;
      const status = result.failCount === 0 ? '✅' : `❌ (${result.failCount} broken)`;
      console.log(`${status} ${label.padEnd(15)}: ${result.passCount} loaded, ${result.failCount} missing/broken`);

      if (result.failCount > 0) {
        totalFailures += result.failCount;
        [...result.images.filter(i => !i.pass), ...result.videos.filter(v => !v.pass)].forEach(item => {
          console.log(`     └─ ${item.type}[${item.index}]: ${item.src}`);
        });
      }
    }
  }

  await browser.close();

  console.log('\n' + '═'.repeat(70));
  console.log(`Total: ${ROUTES.length} routes, ${totalFailures} broken`);
  console.log('═'.repeat(70) + '\n');

  process.exit(totalFailures > 0 ? 1 : 0);
}

main();
