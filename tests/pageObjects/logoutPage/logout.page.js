import LoginPage from "../../../tests/pageObjects/loginPage/login.page";
import HomePage from "../../../tests/pageObjects/homePage/home.page";
import TestConfig from "../../../testConfig";
class LogoutPage {
    constructor(page) {
        this.page = page;
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
    }
    async verifyLogout(username, password) {
        const testConfigPageObject = new TestConfig();
        await this.page.goto(testConfigPageObject.baseUrl);
        const loginPageObject = new LoginPage(this.page);
        await loginPageObject.login(username, password);
        const homePageObject = new HomePage(this.page);
        //await homePageObject.accountName.waitFor({ state: 'visible' });
        await homePageObject.accountName.click();
        await this.logoutButton.click();
        const logoutLink = await homePageObject.loginLink.isVisible();
        console.log("logoutLink", logoutLink);
        return logoutLink;
    }
}
export default LogoutPage;