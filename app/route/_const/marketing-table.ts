import "server-only";

import { fakerRU } from "@faker-js/faker";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var dataTableMarketing: any[];
}

export function createRandomMarketing(index: number): any {
  const tags: string[] = [];
  const count = fakerRU.number.int({ min: 1, max: 8 });
  for (let index = 0; index < count; index++) {
    const tag = fakerRU.word.noun();
    if (!!tags.includes(tag)) continue;
    tags.push(tag);
  }

  return {
    id: index,
    avatar: fakerRU.image.avatar(),
    name: fakerRU.internet.username(),
    hashtags: tags,

    likes: fakerRU.number.int({ min: 200, max: 10000000 }),
    comments: fakerRU.number.int({ min: 200, max: 10000000 }),

    text: fakerRU.word.words({ count: { min: 10, max: 40 } }),
  };
}

const generateManyBlogger = () => {
  const array: any[] = [];
  for (let index = 0; index < 100; index++) {
    array.push(createRandomMarketing(index));
  }
  return array;
};

export const dataTableMarketing =
  global.dataTableMarketing || generateManyBlogger();
global.dataTableMarketing = dataTableMarketing;
