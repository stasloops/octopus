"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomTextField } from "@/shared/ui/custom-text-field";
import { FilterFormData } from "../../lib/filter-form-schema";

export const SearchInput: FC = () => {
  const { control } = useFormContext<FilterFormData>();

  return (
    <Controller
      name="search"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CustomTextField
          {...field}
          fullWidth
          label="Поиск"
          variant="outlined"
          size="small"
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
