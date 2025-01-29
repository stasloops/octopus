import { z } from "zod";

export interface IFormFilter {
  names: string;
}

export const defaultFormFilter: IFormFilter = {
  names: ``,
};

export const FormFilterSchema = z
  .object({
    names: z.string().max(5000, {
      message: `Длина не более 5000 символов`,
    }),
  })
  .refine((data) => !(data.names.length == 0), {
    message: "Введите наименования сообществ",
    path: ["names"],
  })
  .refine((data) => !(data.names.split(/[\s,]+/).length < 2), {
    message: "Сообществ должно быть не менее 2",
    path: ["names"],
  })
  .refine((data) => !(data.names.split(/[\s,]+/).length > 5), {
    message: "Сообществ должно быть не более 5",
    path: ["names"],
  });

export interface IFormModalFilter {
  name: string;
}

export const defaultFormModalFilter: IFormModalFilter = {
  name: ``,
};

export const FormFilterModalSchema = z.object({
  name: z
    .string()
    .max(5000, {
      message: `Длина не более 5000 символов`,
    })
    .min(1, { message: "Обязательное поле" })
    .max(50, { message: "Длина не более 50 символов" }),
});
