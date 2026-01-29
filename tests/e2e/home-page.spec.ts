import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/RobloxHub/);
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should have navigation menu', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
  });

  test('should open navigation menu when clicked', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();

    // Should show navigation items
    await expect(page.getByText(/home/i)).toBeVisible();
    await expect(page.getByText(/games/i)).toBeVisible();
  });

  test('should navigate to games section', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();

    const gamesLink = page.getByText(/games/i).first();
    await gamesLink.click();

    await expect(page).toHaveURL(/\/games/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();

    // Open menu
    await menuButton.click();

    // Should show modal overlay
    const backdrop = page.locator('.bg-black\\/60');
    await expect(backdrop).toBeVisible();
  });
});

test.describe('Homepage Performance', () => {
  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');

    expect(errors).toHaveLength(0);
  });
});

test.describe('Homepage SEO', () => {
  test('should have meta description', async ({ page }) => {
    await page.goto('/');

    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription?.length).toBeGreaterThan(0);
  });

  test('should have viewport meta tag', async ({ page }) => {
    await page.goto('/');

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });
});
