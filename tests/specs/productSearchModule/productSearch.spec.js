import { test, expect } from '@playwright/test';
import productSearchPage from "../../../tests/pageObjects/productSearchPage/productSearch.page";
import ProductSearchData from "../../data/productSearchData/productSearch.data.json" assert { type: 'json' };
test.describe('Search Functionality', () => {
    test('TC_SF_001 - Verify that the search box is visible on the homepage', async ({ page }) => {
        const productSearchPageObject = new productSearchPage(page);
        const actual = await productSearchPageObject.searchBoxVisibility();
        console.log("actual", actual);
        expect(actual).toBeTruthy();
    });
    test('TC_SF_002 - Verify that the search button is visible', async ({ page }) => {
        const productSearchPageObject = new productSearchPage(page);
        const actual = await productSearchPageObject.searchButtonVisibility();
        console.log("actual", actual);
        expect(actual).toBeTruthy();
    });
    test.only('TC_SF_003 - Validate searching with an existig product name', async ({ page }) => {
        const productSearchPageObject = new productSearchPage(page);
        const actual = await productSearchPageObject.searchProduct(ProductSearchData.product_name);
        console.log("actual", actual);
        expect(actual).toBeTruthy();
    });
});
