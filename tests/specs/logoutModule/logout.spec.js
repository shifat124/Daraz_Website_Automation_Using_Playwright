import { test, expect } from '@playwright/test';
import LogoutPage from "../../../tests/pageObjects/logoutPage/logout.page";
import LoginData from "../../data/loginData/login.data.json" assert { type: 'json' };

test.describe('Logout Functionality', () => {
    test('TC_LG_001 - Validate Logging out by selecting Logout option  from "My Account" dropdown menu', async ({ page }) => {
        const logoutPageObject = new LogoutPage(page);
        const actual = await logoutPageObject.verifyLogout(LoginData.valid_email, LoginData.valid_password);
        console.log("actual", actual);
        expect(actual).toBeTruthy();
    });
    test.only('TC_LG_002 - Validate automatic logout after closing the browser without logging out', async ({ page, browser }) => {
        const logoutPageObject = new LogoutPage(page);
        const actual = await logoutPageObject.verifyAutomaticLogout(LoginData.valid_email, LoginData.valid_password, browser);
        console.log("actual", actual);
        expect(actual).toBeTruthy();
    });
});