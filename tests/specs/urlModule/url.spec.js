import { test, expect } from '@playwright/test';
import HomePage from '../../../tests/pageObjects/homePage/home.page';
test.describe('URL Navigation', () => {
    test('TC_UN_01 - Validate searching the target URL and open the webpage', async ({ page }) => {
        const homePageObject = new HomePage(page);
        const actual = await homePageObject.navigateToHomePage();
        console.log('actual', actual);
        expect(actual).toBeTruthy();
    });
});