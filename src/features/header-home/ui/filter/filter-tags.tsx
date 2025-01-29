import { CustomTextField } from "@/shared/ui/custom-text-field";
import { Chip, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FilterFormData } from "../../lib/filter-form-schema";



interface FilterTagsProps {
    name: keyof FilterFormData;
    label: string;
  }

export const FilterTags: FC<FilterTagsProps> = ({ name, label }) => {
  const { control } = useFormContext<FilterFormData>();

  return (
    <Grid2 xs={6} md={6} lg={4}>
      <Controller
        name={name}
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
                label={label}
                variant="outlined"
                size="small"
                error={Boolean(error)}
                helperText={error ? error.message : ""}
                onChange={onChange}
                value={value}
              />
              <Grid2 container spacing={`5px`}>
                {(value || "").length > 0 &&
                  (value || "").split(/[\s,]+/).map((el, index) => (
                    <Grid2 key={index} xs="auto">
                      <Chip label={el} />
                    </Grid2>
                  ))}
              </Grid2>
            </Stack>
          </>
        )}
      />
    </Grid2>
  );
};
