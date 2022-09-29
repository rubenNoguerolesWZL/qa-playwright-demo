import {test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { URLS, CREDENTIALS, FORM } from '../data/constants'


test.describe('Visual test Demo', () => {

    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        
        await page.goto(URLS.BASE_URL)
    })

    test('The Login page style should look as expected', async ({page}) => {
        //[1/2]if you delete the snapshots under the visual.spec.ts-snapshots folder
        //[2/2]it will create a new snapshot every time you run the script on a new browser
        await expect(page).toHaveScreenshot('test-login.png')
    })

})