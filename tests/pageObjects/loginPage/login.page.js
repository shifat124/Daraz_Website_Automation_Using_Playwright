import TestConfig from '../../../testConfig';
import HomePage from '../../../tests/pageObjects/homePage/home.page';
class LoginPage {
    constructor(page) {
        this.page = page;
        this.userNameField = page.getByRole('textbox', { name: 'Please enter your Phone or Email' });
        this.userPasswordField = page.getByRole('textbox', { name: 'Please enter your password' });
        this.loginButton = page.locator('div.iweb-button-mask');
    }
    async verifyLogin(username, password) {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        const homePageObject = new HomePage(this.page);
        await homePageObject.loginLink.click();
        await this.userNameField.fill(username);
        await this.userPasswordField.fill(password);
        await this.loginButton.click();
        await homePageObject.accountName.waitFor({ state: 'visible' });
        const profile = await homePageObject.accountName.textContent();
        console.log('profile', profile);
        return profile;
    }
}
export default LoginPage;