import { Locator, Page } from "@playwright/test";

export class SteptwoPage{
    readonly page: Page
    readonly name: Locator
    readonly price: Locator
    readonly summarySubtotalLabel: Locator
    readonly summaryTaxLabel: Locator
    readonly summaryTotalLabel: Locator
    readonly finishBtn: Locator

    constructor(page: Page){
        this.page = page
        this.name = page.locator('.inventory_item_name')
        this.price = page.locator('.inventory_item_price')  
        this.summarySubtotalLabel = page.locator('.summary_subtotal_label')
        this.summaryTaxLabel = page.locator('.summary_tax_label')  
        this.summaryTotalLabel = page.locator('.summary_total_label')
        this.finishBtn = page.locator('#finish')
    }

    async checkNamesAndPrices(list: any[]){
        let names =  await this.name.allInnerTexts()
        let prices = await this.price.allInnerTexts()

        let status = (prices.length != list.length || names.length != list.length) ? false : true
           
        for (let i = 0; i < list.length && status; i++) {
            status = (prices[i] != list[i].price|| names[i] != list[i].title) ? false : true

        }

        return status
        
    }

    async checkSumarySubtotal(list: any[]){
        let subtotal =  await this.summarySubtotalLabel.innerText()
        
        let sum= this.getSum(list)
         
        return subtotal.includes(`$${sum}`) ? true : false
        
    }

    async checkTotalValue(list: any[]){
        let sum =  Number (this.getSum(list)) + Number((await this.summaryTaxLabel.innerText()).replace('Tax: $',''))
        let totalValue = await this.summaryTotalLabel.innerText()

        return totalValue.includes(`$${sum}`) ? true : false
    }

    async clickOnFinishBtn(){
        await this.finishBtn.click()
    }

    getSum(list:any[]){
        let sum = 0;
        let prices = list.map(x => Number(x.price.replace('$','')))
        prices.forEach(x =>  (sum += x))
        return sum
    }
}
