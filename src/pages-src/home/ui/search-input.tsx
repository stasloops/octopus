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
import { FC, useEffect, useState } from "react";

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

  const [text, setText] = useState<string>(``);
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText(search || ``);
  }, [search]);

  const handleClear = () => {
    setText(``);
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
        }}
        onKeyDown={handleKeyPress as any}
      >
        <InputBase
          id="search"
          placeholder="Поиск"
          onChange={onChangeText}
          value={text}
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
