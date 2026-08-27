import TestConfig from "../../../testConfig";
import ProductSearchData from "../../../tests/data/productSearchData/productSearch.data.json" assert { type: 'json' };
class productSearchPage {
    constructor(page) {
        this.page = page;
        this.searchBox = page.getByRole('searchbox', { name: 'Search in Daraz' });
        this.searchButton = page.getByRole('link', { name: 'SEARCH' });
        this.productName = page.getByRole('heading', { name: 'mouse' });
        this.productFoundText = page.getByText(/^\d+ items found for "mouse"$/);
    }
    async searchBoxVisibility() {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        const searchBoxVisible = await this.searchBox.isVisible();
        console.log("Search box is visible", searchBoxVisible);
        return searchBoxVisible;
    }
    async searchButtonVisibility() {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        const searchButton = await this.searchButton.isVisible();
        console.log("Search button is visible", searchButton);
        return searchButton;
    }
    async searchProduct(product) {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        await this.searchBox.fill(product);
        await this.searchButton.click();
        const searchedProductName = await this.productName.textContent();
        console.log("searchedproductName", searchedproductName);
        const foundText = await this.productFoundText.isVisible();
        console.log("foundText", foundText);
        if ((searchedproductName === ProductSearchData.product_name) && (foundText === true)) {
            return true;
        }
        else {
            return false;
        }
    }
}
export default productSearchPage;