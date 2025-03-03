import { test, expect, Page } from '@playwright/test';

async function loginSystem(page: Page) {
  // Arrange
  await page.goto('https://www.saucedemo.com/');

  // Act
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Assert
  expect(await page.locator('[data-test="title"]')).toHaveText('Products');
}

test.describe('Sauce Demo', () => {
  test('Login', async ({ page }) => {
    await loginSystem(page);
  });

  test('Add to cart', async ({ page }) => {

    // Arrange
    await loginSystem(page);

    // Act
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    test.info().annotations.push({
        type: "Message",
        description: "นี่คือข้อความทดสอบ"
    });

    // Assert
    await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
  });
});