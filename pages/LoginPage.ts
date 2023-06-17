import {expect, Locator, Page} from '@playwright/test';


export class LoginPage {
  /* Fields */
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly logInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = this.page.locator('#user-name');
    this.passwordField = this.page.locator('#password');
    this.logInButton = this.page.locator('#login-button');
  }

  /* Methods */

  async goto() {
    await this.page.goto("/");
    return this;
  }

  async fillUsernameField(name: string) {
    await this.usernameField.fill(name);
    return this;
  }

  async fillPasswordField(pass: string) {
    await this.passwordField.fill(pass);
    return this;
  }

  async clickOnLogin() {
    await this.logInButton.click();
    return this;
  }
}