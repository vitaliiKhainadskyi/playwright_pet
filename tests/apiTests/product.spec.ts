import { productData } from "../../resources/product.data";
import { POSTProduct, PUTProduct, GETAllProducts, GETProduct, DELETEProduct } from "../../helpers/apiHelpers/productApi.helper";
import { test, expect } from '@playwright/test';
import { beforeEach } from "node:test";


test.describe('Product API tests', () => {

  // test('User should be able to create product via API 1', async ({ request }) => {
  //   const product = productData.generateProductData();
  //   const responseBody = await request.post('Product/Create', { data: product})
  //   console.log(JSON.stringify(responseBody))
  //   expect(await responseBody.json()).toEqual(product)
  //   expect(await responseBody.status()).toEqual(product)
  // })

  test('User should be able to create product via API', async ({ request }) => {
    const product = productData.generateProductData();
    const responseBody = await POSTProduct(product, request);
    expect(responseBody).toEqual(product);
  })

  test('User should be able to edit product via API', async ({ request }) => {
    const product = productData.generateProductData();
    await POSTProduct(product, request)
    let editedProduct = productData.generateProductData()
    editedProduct.id = product.id;
    const responseBody = await PUTProduct(editedProduct, request);
    expect(responseBody).toEqual(editedProduct);
  })

  test('User should be able to get product via API', async ({ request }) => {
    const product = productData.generateProductData();
    await POSTProduct(product, request)
    const responseBody = await GETProduct(<number>product.id, request)
    expect(responseBody).toEqual(product);
  })

  test('User should be able to get all products via API', async ({ request }) => {
    let products = Array<productData>();
    Array.from(Array(5).keys()).forEach(n => {
      products.push(productData.generateProductData());
    })
    for (const product of products) {
      await POSTProduct(product, request)
    }
    const responseBody = await GETAllProducts(request)
    products.forEach(product => {
      expect(responseBody).toContainEqual(product);
    })
  })

  test('User should be able to delete product via API', async ({ request }) => {
    const product = productData.generateProductData();
    await POSTProduct(product, request)
    await DELETEProduct(<number>product.id, request);
  })
})