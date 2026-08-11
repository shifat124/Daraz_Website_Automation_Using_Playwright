import TestConfig from '../../../testConfig';
import HomePage from '../../../tests/pageObjects/homePage/home.page';
import LoginData from '../../../tests/data/loginData/login.data.json' assert { type: 'json' };
class LoginPage {
    constructor(page) {
        this.page = page;
        this.userNameField = page.getByRole('textbox', { name: 'Please enter your Phone or Email' });
        this.userPasswordField = page.getByRole('textbox', { name: 'Please enter your password' });
        this.loginButton = page.locator('div.iweb-button-mask');
        this.invalidLoginMessage = page.getByText('Invalid account or password.', { exact: true });
        this.crossIcon = page.locator("//div[contains(@class,'iweb-dialog-container-enter')]//div[contains(@class,'lzd-member-loginsign-popup-close-button')]//div//*[name()='svg']//*[name()='path' and contains(@d,'M28 8 8 28')]");
        this.forgetPasswordLink = page.locator('div').filter({ hasText: 'Forgot password?' }).last();
        this.forgetPasswordPageHeader = page.locator('p').filter({ hasText: 'Forgot your password?' }).last();
        this.unsuccessfullLoginHeaderImage = page.locator('.baxia-dialog-mask');
    }
    async login(username, password) {
        const homePageObject = new HomePage(this.page);
        await homePageObject.loginLink.click();
        await this.userNameField.fill(username);
        await this.userPasswordField.fill(password);
        await this.loginButton.click();
    }
    async verifyValidLogin(username, password) {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        await this.login(username, password);
        const homePageObject = new HomePage(this.page);
        await homePageObject.accountName.waitFor({ state: 'visible' });
        const profile = await homePageObject.accountName.textContent();
        console.log('profile', profile);
        return profile;
    }
    async verifyInvalidLogin(username, password) {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        // const invalidLoginMessageVisible = await this.invalidLoginMessage.isVisible();
        // console.log('invalidLoginMessageVisible', invalidLoginMessageVisible);
        // return invalidLoginMessageVisible;
        await this.login(username, password);
        await this.crossIcon.click();
        const homePageObject = new HomePage(this.page);
        const loginLink = await homePageObject.loginLink.isVisible();
        console.log('loginLink', loginLink);
        return loginLink;
    }
    async verifyForgetPasswordLink() {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        const homePageObject = new HomePage(this.page);
        await homePageObject.loginLink.click();
        const forgetPasswordLinkVisible = await this.forgetPasswordLink.isVisible();
        console.log('forgetPasswordLinkVisible', forgetPasswordLinkVisible);
        await this.forgetPasswordLink.click();
        const forgetPasswordPageHeaderText = await this.forgetPasswordPageHeader.textContent();
        console.log('forgetPasswordPageHeaderText', forgetPasswordPageHeaderText);
        if ((forgetPasswordLinkVisible === true) && (forgetPasswordPageHeaderText === LoginData.forget_password_text)) {
            return true;
        }
        else {
            return false;
        }
    }
    async verifyUserLoginSession(username, password) {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        await this.login(username, password);
        const homePageObject = new HomePage(this.page);
        await homePageObject.accountName.waitFor({ state: 'visible' });
        await this.page.goBack({ waitUntil: 'load' });
        await this.page.goForward({ waitUntil: 'load' });
        await homePageObject.accountName.waitFor({ state: 'visible' });
        const profile = await homePageObject.accountName.textContent();
        console.log('profile', profile);
        return profile;
    }
    async verifyLoginSessionTimeout(username, password) {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        await this.login(username, password);
        const homePageObject = new HomePage(this.page);
        await homePageObject.accountName.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(120000);
        await this.page.reload({ waitUntil: 'load' });
        await homePageObject.accountName.waitFor({ state: 'visible' });
        const profile = await homePageObject.accountName.textContent();
        console.log('profile', profile);
        return profile;
    }
}
export default LoginPage;