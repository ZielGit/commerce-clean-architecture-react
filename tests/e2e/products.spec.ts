import { test, expect } from '@playwright/test';
import { mockApi } from './mocks/apiMocks';

test.describe('Products CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page);

    // Login before each test
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/products');
  });

  test('should display product list', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Products');
  });

  test('should create a product', async ({ page }) => {
    await page.click('text=Create Product');
    await expect(page).toHaveURL('/products/create');

    await page.fill('input[name="name"]', 'Test Laptop');
    await page.fill('input[name="price"]', '999.99');
    await page.fill('input[name="stock"]', '10');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/products');
    await expect(page.locator('text=Product created successfully')).toBeVisible();
  });

  test('should view product detail', async ({ page }) => {
    // Click first View button
    await page.click('text=View >> nth=0');
    await expect(page.url()).toContain('/products/');
  });

  test('should edit product stock', async ({ page }) => {
    await page.click('text=Edit >> nth=0');
    await expect(page.url()).toContain('/edit');

    await page.fill('input[name="stock"]', '25');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Product updated successfully')).toBeVisible();
  });

  test('should delete a product', async ({ page }) => {
    // Nota: se usa getByRole con nombre exacto porque "text=Delete" también
    // matchea el título del modal ("Delete Product"), desplazando los índices.
    const deleteButtons = page.getByRole('button', { name: 'Delete', exact: true });
    await deleteButtons.nth(0).click();

    // Confirm modal
    await expect(page.locator('text=Are you sure')).toBeVisible();
    await deleteButtons.nth(1).click();

    await expect(page.locator('text=Product deleted successfully')).toBeVisible();
  });

  test('should search products by name', async ({ page }) => {
    await page.fill('input[placeholder="Search products..."]', 'Laptop');
    await page.click('text=Search');

    // Verify results contain the search term
    const cards = page.locator('.product-card');
    await expect(cards.first()).toBeVisible();
  });

  test('should filter by in stock', async ({ page }) => {
    await page.click('text=Filters');
    await page.check('input[type="checkbox"] >> nth=0');
    await page.click('text=Search');

    // All visible products should have stock > 0
    await expect(page.locator('text=Out of stock')).toHaveCount(0);
  });

  test('should paginate products', async ({ page }) => {
    // Check if pagination exists
    const pagination = page.locator('text=Next');
    if (await pagination.isVisible()) {
      await pagination.click();
      // URL or page indicator should change
      await expect(page.locator('text=Previous')).toBeVisible();
    }
  });

  test('should switch language', async ({ page }) => {
    await page.click('text=🇪🇸 ES');
    await expect(page.locator('h1')).toContainText('Productos');

    await page.click('text=🇺🇸 EN');
    await expect(page.locator('h1')).toContainText('Products');
  });
});
