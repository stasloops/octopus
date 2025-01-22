"use client";

import { Layout } from "@/src/widgets/layout";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { UploadCsv } from "./upload-csv";
import { saveBloggerPlatformCsv } from "../api";
import { useMutation } from "react-query";

export const Page = () => {
  const { mutate: handleSaveBloggerPlatform } = useMutation({
    mutationFn: (file: File) => saveBloggerPlatformCsv(file),
    onSuccess: () => {
      enqueueSnackbar("Данные успешно сохранены!", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Ошибка при сохранении данных", { variant: "error" });
    },
  });
  return (
    <>
      <Layout />
      <div>
        <UploadCsv fallback={handleSaveBloggerPlatform} />
      </div>
    </>
  );
};
