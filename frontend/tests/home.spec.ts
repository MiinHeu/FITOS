import { test, expect } from '@playwright/test';

test('has brand name', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('span:has-text("FITOS")').first()).toBeVisible();
});

test('language switcher changes text', async ({ page }) => {
  await page.goto('/');
  // Mặc định là tiếng Anh
  await expect(page.locator('h1').first()).toContainText('Smart Gym & Studio Management');
  
  // Click đổi sang tiếng Việt
  await page.click('#lang-vi');
  
  // Kiểm tra text thay đổi
  await expect(page.locator('h1').first()).toContainText('Quản Lý Gym & Studio Thông Minh');
  
  // Kiểm tra localStorage
  const locale = await page.evaluate(() => localStorage.getItem('locale'));
  expect(locale).toBe('vi');
});
