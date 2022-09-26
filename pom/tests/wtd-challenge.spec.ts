import {test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { InventoryPage } from '../pages/inventory-page'
import { CartPage } from '../pages/cart-page'
import { SteponePage } from '../pages/stepone-page'
import { SteptwoPage } from '../pages/steptwo-page'
import { CompletePage } from '../pages/complete-page'
import { URLS, CREDENTIALS, FORM } from '../data/constants'


test.describe('Wtd Challenge Demo', () => {

    let loginPage: LoginPage
    let inventoryPage: InventoryPage
    let cartPage: CartPage
    let steponePage: SteponePage
    let steptwoPage: SteptwoPage
    let completePage: CompletePage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        inventoryPage = new InventoryPage(page)
        cartPage = new CartPage(page)
        steponePage = new SteponePage(page)
        steptwoPage = new SteptwoPage(page)
        completePage = new CompletePage(page)

        await page.goto(URLS.BASE_URL)
    })

    test('As a standard user I should be able to log in', async ({page}) => {
        await loginPage.submitLoginForm(CREDENTIALS.STANDARD_USER.username as string, CREDENTIALS.STANDARD_USER.password as string)
        await expect(page).toHaveURL(URLS.INVENTORY)
    })

    test('As a fake user I should not be able to log in', async ({page}) => {
        await loginPage.submitLoginForm('', '')
        await expect(loginPage.error).toBeVisible()
    })

    test('As a standard user I should be able to order the products by ascending price', async ({page}) => {
        await loginPage.submitLoginForm(CREDENTIALS.STANDARD_USER.username as string, CREDENTIALS.STANDARD_USER.password as string)
        await expect(page).toHaveURL(URLS.INVENTORY)

        await inventoryPage.clickOnOrderByAscPrice();

        expect(await inventoryPage.checkAscOrder()).toBe(true)
    })
   
    test('As a standard user I should be able to add the two cheaper products to the cart without filter', async ({page}) => {
        await loginPage.submitLoginForm(CREDENTIALS.STANDARD_USER.username as string, CREDENTIALS.STANDARD_USER.password as string)
        await expect(page).toHaveURL(URLS.INVENTORY)
        
        let list = await inventoryPage.addTwoCheaperProducts()

        await inventoryPage.clickOnCart()
        
        await expect(page).toHaveURL(URLS.CART)

        expect(await cartPage.checkItemList(list)).toBe(true)

    })

    test('As a standard user I should be able to finish a purchase', async ({page}) => {
        await loginPage.submitLoginForm(CREDENTIALS.STANDARD_USER.username as string, CREDENTIALS.STANDARD_USER.password as string)
        await expect(page).toHaveURL(URLS.INVENTORY)
        
        let list = await inventoryPage.addTwoCheaperProducts()

        await inventoryPage.clickOnCart()
        await expect(page).toHaveURL(URLS.CART)

        expect(await cartPage.checkItemList(list)).toBe(true)

        await cartPage.clickOnCheckoutBtn()

        await expect(page).toHaveURL(URLS.CHECKSTEPONE)

        await steponePage.fillForm(FORM.firstName, FORM.lastName, FORM.postalCode)

        await steponePage.clickOnContinueBtn()

        await expect(page).toHaveURL(URLS.CHECKSTEPTWO)

        expect(await steptwoPage.checkNamesAndPrices(list)).toBe(true)

        expect(await steptwoPage.checkSumarySubtotal(list)).toBe(true)

        expect(await steptwoPage.checkTotalValue(list)).toBe(true)

        await steptwoPage.clickOnFinishBtn()

        await expect(page).toHaveURL(URLS.COMPLETE)

        await expect(completePage.image).toBeVisible()
        

    })
    
})