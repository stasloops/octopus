import { CustomTextField } from "@/shared/ui/custom-text-field";
import { Stack } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IFormModalFilter } from "../../model/form";

export const NameInput: FC = () => {
  const { control, watch, setValue } = useFormContext<IFormModalFilter>();

  return (
    <>
      <Controller
        name={"name"}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <>
            <Stack spacing={1}>
              <CustomTextField
                fullWidth
                label="Наименование файла *"
                variant="outlined"
                size="small"
                error={Boolean(error)}
                helperText={error ? error.message : ""}
                onChange={onChange}
                value={value}
              />
            </Stack>
          </>
        )}
      />
    </>
  );
};
