import { z } from "zod";

export interface IFormFilter {
  advertisers: string;
  hashtags: string;
  url: string;
  data_lte: string;
  data_gte: string;
}

export const defaultFormFilter: IFormFilter = {
  advertisers: ``,
  hashtags: ``,
  url: ``,
  data_lte: ``,
  data_gte: ``,
};

export const FormFilterSchema = z
  .object({
    advertisers: z.string().max(5000, {
      message: `Длина не более 5000 символов`,
    }),
    hashtags: z.string().max(5000, {
      message: `Длина не более 5000 символов`,
    }),
    url: z.string().max(5000, {
      message: `Длина не более 5000 символов`,
    }),
    data_lte: z.string(),
    data_gte: z.string(),
  })
  .refine((data) => !(data.advertisers.length == 0), {
    message: "Введите рекламодателей",
    path: ["advertisers"],
  })
  .refine((data) => !(data.advertisers.split(/[\s,]+/).length < 3), {
    message: "Рекламодателей должно быть не менее 3",
    path: ["advertisers"],
  })
  .refine((data) => !(data.advertisers.split(/[\s,]+/).length > 5), {
    message: "Рекламодателей должно быть не более 5",
    path: ["advertisers"],
  })
  .refine((data) => !(data.hashtags.length == 0), {
    message: "Введите хэштеги",
    path: ["hashtags"],
  })
  .refine((data) => !(data.hashtags.split(/[\s,]+/).length < 3), {
    message: "Хэштегов должно быть не менее 3",
    path: ["hashtags"],
  })
  .refine((data) => !(data.hashtags.split(/[\s,]+/).length > 5), {
    message: "Хэштегов должно быть не более 5",
    path: ["hashtags"],
  });
