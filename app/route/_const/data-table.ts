import "server-only";

import { fakerRU } from "@faker-js/faker";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var dataTableBlogger: any[];
}

export function createRandomBlogger(index: number): any {
  return {
    id: index,
    name: fakerRU.internet.username(),
    verification: fakerRU.datatype.boolean({ probability: 0.25 }),
    avatar: fakerRU.image.avatar(),
    firstName: fakerRU.person.firstName(),
    lastName: fakerRU.person.lastName(),

    platform: [`vk`],

    subscribers: fakerRU.number.int({ min: 200, max: 10000000 }),
    status: fakerRU.helpers.arrayElement(["open", "close", "archive"]),
    country: fakerRU.location.country(),
    city: fakerRU.location.city(),
    er: fakerRU.number.float({ min: 0.1, max: 1.9 }),
  };
}

const generateManyBlogger = () => {
  const array: any[] = [];
  for (let index = 0; index < 100; index++) {
    array.push(createRandomBlogger(index));
  }
  return array;
};

export const dataTableBlogger =
  global.dataTableBlogger || generateManyBlogger();
global.dataTableBlogger = dataTableBlogger;
