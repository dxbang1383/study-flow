import { test, expect } from '@playwright/test';

test.describe('Main User Flows', () => {
  test('should load the landing page and verify key elements', async ({ page }) => {
    // Navigate to the app (Playwright will use the baseURL from config)
    await page.goto('/');

    // Kiểm tra title của app (dựa theo cấu hình mặc định trong index.html)
    await expect(page).toHaveTitle(/Personal Study Management UI/i);

    // Kiểm tra xem trang Landing Page có render không (tìm Heading đặc trưng)
    const landingHeader = page.locator('h1', { hasText: 'Smart Study Management' }).first();
    await expect(landingHeader).toBeVisible();

    // Kiểm tra nút Login/Register hiển thị
    const loginButton = page.locator('a', { hasText: 'Login' }).first();
    const registerButton = page.locator('a', { hasText: 'Register Now' }).first();
    
    await expect(loginButton).toBeVisible();
    await expect(registerButton).toBeVisible();
  });
});
