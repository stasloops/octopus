import { DragEvent, useCallback, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export const useDrag = () => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((
    e: DragEvent, 
    setValue: UseFormSetValue<{ file: FileList }>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      setValue("file", e.dataTransfer.files);
    }
  }, []);

  return { isDragActive, handleDrag, handleDrop };
};
