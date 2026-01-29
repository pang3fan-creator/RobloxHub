import { test, expect } from '@playwright/test';

test.describe('Game Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a game page
    await page.goto('/en/games/scary-shawarma-kiosk');
  });

  test('should load game page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Scary Shawarma Kiosk/i);
  });

  test('should display game title', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Shawarma/i);
  });

  test('should display quick reference table', async ({ page }) => {
    // Look for quick reference section
    const quickRef = page.locator('text=/quick reference|anomalies|endings/i').first();
    await expect(quickRef).toBeVisible();
  });

  test('should display anomaly slider if present', async ({ page }) => {
    // Check if there's an anomaly slider component
    const slider = page.locator('.anomaly-slider-wrapper').first();

    const isVisible = await slider.isVisible().catch(() => false);

    if (isVisible) {
      await expect(slider).toBeVisible();

      // Test dragging the slider
      const sliderContainer = slider.locator('.relative.overflow-hidden').first();
      await sliderContainer.click({ position: { x: 100, y: 150 } });
    }
  });

  test('should display game content', async ({ page }) => {
    // Look for MDX content
    const content = page.locator('article, .prose, main').first();
    await expect(content).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();

    // Should show navigation
    await expect(page.getByText(/home/i)).toBeVisible();
  });
});

test.describe('Game Page Interactions', () => {
  test('should toggle found checkboxes', async ({ page }) => {
    await page.goto('/en/games/scary-shawarma-kiosk');

    // Find checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');

    const count = await checkboxes.count();

    if (count > 0) {
      // Click first checkbox
      await checkboxes.first().click();

      // Check if localStorage is updated
      const foundState = await page.evaluate(() => {
        const keys = Object.keys(localStorage).filter(key => key.includes('anomaly-found'));
        return keys.length > 0;
      });

      expect(foundState).toBe(true);
    }
  });

  test('should expand/collapse details cards', async ({ page }) => {
    await page.goto('/en/games/scary-shawarma-kiosk');

    // Look for "Show Details" buttons
    const showDetailsButtons = page.getByText(/show details/i);

    const count = await showDetailsButtons.count();

    if (count > 0) {
      await showDetailsButtons.first().click();

      // Should show expanded content
      await expect(page.getByText(/hide details/i).first()).toBeVisible();
    }
  });

  test('should display risk level badges', async ({ page }) => {
    await page.goto('/en/games/scary-shawarma-kiosk');

    // Look for risk level indicators
    const riskBadges = page.locator('text=/low risk|medium risk|high risk|extreme/i');

    const count = await riskBadges.count();

    if (count > 0) {
      await expect(riskBadges.first()).toBeVisible();
    }
  });
});

test.describe('Game Page Navigation', () => {
  test('should have breadcrumb or back navigation', async ({ page }) => {
    await page.goto('/en/games/scary-shawarma-kiosk');

    // Check for any navigation elements
    const navLinks = page.locator('a[href*="/"], button').all();

    // Should have at least some navigation
    expect((await navLinks).length).toBeGreaterThan(0);
  });

  test('should scroll smoothly to anchor links', async ({ page }) => {
    await page.goto('/en/games/scary-shawarma-kiosk');

    // Look for anchor links
    const anchorLinks = page.locator('a[href^="#"]');

    const count = await anchorLinks.count();

    if (count > 0) {
      await anchorLinks.first().click();

      // Should scroll (scroll position should change)
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(0);
    }
  });
});

test.describe('Game Page Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/en/games/scary-shawarma-kiosk');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const h2s = page.locator('h2');
    const h2Count = await h2s.count();

    // Should have some h2s for content organization
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/en/games/scary-shawarma-kiosk');

    const images = page.locator('img');

    const count = await images.count();

    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/en/games/scary-shawarma-kiosk');

    // Test Tab navigation
    await page.keyboard.press('Tab');

    // Something should be focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT']).toContain(focusedElement);
  });
});

test.describe('Game Page Responsive Design', () => {
  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/games/scary-shawarma-kiosk');

    // Content should be visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should work on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/en/games/scary-shawarma-kiosk');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should work on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/en/games/scary-shawarma-kiosk');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});
