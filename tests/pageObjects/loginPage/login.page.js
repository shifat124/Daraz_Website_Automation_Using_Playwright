import TestConfig from '../../../testConfig';
import HomePage from '../../../tests/pageObjects/homePage/home.page';
class LoginPage {
    constructor(page) {
        this.page = page;
        this.userNameField = page.getByRole('textbox', { name: 'Please enter your Phone or Email' });
        this.userPasswordField = page.getByRole('textbox', { name: 'Please enter your password' });
        this.loginButton = page.locator('div.iweb-button-mask');
        this.invalidLoginMessage = page.getByText('Invalid account or password.', { exact: true });
        this.crossIcon = page.locator("//div[contains(@class,'iweb-dialog-container-enter')]//div[contains(@class,'lzd-member-loginsign-popup-close-button')]//div//*[name()='svg']//*[name()='path' and contains(@d,'M28 8 8 28')]");
    }
    async verifyValidLogin(username, password) {
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
    async verifyInvalidLogin(username, password) {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        const homePageObject = new HomePage(this.page);
        await homePageObject.loginLink.click();
        await this.userNameField.fill(username);
        await this.userPasswordField.fill(password);
        await this.loginButton.click();
        // const invalidLoginMessageVisible = await this.invalidLoginMessage.isVisible();
        // console.log('invalidLoginMessageVisible', invalidLoginMessageVisible);
        // return invalidLoginMessageVisible;
        await this.crossIcon.click();
        const loginLink = await homePageObject.loginLink.isVisible();
        console.log('loginLink', loginLink);
        return loginLink;
    }
}
export default LoginPage;










