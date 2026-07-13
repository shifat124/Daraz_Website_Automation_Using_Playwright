import { test, expect } from '@playwright/test';
import LoginPage from '../../../tests/pageObjects/loginPage/login.page';
import LoginData from '../../../tests/data/loginData/login.data.json' assert { type: 'json' };
test.describe('Login Functionality', () => {
    test('TC_LF_001 - Validate login to the application using valid credentials', async ({ page }) => {
        const loginPageObject = new LoginPage(page);
        const actual = await loginPageObject.verifyLogin(LoginData.valid_user_name, LoginData.valid_user_password);
        console.log('actual', actual);
        expect(actual).toBe(LoginData.valid_profile_name);
    });
});