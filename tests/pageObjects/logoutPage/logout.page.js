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
        await homePageObject.accountName.click();
        await this.logoutButton.click();
        await homePageObject.loginLink.waitFor({ state: 'visible' });
        const logoutLink = await homePageObject.loginLink.isVisible();
        console.log("logoutLink", logoutLink);
        return logoutLink;
    }
    async verifyAutomaticLogout(username, password, browser) {
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        const testConfigPageObject = new TestConfig();
        await page1.goto(testConfigPageObject.baseUrl);
        const loginPageObject = new LoginPage(page1);
        await loginPageObject.login(username, password);
        const homePageObjectFirstContext = new HomePage(page1);
        await homePageObjectFirstContext.accountName.waitFor({ state: 'visible' });
        const accountNameVisible = await homePageObjectFirstContext.accountName.isVisible();
        console.log("accountNameVisible", accountNameVisible);
        if (accountNameVisible === true) {
            await context1.close();
            const context2 = await browser.newContext();
            const page2 = await context2.newPage();
            const testConfigPageObject = new TestConfig();
            await page2.goto(testConfigPageObject.baseUrl);
            const homePageObjectSecondContext = new HomePage(page2);
            await homePageObjectSecondContext.loginLink.waitFor({ state: 'visible' });
            const loginLinkVisible = await homePageObjectSecondContext.loginLink.isVisible();
            console.log("loginLinkVisible", loginLinkVisible);
            return loginLinkVisible;
        }
    }
}
export default LogoutPage;