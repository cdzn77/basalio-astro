import { test, expect } from '@playwright/test';

const pages = [
  { name: 'contact', url: '/contact' },
  { name: 'modules', url: '/modules' },
  { name: 'pricing', url: '/pricing' },
  { name: 'resources', url: '/resources' },
  { name: 'index-ramp-rebuild', url: '/index-ramp-rebuild' },
];

test.describe('Visual Regression - Phase 2 Pages', () => {
  pages.forEach(({ name, url }) => {
    test(`${name} should match baseline`, async ({ page }) => {
      await page.goto(`http://localhost:4322${url}`);
      await page.waitForLoadState('networkidle');
      
      // Use full-page screenshot with threshold
      await expect(page).toHaveScreenshot(`${name}-1440px.png`, {
        maxDiffPixels: 0,
        threshold: 0.0,
      });
    });
  });
});
