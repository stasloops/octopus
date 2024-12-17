"use client";

import { Stack } from "@mui/material";
import { FC } from "react";
import { FilterButton } from "./filter-button";
import { SearchInput } from "./search-input";

export const HeaderTop: FC = () => {
  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchInput />
        <FilterButton />
      </Stack>
    </>
  );
};
