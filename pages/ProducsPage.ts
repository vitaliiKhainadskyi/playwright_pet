import {expect, Locator, Page} from '@playwright/test';
import {CartPage} from "./CartPage";

export class ProductPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly firstProduct: Locator;
  readonly firstProductTitle: Locator;
  readonly firstItemButton: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = this.page.locator('.title');
    this.firstProduct = this.page.locator('(//div[@class="inventory_item"])[1]');
    this.firstProductTitle = this.firstProduct.locator('.inventory_item_name');
    this.firstItemButton = this.firstProduct.locator('.btn');
    this.shoppingCartLink = this.page.locator('.shopping_cart_link');
  }

  /* Methods */

  async addFirstItemToCard(): Promise<string> {
    const firstItemName = await this.firstProductTitle.textContent();
    await this.firstItemButton.click();
    await expect(this.firstItemButton).toHaveText('Remove');
    await expect(this.shoppingCartLink).toHaveText('1');
    return firstItemName;
  }

  async navigateToCartPage() {
    await this.shoppingCartLink.click();
    const cartPage = new CartPage(this.page);
    await expect(cartPage.title).toBeVisible()
    return cartPage;
  }

}