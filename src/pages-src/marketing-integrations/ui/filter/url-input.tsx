import { TextField } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IFormFilter } from "../../model/form";

export const UrlInput: FC = () => {
  const { control, watch, setValue } = useFormContext<IFormFilter>();

  return (
    <>
      <Controller
        name={"url"}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <>
            <TextField
              fullWidth
              label="Ссылка на бренд"
              variant="outlined"
              error={Boolean(error)}
              helperText={error ? error.message : ""}
              onChange={onChange}
              value={value}
            />
          </>
        )}
      />
    </>
  );
};
