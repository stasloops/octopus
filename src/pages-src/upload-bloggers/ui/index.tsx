"use client";

import { ConteinerMonitorCenter } from "@/shared/ui/container-monitor-center";
import { Layout } from "@/widgets/layout";
import { Box, Link, Typography } from "@mui/material";
import { useSave } from "../lib/hooks/use-save";
import { UploadCsv } from "./upload-csv";

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
        <ConteinerMonitorCenter>
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
        </ConteinerMonitorCenter>
      </Box>
    </>
  );
};
