import { test, expect } from '@playwright/test';

test.describe('Auth Flows', () => {
  test('should validate registration form (password mismatch and weak password)', async ({ page }) => {
    await page.goto('/register');

    // Test 1: Username too short
    await page.fill('input[placeholder="Username"]', 'ab');
    await page.fill('input[placeholder="Password"]', 'ValidPass123!');
    await page.fill('input[placeholder="Confirm password"]', 'ValidPass123!');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Username must be at least 3 characters long')).toBeVisible();

    // Test 2: Password too weak
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', '12345');
    await page.fill('input[placeholder="Confirm password"]', '12345');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Password must be at least 8 characters long')).toBeVisible();

    // Test 3: Passwords do not match
    await page.fill('input[placeholder="Password"]', 'StrongPass123!');
    await page.fill('input[placeholder="Confirm password"]', 'DifferentPass123!');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Passwords do not match')).toBeVisible();

    // Test 4: Mock server response for duplicate account (Tài khoản đã tồn tại)
    await page.route('**/register', route => {
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Username already registered' })
      });
    });

    await page.fill('input[placeholder="Confirm password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Username already registered')).toBeVisible();
  });

  test('should validate login form (incorrect credentials or server error)', async ({ page }) => {
    await page.goto('/login');

    // Mock API trả về lỗi sai tài khoản / mật khẩu
    await page.route('**/login', route => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Incorrect username or password' })
      });
    });

    await page.fill('input[placeholder="Username"]', 'wronguser');
    await page.fill('input[placeholder="Password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    // Kiểm tra thông báo sai tài khoản / mật khẩu
    await expect(page.locator('text=Incorrect username or password')).toBeVisible();
  });
});
