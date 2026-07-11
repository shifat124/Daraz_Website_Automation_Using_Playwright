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
        await this.page.waitForTimeout(3000);
        const homePageObject = new HomePage();
        await homePageObject.loginLink.click();
        await this.page.waitForTimeout(3000);
        await this.userNameField.fill(username);
        await this.page.waitForTimeout(3000);
        await this.userPasswordField.fill(password);
        await this.page.waitForTimeout(3000);
        await this.loginButton.click(); 
            

    }
}
export default LoginPage;