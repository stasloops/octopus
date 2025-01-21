import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import { FormData, uploadCsvSchema } from "../lib/upload-csv-schema";
import { useDrag } from "../lib/hooks/use-drag";

interface UploadCsvProps {
  fallback: (file: File) => void;
}

export const UploadCsv: FC<UploadCsvProps> = ({ fallback }) => {
  const [fileName, setFileName] = useState<string>("");
  const { isDragActive, handleDrag, handleDrop } = useDrag();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(uploadCsvSchema),
  });

  const fileList = watch("file");
  const hasFile = fileList && fileList.length > 0;

  const onSubmit = (data: FormData) => {
    const file = data.file[0];
    if (file) {
      fallback(file);
    }
  };

  useEffect(() => {
    if (hasFile) {
      setFileName(fileList[0].name);
    } else {
      setFileName("");
    }
  }, [fileList, hasFile]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "90%",
          paddingTop: "40px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {errors.file && (
          <div style={{ color: "red" }}>{errors.file.message}</div>
        )}

        <DropZone
          isDragActive={isDragActive}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={(e) => handleDrop(e, setValue)}
          component="label"
          role={undefined}
          tabIndex={-1}
        >
          <Button
            component="span"
            role={undefined}
            variant="contained"
            tabIndex={-1}
          >
            {fileName || "Загрузить CSV файл"}
            <VisuallyHiddenInput
              {...register("file")}
              accept=".csv"
              type="file"
            />
          </Button>
        </DropZone>

        <Button type="submit" variant="contained" disabled={!hasFile}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DropZone = styled(Box)<{ isDragActive: boolean }>((props) => ({
  width: "100%",
  height: "50dvh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  border: props.isDragActive ? "2px dashed #2196f3" : "2px dashed  #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  backgroundColor: true ? "rgba(33, 150, 243, 0.1)" : "transparent",
  cursor: "pointer",
  transition: "all 0.3s ease",
  marginBottom: "16px",
}));
