import {test as baseTest} from '@playwright/test';

type userData = { user: string, password: string }

let generateUserData = () => {

  return [{user: 'standard_user', password: 'secret_sauce'}, {user: 'locked_out_user', password: 'secret_sauce'}]
}

const myFixture = baseTest.extend<userData>([{user: 'standard_user', password: 'secret_sauce'}, {user: 'locked_out_user', password: 'secret_sauce'}]);

export const test = myFixture;