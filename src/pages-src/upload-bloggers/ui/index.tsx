"use client";

import { Layout } from "@/src/widgets/layout";
import React from "react";
import { UploadCsv } from "./upload-csv";
import { Box, Typography } from "@mui/material";
import { useSave } from "../lib/hooks/use-save";

export const Page = () => {
  const handleSaveBloggerPlatform = useSave();
  return (
    <>
      <Layout />
      <Box
        sx={{
          width: "100%",
          p: {
            xs: `18px`,
            md: `38px`,
            lg: `38px`,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: `600`,
            fontSize: `20px`,
          }}
        >{`Поиск по блоггерам`}</Typography>
        <UploadCsv fallback={handleSaveBloggerPlatform} />
      </Box>
    </>
  );
};
