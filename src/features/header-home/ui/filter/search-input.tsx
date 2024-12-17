"use client";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FC } from "react";
import { useSearchStore } from "../../model/store";

interface SearchInputProps {}

export const SearchInput: FC<SearchInputProps> = () => {
  const text = useSearchStore((state) => state.value);
  const setText = useSearchStore((state) => state.setValue);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClear = () => {
    setText(``);
  };

  return (
    <>
      <TextField
        label="Поиск"
        variant="outlined"
        onChange={onChangeText}
        value={text}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
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
