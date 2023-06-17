import {expect, Locator, Page} from '@playwright/test';


export class CartPage {
  /* Fields */
  readonly page: Page;
  readonly title: Locator;

  getCartItemByTitle(title: string): Locator {
    return this.page.locator(`//*[@class="inventory_item_name" and text()="${title}"]`)
  }

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.getByText('Your Cart');
  }

  /* Methods */



}