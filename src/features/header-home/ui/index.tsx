"use client";

import { Stack } from "@mui/material";
import { FC } from "react";
import { FilterButton } from "./filter-button";
import { SearchInput } from "./search-input";

export const HeaderHome: FC = () => {
  return (
    <>
      <Stack
        direction="row"
        spacing={`18px`}
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
