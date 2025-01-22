import { IconButton, InputAdornment } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useCallback, useMemo, useState } from "react";
import { dateFormatClient } from "../../lib/date";
import { CustomTextFieldSX } from "../custom-text-field";

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
const Calendar2Icon = () => (
  <img
    src={`/calendar-2.svg`}
    alt="calendar-orda"
    style={{
      objectFit: `contain`,
      width: `24px`,
      height: `24px`,
      // pointerEvents: `none`,
    }}
  />
);

export const CustomDatePicker = (
  props: DatePickerProps<Moment> & {
    customValue?: string;
    onCustomChange?: (value: string) => void;
    gte?: boolean;
  }
) => {
  const value = useMemo(() => {
    return !!props.customValue
      ? moment(props.customValue, dateFormatClient)
      : null;
  }, [props.customValue]);
  const setDate = useCallback(
    (newValue: moment.Moment | null) => {
      props.onCustomChange?.(
        !!newValue ? newValue.format(dateFormatClient) : ""
      );
    },
    [props.onCustomChange]
  );

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DatePicker
      open={open}
      onClose={handleClose}
      slotProps={{
        textField: {
          fullWidth: true,
          size: `small`,
          sx: { ...CustomTextFieldSX },
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickOpen}>
                  {!props.gte && <CalendarIcon />}
                  {!!props.gte && <Calendar2Icon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        },
        field: { clearable: true, onClear: () => setDate(null) },
      }}
      {...props}
      value={value}
      onChange={(newValue) => setDate(newValue)}
      sx={{ ...props.sx }}
    />
  );
};
