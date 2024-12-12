"use server";

import { createSessionCustom } from "@/src/shared/lib/session-custom";
import { FormSchema, IForm } from "./model/form";

export const login = async (data: IForm) => {
  const validatedFields = FormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: `Ошибка валидации` };
  }

  if (
    process.env.BETA_LOGIN != data.email ||
    process.env.BETA_PASS != data.password
  ) {
    return { error: `Неверный логин или пароль!` };
  }

  try {
    await createSessionCustom({ userId: 0 });
    return { value: true };
  } catch (error) {
    console.log(error);
    return { error: `Ошибка при авторизации` };
  }
};
