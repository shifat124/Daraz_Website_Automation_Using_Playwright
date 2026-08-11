import { test, expect } from '@playwright/test';
import LoginPage from '../../../tests/pageObjects/loginPage/login.page';
import LoginData from '../../../tests/data/loginData/login.data.json' assert { type: 'json' };
test.describe('Login Functionality', () => {
    test('TC_LF_001 - Validate login to the application using valid contact & password', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyValidLogin(LoginData.valid_contact, LoginData.valid_password);
        console.log('actual', actual);
        expect(actual).toBe(LoginData.valid_profile_name);
    });
    test('TC_LF_002 - Validate login to the application using valid email & password', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyValidLogin(LoginData.valid_email, LoginData.valid_password);
        console.log('actual', actual);
        expect(actual).toBe(LoginData.valid_profile_name);
    });
    test('TC_LF_003 - Validate login to the application using invalid credentials (Invalid email address and valid password)', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyInvalidLogin(LoginData.invalid_email, LoginData.valid_password);
        console.log('actual', actual);
        expect(actual).toBeTruthy();
    });
    test('TC_LF_004 - Validate login to the application using invalid credentials (valid email address and invalid password)', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyInvalidLogin(LoginData.valid_email, LoginData.invalid_password);
        console.log('actual', actual);
        expect(actual).toBeTruthy();
    });
    test('TC_LF_005 - Validate login to the application using invalid credentials (invalid email address and invalid password))', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyInvalidLogin(LoginData.invalid_email, LoginData.invalid_password);
        console.log('actual', actual);
        expect(actual).toBeTruthy();
    });
    test('TC_LF_006 - Validate login to the application without providing any credentials)', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyInvalidLogin(LoginData.empty_email, LoginData.empty_password);
        console.log('actual', actual);
        expect(actual).toBeTruthy();
    });
    test('TC_LF_007 - Validate "Forgotten Password" link is available in the login page and working properly)', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyForgetPasswordLink();
        console.log('actual', actual);
        expect(actual).toBeTruthy();
    });
    test('TC_LF_008 - Validate that the user is not logged out when using the browser\'s Back and Forward navigation)', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyUserLoginSession(LoginData.valid_email, LoginData.valid_password);
        console.log('actual', actual);
        expect(actual).toBe(LoginData.valid_profile_name);
    });
    test('TC_LF_010 - Validate timeout of the Login Session', async ({ page }) => {
        test.setTimeout(150000);
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyLoginSessionTimeout(LoginData.valid_email, LoginData.valid_password);
        console.log('actual', actual);
        expect(actual).toBe(LoginData.valid_profile_name);
    });
});