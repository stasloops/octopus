import { dateFormatClient } from "@/src/shared/lib/date";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { FC, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IFormFilter } from "../../model/form";

export const DataRangeInput: FC = () => {
  const { watch, setValue } = useFormContext<IFormFilter>();

  const data_gte = watch(`data_gte`);
  const data_lte = watch(`data_lte`);

  const gte = useMemo(() => {
    return !!data_gte ? moment(data_gte, dateFormatClient) : null;
  }, [data_gte]);

  const lte = useMemo(() => {
    return !!data_lte ? moment(data_lte, dateFormatClient) : null;
  }, [data_lte]);

  const setDateGte = useCallback(
    (newValue: moment.Moment | null) => {
      setValue(`data_gte`, !!newValue ? newValue.format(dateFormatClient) : "");
    },
    [setValue]
  );

  const setDateLte = useCallback(
    (newValue: moment.Moment | null) => {
      setValue(`data_lte`, !!newValue ? newValue.format(dateFormatClient) : "");
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
        <DatePicker
          label="Период от"
          value={gte}
          onChange={(newValue) => setDateGte(newValue)}
          slotProps={{
            field: { clearable: true, onClear: () => setDateLte(null) },
          }}
        />
        <RemoveOutlinedIcon />
        <DatePicker
          label="Период до"
          value={lte}
          onChange={(newValue) => setDateLte(newValue)}
          slotProps={{
            field: { clearable: true, onClear: () => setDateLte(null) },
          }}
        />
      </Stack>
    </>
  );
};
