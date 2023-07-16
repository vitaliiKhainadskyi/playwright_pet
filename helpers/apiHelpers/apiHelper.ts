import { APIRequestContext, test } from '@playwright/test';

class ApiHelper {
  async makePostRequest(body: any, url: string, headers: any, request: APIRequestContext) {
    console.log(
      '\x1b[94m%s\x1b[0m',
      `POST request by URL: ${url} with headers: ${JSON.stringify(headers)} and body:${JSON.stringify(body)}`,
    );
    return await request.post(url, {
      failOnStatusCode: false,
      headers: headers,
      data: body,
    });
  }

  async makePutRequest(body: any, url: string, headers: any, request: APIRequestContext) {
    console.log(
      '\x1b[94m%s\x1b[0m',
      `PUT request by URL: ${url} with headers: ${JSON.stringify(headers)} and body:${JSON.stringify(body)}`,
    );
    return await request.put(url, {
      failOnStatusCode: false,
      headers: headers,
      data: body,
    });
  }

  async makeDeleteRequest(params: any, url: string, headers: any, request: APIRequestContext) {
    console.log(
      '\x1b[94m%s\x1b[0m',
      `DELETE request by URL: ${url} with headers: ${JSON.stringify(headers)} and params:${JSON.stringify(params)}`,
    );
    return await request.delete(url, {
      headers: headers,
      params: params,
    });
  }

  async makeGetRequest(url: string, headers: any, request: APIRequestContext) {
    console.log('\x1b[94m%s\x1b[0m', `GET request by URL: ${url} with headers: ${JSON.stringify(headers)}`);
    return await request.get(url, {
      headers: headers,
    });
  }

  requestInProgressConsoleMessage(request: string) {
    console.log('\x1b[94m%s\x1b[0m', `"${request}" request - In progress....`);
  }
  requestIsDoneConsoleMessage(request: string) {
    console.log('\x1b[92m%s\x1b[0m', `"${request}" request - Done.`);
  }
  requestErrorConsoleMessage(request: string, error: any) {
    console.log('\x1b[91m%s\x1b[0m', `"${request}" request error - ${error}`);
  }
}

export const apiHelper = new ApiHelper();
