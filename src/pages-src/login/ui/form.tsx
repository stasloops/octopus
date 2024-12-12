"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../api";
import { FormSchema, IForm } from "../model/form";

interface FormElementProps {}

export const FormElement: FC<FormElementProps> = ({}) => {
  const router = useRouter();
  const { control, reset, handleSubmit, watch } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isLoading, error } = useMutation({
    mutationKey: `login`,
    mutationFn: (data: IForm) => login(data).then(),
    onSuccess: (data, variables) => {
      if (!data) return;
      if (!!data?.error) {
        enqueueSnackbar(data.error, { variant: "error" });
        return;
      }
      enqueueSnackbar("Добро пожаловать!", { variant: "success" });
      router.push(`/`);
    },
    onError: (error: Error, variables) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });

  const onSubmit = (data: IForm) => {
    mutate(data);
  };

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h6">Авторизация</Typography>
        <Controller
          name={"email"}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <>
              <TextField
                required
                fullWidth
                id="form-email"
                label="Логин"
                error={Boolean(error)}
                helperText={error ? error.message : ""}
                onChange={onChange}
                value={value}
                size="small"
              />
            </>
          )}
        />
        <Controller
          name={"password"}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <>
              <TextField
                type="password"
                required
                fullWidth
                id="form-password"
                label="Пароль"
                error={Boolean(error)}
                helperText={error ? error.message : ""}
                onChange={onChange}
                value={value}
                size="small"
              />
            </>
          )}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!!isLoading}
        >
          Войти
        </Button>
        {isLoading && <LinearProgress />}
      </Stack>
    </>
  );
};
