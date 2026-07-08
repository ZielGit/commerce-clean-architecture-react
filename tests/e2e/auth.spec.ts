import { test, expect } from '@playwright/test';
import { mockApi } from './mocks/apiMocks';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page);
  });

  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveURL('/login');
  });

  test('should login successfully', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/products');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Login failed')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/products');

    // Logout
    await page.click('text=Sign Out');
    await expect(page).toHaveURL('/login');
  });
});
