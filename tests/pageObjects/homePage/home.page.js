import TestConfig from '../../../testConfig';
class HomePage {
    constructor(page) {
        this.page = page;
        this.darazLogo = page.locator("img[alt='Online Shopping Daraz Logo']");
    }
    async navigateToHomePage() {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        const isDarazLogoVisible = await this.darazLogo.isVisible();
        console.log('isDarazLogoVisible', isDarazLogoVisible);
        if (isDarazLogoVisible === true) {
            return true;
        }
        else {
            return false;
        }
    }
}
export default HomePage;