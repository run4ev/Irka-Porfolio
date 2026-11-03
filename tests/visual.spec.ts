import { test, expect } from '@playwright/test';

const pages = ['/', '/about/', '/projects/', '/projects/pc/', '/sketchbook/'];

for (const path of pages) {
  test(`visual: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' }); // static, deterministic screenshots
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.01 });
  });
}
