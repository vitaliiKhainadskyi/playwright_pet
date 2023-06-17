import {test, expect} from '@playwright/test';
import {ProductPage} from "../pages/ProducsPage";
import {loginHelper} from "../helpers/global.setup";
import * as fs from "fs";


test.describe('Product page tests', () => {
  test.beforeEach(async ({page}) => {
    global.PAGE = page;
    await loginHelper.performLogin();
  })

  test('User should be able to add product to cart', async ({page}) => {
    const productPage = new ProductPage(page);
    const productTitle = await productPage.addFirstItemToCard();
    const cartPage = await productPage.navigateToCartPage();
    await expect(cartPage.getCartItemByTitle(productTitle)).toBeVisible();


  })


  test.afterEach( async () => {
    global.PAGE = null;
  })
});
