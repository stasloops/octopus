import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { FormData, uploadCsvSchema } from "../lib/upload-csv-schema";
import { useDrag } from "../lib/hooks/use-drag";

interface UploadCsvProps {
  fallback: (file: File) => void;
}

interface DropZoneProps {
  isDragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  children: React.ReactNode;
}

const DropZoneComponent: FC<DropZoneProps> = ({
  isDragActive,
  children,
  ...dragHandlers
}) => (
  <DropZone
    isDragActive={isDragActive}
    {...dragHandlers}
    component="label"
    role={undefined}
    tabIndex={-1}
  >
    {children}
  </DropZone>
);

export const UploadCsv: FC<UploadCsvProps> = ({ fallback }) => {
  const { isDragActive, handleDrag, handleDrop } = useDrag();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(uploadCsvSchema),
    mode: 'onChange',
  });

  const fileList = watch('file');
  const hasFile = fileList?.[0];
  const fileName = hasFile?.name ?? '';

  const onSubmit = (data: FormData) => {
    const file = data.file[0];
    if (file) fallback(file);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {errors.file && (
        <Typography color="error" mb={2}>
          {errors.file.message}
        </Typography>
      )}

      <DropZoneComponent
        isDragActive={isDragActive}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={(e) => handleDrop(e, setValue)}
      >
        <Button
          component="span"
          variant="contained"
          tabIndex={-1}
        >
          {fileName || 'Загрузить CSV файл'}
          <VisuallyHiddenInput
            {...register('file')}
            accept=".csv"
            type="file"
          />
        </Button>
      </DropZoneComponent>

      <Button
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
        type="submit"
        variant="contained"
        disabled={!hasFile}
      >
        Сохранить
      </Button>
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
  borderRadius: "30px",
  padding: "20px",
  marginTop: '10px',
  textAlign: "center",
  backgroundColor: true ? "rgba(33, 150, 243, 0.1)" : "transparent",
  cursor: "pointer",
  transition: "all 0.3s ease",
}));
