import { CustomTextField } from "@/src/shared/ui/custom-text-field";
import { Chip, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IFormFilter } from "../../model/form";

export const HashtagsInput: FC = () => {
  const { control, watch, setValue } = useFormContext<IFormFilter>();

  return (
    <>
      <Controller
        name={"hashtags"}
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
                label="Хэштеги **"
                variant="outlined"
                size="small"
                error={Boolean(error)}
                helperText={error ? error.message : ""}
                onChange={onChange}
                value={value}
              />
              <Grid2 container spacing={`5px`}>
                {value.length > 0 &&
                  value.split(/[\s,]+/).map((el, index) => (
                    <Grid2 key={index} xs="auto">
                      <Chip label={`#${el}`} />
                    </Grid2>
                  ))}
              </Grid2>
            </Stack>
          </>
        )}
      />
    </>
  );
};
