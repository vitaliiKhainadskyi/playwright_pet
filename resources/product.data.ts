import { faker } from "@faker-js/faker";
import {dataManipulation} from "./dataManipulation";
import {ProductType} from "./productType";

export interface productData {
  id?: number,
  name?: string,
  description?: string,
  price?: number,
  productType?: string | number
}

export const productData = {
  generateProductData(data?: productData): productData {
    return {
      id: data?.id || dataManipulation.getRandomIntegerNumber(100, 100000),
      name: data?.name || faker.random.alphaNumeric(8),
      description: data?.description || faker.random.alphaNumeric(10),
      price: data?.price || dataManipulation.getRandomIntegerNumber(100, 3000),
      productType: data?.productType || dataManipulation.getRandomIntegerNumber(0, 3),
    };
  },
};
