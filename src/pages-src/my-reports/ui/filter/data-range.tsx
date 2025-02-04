"use client";

import { CustomDatePicker } from "@/shared/ui/custom-date-picker";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Stack } from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { IFormFilter } from "../../model/form";

export const DataRangeInput: FC = () => {
  const { watch, setValue } = useFormContext<IFormFilter>();

  const dateGte = watch("created_at__gte");
  const dateLte = watch("created_at__lte");

  const setDateGte = useCallback(
    (newValue: string) => {
      setValue("created_at__gte", `${newValue} 00:00:00`);
    },
    [setValue]
  );

  const setDateLte = useCallback(
    (newValue: string) => {
      setValue("created_at__lte", `${newValue} 00:00:00`);
    },
    [setValue]
  );

  return (
    <>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomDatePicker
          customValue={dateGte}
          onCustomChange={setDateGte}
          gte
        />
        <RemoveOutlinedIcon />
        <CustomDatePicker customValue={dateLte} onCustomChange={setDateLte} />
      </Stack>
    </>
  );
};
