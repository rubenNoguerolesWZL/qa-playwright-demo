import { Locator, Page } from "@playwright/test";

export class InventoryPage{
    readonly page: Page
    readonly itemDescriptions: Locator
    readonly prices: Locator
    readonly addButton: string
    readonly cart: Locator
    readonly name: string
    readonly select: Locator


    constructor(page: Page){
        this.page = page
        this.itemDescriptions = page.locator('.inventory_item_description')
        this.prices = page.locator('.inventory_item_price')
        this.addButton = 'button >> text=Add to cart'
        this.cart = page.locator('.shopping_cart_link')
        this.name = '.inventory_item_name'  
        this.select= page.locator('[data-test="product_sort_container"]') 
    }

    async addTwoCheaperProducts(){
        
        let list =  (await this.prices.allInnerTexts()).map(x => Number(x.replace('$','')))
        let prices = list.sort(function(a, b){return a-b;}).slice(0,2)
        let descriptions = new Array

        for (let i = 0; i < prices.length; i++) {
            let product = this.itemDescriptions.filter({ hasText: `$${prices[i]}` })

            await product.locator(this.addButton).click()
           
            let name =  await product.locator(this.name).innerText()
            
            let desc = {
                title : name,
                price : `$${prices[i]}`
            };
            
            descriptions.push(desc)
          }
        
        console.log(descriptions)
        return descriptions;
    }

    async clickOnCart(){
        await this.cart.click()
    }
    async clickOnOrderByAscPrice(){
        await this.select.selectOption('lohi')
    }

    async checkAscOrder(){
        let list =  (await this.prices.allInnerTexts()).map(x => Number(x.replace('$','')))
        let status = true
        for (let i = 0; i <= (list.length -2) && status; i++) {
            status = list[i] <= list[i+1]
        }
        return status

    }
    

}
