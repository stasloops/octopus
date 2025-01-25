import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Theme,
} from "@mui/material";
import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FilterFormData } from "../../lib/filter-form-schema";
import Grid2 from "@mui/material/Unstable_Grid2";

interface FilterSelectProps {
  name: keyof FilterFormData;
  label: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ name, label }) => {
  const { control } = useFormContext<FilterFormData>();
  const [value, setValue] = useState("");

  return (
    <Grid2 xs={6} md={6} lg={4}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          setValue(field.value || "");

          return (
            <FormControl
              fullWidth
              sx={{ ...sx(value), height: "40px", borderRadius: "100px" }}
            >
              <InputLabel id="demo-simple-select-label">{label}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                label={label}
                sx={{
                  height: "40px",
                  borderRadius: "100px",
                }}
                {...field}
              >
                <MenuItem value="true">Да</MenuItem>
                <MenuItem value="false">Нет</MenuItem>
              </Select>
            </FormControl>
          );
        }}
      />
    </Grid2>
  );
};

const sx = (value: string): SxProps<Theme> | any => {
  return {
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
