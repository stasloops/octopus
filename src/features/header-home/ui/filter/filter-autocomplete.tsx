import { Autocomplete, TextField, Theme, SxProps } from "@mui/material";
import React, { FC } from "react";
import { FilterFormData } from "../../lib/filter-form-schema";
import { Controller, useFormContext } from "react-hook-form";
import Grid2 from "@mui/material/Unstable_Grid2";

interface FilterAutocompleteProps {
  name: keyof FilterFormData;
  label: string;
  data: string[];
  defaultValue: string;
}

export const FilterAutocomplete: FC<FilterAutocompleteProps> = ({
  name,
  label,
  data,
  defaultValue,
}) => {
  const { control } = useFormContext<FilterFormData>();

  return (
    <Grid2 xs={6} md={6} lg={4}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Autocomplete
            {...field}
            value={value || null}
            onChange={(_, newValue) => onChange(newValue)}
            options={[defaultValue, ...data]}
            disablePortal
            sx={{ ...sx(value || ""), height: "40px" }}
            clearIcon={<div style={{ pointerEvents: "none" }}></div>}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        )}
      />
    </Grid2>
  );
};

const sx = (value: string): SxProps<Theme> | any => {
  return {
    "& .MuiOutlinedInput-root": {
      p: `0px 14px`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `#B5CDEF`,
      zIndex: -1,
    },
    "& .MuiInputLabel-root": {
      color: `#B5CDEF`,
      transform: value
        ? "translate(14px, -12px) scale(0.75)"
        : `translate(14px, 8px) scale(1)`,
      "&.Mui-focused": {
        transform: "translate(14px, -12px) scale(0.75)",
      },
    },
    "& .MuiInputBase-root": {
      borderRadius: `20px`,
      "& ::placeholder": {
        color: `#B5CDEF`,
        opacity: 1,
      },
    },
  };
};
