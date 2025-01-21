"use client";

import { Layout } from "@/src/widgets/layout";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { UploadCsv } from "./upload-csv";
import { saveBloggerPlatformCsv } from "../api";

export const UploadBloggersPage = () => {
  const handleSaveBloggerPlatform = async (file: File) => {
    try {
      await saveBloggerPlatformCsv(file);
      enqueueSnackbar("Данные успешно сохранены!", { variant: "success" });
    } catch {
      enqueueSnackbar("Ошибка при сохранении данных", { variant: "error" });
    }
  };
  return (
    <>
      <Layout />
      <div>
        <UploadCsv fallback={handleSaveBloggerPlatform} />
      </div>
    </>
  );
};
