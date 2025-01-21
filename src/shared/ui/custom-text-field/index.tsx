import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";

const InputSX: SxProps<Theme> | any = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `#B5CDEF`,
    zIndex: -1,
  },
  "& .MuiInputLabel-root": {
    color: `#B5CDEF`,
  },
};

export const CustomTextField = (props: TextFieldProps) => {
  return (
    <TextField variant="outlined" {...props} sx={{ ...InputSX, ...props.sx }} />
  );
};
