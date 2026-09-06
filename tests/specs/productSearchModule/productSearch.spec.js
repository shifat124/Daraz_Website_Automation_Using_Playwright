import { test, expect } from '@playwright/test';
import ProductSearchPage from '../../../tests/pageObjects/productSearchPage/productSearch.page';
import HomePage from '../../../tests/pageObjects/homePage/home.page';
import ProductSearchData from '../../../tests/data/productSearchData/productSearch.data.json' assert { type: 'json' };
test.describe('Search Functionality', () => {
    test.beforeEach(async ({ page }) => {
        const homePageObject = new HomePage(page);
        await homePageObject.hitUrl();
    });
    test('TC_SF_001 - Verify that the search box is visible on the homepage', async ({ page }) => {
        const productSearchPageObject = new ProductSearchPage(page);
        const actual = await productSearchPageObject.searchBoxVisibility();
        console.log("actual", actual);
        expect(actual).toBeTruthy();
    });
    test('TC_SF_002 - Verify that the search button is visible', async ({ page }) => {
        const productSearchPageObject = new ProductSearchPage(page);
        const actual = await productSearchPageObject.searchButtonVisibility();
        console.log("actual", actual);
        expect(actual).toBeTruthy();
    });
    test('TC_SF_003 - Validate searching with an existig product name', async ({ page }) => {
        const productSearchPageObject = new ProductSearchPage(page);
        const actual = await productSearchPageObject.searchProduct(ProductSearchData.product_name);
        console.log("actual", actual);
        expect(actual).toBeTruthy();
    });
});
