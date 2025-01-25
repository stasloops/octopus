import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";

export const CustomTextFieldSX: SxProps<Theme> | any = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `#B5CDEF`,
    // zIndex: -1,
  },
  "& .MuiInputLabel-root": {
    color: `#B5CDEF`,
  },
  "& .MuiInputBase-root": {
    borderRadius: `20px`,
    "& ::placeholder": {
      color: `#B5CDEF`,
      opacity: 1,
    },
  },
};

export const CustomTextField = (props: TextFieldProps) => {
  return (
    <TextField
      variant="outlined"
      {...props}
      sx={{ ...CustomTextFieldSX, ...props.sx }}
    />
  );
};
