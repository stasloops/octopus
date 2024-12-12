import { z } from "zod";

export interface IForm {
  email: string;
  password: string;
}

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .max(50, { message: "Длина не более 50 символов" }),
  password: z.string().min(1, { message: "Обязательное поле" }),
});
