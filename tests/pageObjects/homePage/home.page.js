import TestConfig from '../../../testConfig';
class HomePage {
    constructor(page) {
        this.page = page;
        this.darazLogo = page.getByRole('img', { name: 'Online Shopping Daraz Logo' });
        this.loginLink = page.getByRole('link', { name: 'Login' });
    }
    async navigateToHomePage() {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        const isDarazLogoVisible = await this.darazLogo.isVisible();
        console.log('isDarazLogoVisible', isDarazLogoVisible);
        return isDarazLogoVisible;
    }
}
export default HomePage;