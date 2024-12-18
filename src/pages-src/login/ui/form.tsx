"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Chip,
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLogin } from "../api/use-login";
import { FormSchema, IForm } from "../model/form";

interface FormElementProps {}

export const FormElement: FC<FormElementProps> = ({}) => {
  const { control, reset, handleSubmit, watch } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isLoading, error } = useLogin();

  const onSubmit = (data: IForm) => {
    mutate(data);
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Авторизация</Typography>
          <Tooltip title="Этой страницы не будет">
            <Chip color="error" size="small" label="Временно" variant="outlined" />
          </Tooltip>
        </Stack>
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
