import dotenv from 'dotenv'
import { Form } from './data-interfaces'
dotenv.config()

export const URLS = {
    BASE_URL: 'https://www.saucedemo.com/',
    INVENTORY: 'https://www.saucedemo.com/inventory.html',
    CART: 'https://www.saucedemo.com/cart.html',
    CHECKSTEPONE: 'https://www.saucedemo.com/checkout-step-one.html',
    CHECKSTEPTWO: 'https://www.saucedemo.com/checkout-step-two.html',
    COMPLETE: 'https://www.saucedemo.com/checkout-complete.html'
}
export const CREDENTIALS = {
    STANDARD_USER: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    }
}

export const FORM: Form = {
    firstName: 'firstName',
    lastName: 'lastName',
    postalCode: '00001'
}
