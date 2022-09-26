import { Locator, Page } from "@playwright/test";

export class SteponePage{
    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continueBtn: Locator

    constructor(page: Page){
        this.page = page
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')  
        this.postalCode = page.locator('#postal-code')  
        this.continueBtn = page.locator('#continue')
    }

    async fillForm(firstName: string, lastName: string, postalCode: string){

        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.postalCode.fill(postalCode)
    }

    async clickOnContinueBtn(){
        await this.continueBtn.click()
    }

}
