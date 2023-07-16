import {test} from '../tests/baseTest.loggedin.spec';
import {ProductPage} from "../pages/ProducsPage";
import {loginHelper} from "../helpers/global.setup";
import * as fs from "fs";


test('Fixture test', async ({page, user}) => {
  global.PAGE = page;
  await loginHelper.performLoginViaCreds(user, "123");
})
