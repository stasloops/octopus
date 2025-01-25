"use client";

import { CustomTextField } from "@/shared/ui/custom-text-field";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import { FC, useRef } from "react";
import { useSearchStore } from "../../model/store";

interface SearchInputProps {}

export const SearchInput: FC<SearchInputProps> = () => {
  const text = useSearchStore((state) => state.value);
  const setText = useSearchStore((state) => state.setValue);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const inputRef = useRef<HTMLInputElement>();

  const handleClear = () => {
    setText(``);
    const input = inputRef.current;
    if (!!input) {
      input.focus();
    }
  };

  return (
    <>
      <CustomTextField
        // label="Поиск"
        placeholder="Поиск"
        variant="outlined"
        onChange={onChangeText}
        value={text}
        size="small"
        inputRef={inputRef}
        sx={{
          "& .MuiOutlinedInput-notchedOutline ": {
            background: `#EFFCFC`,
            zIndex: -1,
          },
          "& ::placeholder": {
            color: `#B5CDEF`,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: `#B5CDEF` }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {text.length > 0 && (
                <IconButton onClick={handleClear}>
                  <ClearOutlinedIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
