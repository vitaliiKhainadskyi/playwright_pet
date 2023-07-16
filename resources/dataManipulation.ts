import { faker } from "@faker-js/faker";

export const dataManipulation = {
  generateUniqueValue(length = 5) {
    return faker.random.alphaNumeric(length);
  },

  getRandomDecimalNumber(min: number, max: number): number {
    return +(Math.random() * (max - min + 1) + min).toFixed(4);
  },

  getRandomIntegerNumber(min: number, max: number): number {
    return +Math.floor(Math.random() * (max - min + 1) + min);
  },

  updateObjWithUniqueValue(data: any) {
    for (const key in data) {
      if (typeof data[key] === 'string') {
        if (key.includes('date')) {
          data[key] = this.getCustomDate(data[key]);
        } else {
          data[key] = this.updateStrWithUniqueValue(data[key]);
        }
      }
    }
    return data;
  },

  updateStrWithUniqueValue(text: string) {
    if (text.match(/(\(uq\))/g)) {
      // @ts-ignore
      text = text.replace(/(\(uq\))/g, global.uniqueValue);
    } else if (text.match(/unique/g)) {
      text = text.replace(/unique/g, faker.random.alphaNumeric(8));
    } else if (text.includes('spacebar')) {
      text = ' ';
    } else if (text.includes('256_characters')) {
      text = faker.lorem.words(100);
    } else if (text === 'empty' || text === '') {
      text = '';
    }
    return text;
  },

  parseDate(date: string): any {
    const dateArr = date.split(' ');
    return {
      month: dateArr[1],
      year: dateArr[2],
      day: dateArr[0],
    };
  },

  parseRGB(rgb: string): any {
    const rgbStringArray = rgb.match(/\d+/g);
    if (rgbStringArray) {
      const rgbNumbers = rgbStringArray.map((elem) => +elem);
      return {
        red: rgbNumbers[0],
        green: rgbNumbers[1],
        blue: rgbNumbers[2],
      };
    }
  },

  setObjectValueToUndefined(object: Record<string, any>, setToUndefined: string[]) {
    for (const [keyObj, valueObj] of Object.entries(object)) {
      for (const [key, value] of Object.entries(valueObj)) {
        for (const elem of setToUndefined) {
          if (elem === keyObj) {
            object[keyObj][key] = undefined;
          }
          if (elem === key) {
            object[keyObj][key] = undefined;
          }
        }
      }
    }
  },

  includeThisKeys(object: Record<string, any>, includeThis: string[]) {
    let allKeys = [];
    for (const [keyObj, valueObj] of Object.entries(object)) {
      for (const [key, value] of Object.entries(valueObj)) {
        allKeys.push(key);
      }
    }
    allKeys = allKeys.filter((val) => !includeThis?.includes(val));
    for (const [keyObj, valueObj] of Object.entries(object)) {
      for (const [key, value] of Object.entries(valueObj)) {
        allKeys.forEach((elem) => {
          if (valueObj[elem] !== undefined) {
            delete object[keyObj][elem];
          }
        });
      }
    }
  },

  setObjectValueToNull(object: Record<string, any>, setToUndefined: string[]) {
    for (const [key, value] of Object.entries(object)) {
      for (const elem of setToUndefined) {
        if (elem === key) {
          object[elem] = null;
        }
      }
    }
  },

  includeThisKeysSimpleObj(object: Record<string, any>, includeThis: string[]) {
    let allKeys = [];
    for (const [key, value] of Object.entries(object)) {
      allKeys.push(key);
    }
    allKeys = allKeys.filter((val) => !includeThis?.includes(val));
    allKeys.forEach((elem) => {
      if (object[elem] !== undefined) {
        delete object[elem];
      }
    });
  },

  countPercentage(total: any, percent: any) {
    return +((percent / 100) * total).toFixed(2) * 100;
  },
  getCustomDate(datum: any) {
    
  }
};
