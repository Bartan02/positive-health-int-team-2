import { expect, test } from '@playwright/test';
test('sample tesst', async ({ page }) => {
	expect(2+2).toBe(4);
});

// import { expect, test } from '@playwright/test';

// test('index page has expected h1', async ({ page }) => {
// 	await page.goto('/');
// 	expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
// });
