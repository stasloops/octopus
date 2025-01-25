"use client";

import { CustomDatePicker } from "@/shared/ui/custom-date-picker";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Stack } from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { IFormFilter } from "../../model/form";

const CalendarIcon = () => (
  <img
    src={`/calendar.svg`}
    alt="calendar-orda"
    style={{
      objectFit: `contain`,
      width: `24px`,
      height: `24px`,
      // pointerEvents: `none`,
    }}
  />
);

export const DataRangeInput: FC = () => {
  const { watch, setValue } = useFormContext<IFormFilter>();

  const data_gte = watch(`data_gte`);
  const data_lte = watch(`data_lte`);

  const setDateGte = useCallback(
    (newValue: string) => {
      setValue(`data_gte`, newValue);
    },
    [setValue]
  );

  const setDateLte = useCallback(
    (newValue: string) => {
      setValue(`data_lte`, newValue);
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
        <CustomDatePicker customValue={data_gte} onCustomChange={setDateGte} gte />
        <RemoveOutlinedIcon />
        <CustomDatePicker customValue={data_lte} onCustomChange={setDateLte} />
      </Stack>
    </>
  );
};
