import { test, expect } from '@playwright/test';

test('calendar is visible page', async ({ page }) => {
  await page.goto('/');
  const calendar = await page.getByTestId('calendar');
  await expect(calendar).toBeVisible();
});

test('calendar header is visible', async ({ page }) => {
  await page.goto('/');
  const header = await page.getByTestId('calendar-header');
  await expect(header).toBeVisible();
});

test('calendar navigation is visible', async ({ page }) => {
  await page.goto('/');
  const nav = await page.getByTestId('calendar-nav');
  await expect(nav).toBeVisible();
});

test('dialog opens when clicking a calendar cell', async ({ page }) => {
  await page.goto('/');
  
  const cell = await page.getByTestId('calendar-day-cell').first();
  await cell.click();

  const dialog = await page.getByRole('dialog');
  await expect(dialog).toBeVisible();
});

test('navigation next week button works', async ({ page }) => {
  await page.goto('/');
  
  //week display in nav
  const nav = await page.getByTestId('calendar-nav');
  const weekDisplay = await nav.locator('strong');
  const initialWeek = await weekDisplay.textContent();
  
  //day in header
  const headerDayDisplay = await page.getByTestId('calendar-header-day').first();
  const initialDay = await headerDayDisplay.textContent();

  const nextButton = await page.getByRole('button', { name: '>' });
  await nextButton.click();
  
  const newWeek = await weekDisplay.textContent();
  const newDay = await headerDayDisplay.textContent();
  
  expect(newWeek).not.toBe(initialWeek);
  expect(newDay).not.toBe(initialDay);
});

test('navigation previous week button works', async ({ page }) => {
  await page.goto('/');
  
  //week display in nav
  const nav = await page.getByTestId('calendar-nav');
  const weekDisplay = await nav.locator('strong');
  const initialWeek = await weekDisplay.textContent();
  
  //day in header
  const headerDayDisplay = await page.getByTestId('calendar-header-day').first();
  const initialDay = await headerDayDisplay.textContent();

  const prevButton = await page.getByRole('button', { name: '<' });
  await prevButton.click();
  
  const newWeek = await weekDisplay.textContent();
  const newDay = await headerDayDisplay.textContent();
  
  expect(newWeek).not.toBe(initialWeek);
  expect(newDay).not.toBe(initialDay);
});

test('navigation current week button resets to current week', async ({ page }) => {
  await page.goto('/');
  
  //week display in nav
  const nav = await page.getByTestId('calendar-nav');
  const weekDisplay = await nav.locator('strong');
  const currentWeek = await weekDisplay.textContent();
  
  //day in header
  const headerDayDisplay = await page.getByTestId('calendar-header-day').first();
  const initialDay = await headerDayDisplay.textContent();

  const nextButton = await page.getByRole('button', { name: '>' });
  await nextButton.click();
  
  const currentWeekButton = await page.getByRole('button', { name: 'Current Week' });
  await currentWeekButton.click();
  
  const resetWeek = await weekDisplay.textContent();
  const resetDay = await headerDayDisplay.textContent();
  
  expect(resetWeek).toBe(currentWeek);
  expect(resetDay).toBe(initialDay);
});

test('page loads without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  
  await page.goto('/');
  expect(errors).toHaveLength(0);
});