import TestConfig from '../../../testConfig';
class HomePage {
    constructor(page) {
        this.page = page;
        this.darazLogo = page.getByRole('img', { name: 'Online Shopping Daraz Logo' });
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.accountName = page.locator('#myAccountTrigger');
    }
    async hitUrl() {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
    }
    async navigateToHomePage() {
        const isDarazLogoVisible = await this.darazLogo.isVisible();
        console.log('isDarazLogoVisible', isDarazLogoVisible);
        return isDarazLogoVisible;
    }
}
export default HomePage;