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
});