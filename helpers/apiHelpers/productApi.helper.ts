import { productData } from "../../resources/product.data";
import { APIRequestContext, expect } from '@playwright/test';
import { apiHelper } from "./apiHelper";


class ProductApiHelper {

  async POSTProduct(body: productData, request: APIRequestContext) {
    const requestType = `POST product with body: ${JSON.stringify(body)}`
    return await apiHelper.makePostRequest(body, "Product/Create", {
      'accept': ' text/plain'
    }, request
    ).then((r) => {
      expect(r.status()).toEqual(200);
      expect(r.headers()['content-type']).toContain('application/json');
      apiHelper.requestIsDoneConsoleMessage(requestType);
      return r.json()
    })
    .catch((e) => {
      apiHelper.requestErrorConsoleMessage(requestType, e);
    });
  }

  async PUTProduct(body: productData, request: APIRequestContext) {
    const requestType = `PUT product with body: ${JSON.stringify(body)}`
   return await apiHelper.makePutRequest(body, "Product/Update", {
      'accept': ' text/plain'
    }, request
    ).then((r) => {
      expect(r.status()).toEqual(200);
      expect(r.headers()['content-type']).toContain('application/json');
      apiHelper.requestIsDoneConsoleMessage(requestType);
      return r.json()
    })
    .catch((e) => {
      apiHelper.requestErrorConsoleMessage(requestType, e);
    });
  }


  async DELETEProduct(id: number, request: APIRequestContext) {
    const requestType = `DELETE product by id: ${id}`
    return await apiHelper.makeDeleteRequest({ id: id }, "Product/Delete", {
      'accept': '*/*'
    }, request,
    ).then((r) => {
      expect(r.status()).toEqual(200)
      apiHelper.requestIsDoneConsoleMessage(requestType);
      return r.json()
    })
      .catch((e) => {
        apiHelper.requestErrorConsoleMessage(requestType, e);
      });
  }

  async GETProduct(id: number, request: APIRequestContext) {
    const requestType = `GET product by id: ${id}`
    return await apiHelper.makeGetRequest(`Product/GetProductById/${id}`, {
      'accept': ' text/plain'
    },
      request
    ).then((r) => {
      expect(r.status()).toEqual(200);
      apiHelper.requestIsDoneConsoleMessage(requestType);
      return r.json()
    })
      .catch((e) => {
        apiHelper.requestErrorConsoleMessage(requestType, e);
      });
  }

  async GETAllProducts(request: APIRequestContext) {
    const requestType = 'GET all Products'
    return await apiHelper.makeGetRequest(`Product/GetProducts/`, {
      'accept': ' text/plain'
    }, request
    ).then((r) => {
      expect(r.status()).toEqual(200);
      apiHelper.requestIsDoneConsoleMessage(requestType);
      return r.json()
    })
      .catch((e) => {
        apiHelper.requestErrorConsoleMessage(requestType, e);
      });
  }

}
export const { POSTProduct, PUTProduct, DELETEProduct, GETAllProducts, GETProduct} = new ProductApiHelper();