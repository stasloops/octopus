import "server-only";

import { IBlogger } from "@/src/pages-src/home/api/http-get-blogger";
import { fakerRU } from "@faker-js/faker";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var dataTableBlogger: IBlogger[];
}

export function createRandomBlogger(index: number): IBlogger {
  return {
    id: index,
    name: fakerRU.internet.username(),
    verification: fakerRU.datatype.boolean({ probability: 0.25 }),
    avatar: fakerRU.image.avatar(),
    firstName: fakerRU.person.firstName(),
    lastName: fakerRU.person.lastName(),

    platform: [`vk`],

    subscribers: fakerRU.number.int({ min: 200, max: 5000 }),
    status: fakerRU.helpers.arrayElement(["open", "close", "archive"]),
    country: fakerRU.location.country(),
    city: fakerRU.location.city(),
  };
}

const generateManyBlogger = () => {
  const array: IBlogger[] = [];
  for (let index = 0; index < 100; index++) {
    array.push(createRandomBlogger(index));
  }
  return array;
};

export const dataTableBlogger =
  global.dataTableBlogger || generateManyBlogger();
global.dataTableBlogger = dataTableBlogger;
