"use client";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef } from "react";
import { useSearchStore } from "../model/store";

const InputSX: SxProps<Theme> | any = {
  color: `#FFFFFF`,
  background: `#2B3A8B40`,
  padding: `5px 10px`,
  borderRadius: `20px`,
  "& ::placeholder": {
    color: `#FFFFFF`,
    opacity: 0.4,
  },
};

interface SearchInputProps {}

export const SearchInput: FC<SearchInputProps> = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();

  const text = useSearchStore((state) => state.value);
  const setText = useSearchStore((state) => state.setValue);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText(search || ``);
  }, [search]);

  const inputRef = useRef<HTMLInputElement>();

  const handleClear = () => {
    setText(``);
    const input = inputRef.current;
    if (!!input) {
      input.focus();
    }
  };

  const onSearch = () => {
    router.push(
      `/?${new URLSearchParams({
        ...(!!text ? { search: String(text) } : {}),
      })}`
    );
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      event.key === "Enter"
    ) {
      onSearch();
      event.preventDefault();
      return false;
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          // display: { xs: `none`, md: `flex`, lg: `flex` },
        }}
        onKeyDown={handleKeyPress as any}
      >
        <InputBase
          id="search"
          placeholder="Поиск"
          onChange={onChangeText}
          value={text}
          inputRef={inputRef}
          endAdornment={
            <InputAdornment position="end">
              {text.length > 0 && (
                <IconButton onClick={handleClear}>
                  <ClearOutlinedIcon color="white" />
                </IconButton>
              )}
              <IconButton onClick={onSearch}>
                <SearchIcon color="white" />
              </IconButton>
            </InputAdornment>
          }
          sx={InputSX}
        />
      </Stack>
    </>
  );
};
