"use server";

import { createSessionCustom } from "@/shared/lib/session-custom";
import { FormSchema, IForm } from "../model/form";
import { httpPostAutorizate } from "./http-post-autorizate";

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
    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.password);
    const res = await httpPostAutorizate(formData);
    if (!res) return { error: `Неверный логин или пароль` };
    await createSessionCustom({
      token: res.access_token,
      expiresAtServer: res.expires_at,
    });
    return { value: res };
  } catch (error) {
    console.log(error);
    return { error: `Ошибка при авторизации` };
  }
};
