import {expect, Page} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage'
import {ProductPage} from "../pages/ProducsPage";

class LoginHelper {
  async performLogin() {
    const loginPage = new LoginPage(global.PAGE);
    await loginPage.goto()
    await loginPage.fillUsernameField(process.env.USERNAME)
    await loginPage.fillPasswordField(process.env.PASSWORD)
    await loginPage.clickOnLogin()

    // Wait until the page actually signs in.
    const productPage = new ProductPage(global.PAGE);
    await expect(productPage.productsTitle).toBeVisible();
  }

  async performLoginViaCreds(username: string, password: string) {
    const loginPage = new LoginPage(global.PAGE);
    await loginPage.goto()
    await loginPage.fillUsernameField(username)
    await loginPage.fillPasswordField(password)
    await loginPage.clickOnLogin()

    // Wait until the page actually signs in.
    const productPage = new ProductPage(global.PAGE);
    await expect(productPage.productsTitle).toBeVisible();
  }
}

export const loginHelper = new LoginHelper();