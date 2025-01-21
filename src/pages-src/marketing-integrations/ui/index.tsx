"use client";

import { Layout } from "@/src/widgets/layout";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { FilterElement } from "./filter";
import { ResultList } from "./result-list";

interface PageProps {}

export const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <Layout />
      <Box>
        <Typography
          variant="h6"
          sx={{
            px: {
              xs: `18px`,
              md: `38px`,
              lg: `38px`,
            },
            pt: `40px`,
            fontWeight: `600`,
            fontSize: `20px`,
            lineHeight: `25px`,
          }}
        >{`Поиск по маркетинговым интеграциям`}</Typography>
        <FilterElement />
        <ResultList />
      </Box>
    </>
  );
};
