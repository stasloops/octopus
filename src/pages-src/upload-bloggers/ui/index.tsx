"use client";

import { Layout } from "@/src/widgets/layout";
import React from "react";
import { UploadCsv } from "./upload-csv";
import { Box, Link, Typography } from "@mui/material";
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
        >{`Загрузка блогеров`}</Typography>
        <UploadCsv fallback={handleSaveBloggerPlatform} />

        <Box sx={{ marginTop: "12px" }}>
          <Link
            sx={{ cursor: "pointer" }}
            href="/pdf/manual.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Инструкция по добавлению сообществ
          </Link>
        </Box>
      </Box>
    </>
  );
};
