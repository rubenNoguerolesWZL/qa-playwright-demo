import { Locator, Page } from "@playwright/test";

export class CompletePage{
    readonly page: Page
    readonly image: Locator
 

    constructor(page: Page){
        this.page = page
        this.image = page.locator('img[alt="Pony Express"]') 
    }

}
