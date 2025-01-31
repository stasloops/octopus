import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomTextField } from "@/shared/ui/custom-text-field";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FilterFormData } from "../../lib/filter-form-schema";

interface FilterFieldProps {
  name: keyof FilterFormData;
  label: string;
  type?: "number";
  disabled?: boolean;
}

export const FilterField: FC<FilterFieldProps> = ({ name, label, type, disabled }) => {
  const { control } = useFormContext<FilterFormData>();

  return (
    <Grid2 xs={6} md={6} lg={4}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <CustomTextField
            {...field}
            fullWidth
            label={label}
            variant="outlined"
            size="small"
            type={type || "text"}
            error={!!error}
            helperText={error?.message}
            disabled={disabled}
            inputProps={{
              ...(name === 'erRate' && {
                min: 0,
                max: 100,
                step: 'any'
              })
            }}
            sx={{
              '& input[type=number]': {
                'MozAppearance': 'textfield',
                '&::-webkit-outer-spin-button': {
                  margin: 0,
                  WebkitAppearance: 'none',
                },
                '&::-webkit-inner-spin-button': {
                  margin: 0,
                  WebkitAppearance: 'none',
                },
              },
            }}
          />
        )}
      />
    </Grid2>
  );
};
