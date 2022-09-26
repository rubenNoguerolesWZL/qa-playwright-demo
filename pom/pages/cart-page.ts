import { Locator, Page } from "@playwright/test";

export class CartPage{
    readonly page: Page
    readonly prices: Locator
    readonly name: Locator
    readonly checkoutBtn: Locator

    constructor(page: Page){
        this.page = page
        this.prices = page.locator('.inventory_item_price')
        this.name = page.locator('.inventory_item_name')  
        this.checkoutBtn = page.locator('#checkout')  
    }

    async checkItemList(list: any[]){
        let prices =  await this.prices.allInnerTexts()
        let names = await this.name.allInnerTexts()
        let status = (prices.length != list.length || names.length != list.length) ? false : true
           
        for (let i = 0; i < list.length && status; i++) {
            status = (prices[i] != list[i].price|| names[i] != list[i].title) ? false : true

        }

        return status
    }

    async clickOnCheckoutBtn(){
        await this.checkoutBtn.click()
    }

}
