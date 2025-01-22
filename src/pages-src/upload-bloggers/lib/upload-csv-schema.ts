import { z } from "zod";

export const uploadCsvSchema = z.object({
  file: z.instanceof(FileList).refine(
    (fileList) => {
      const file = fileList.item(0);
      if (!file) return false;
      return file.type === "text/csv" || file.name.endsWith(".csv");
    },
    {
      message: "Пожалуйста, загрузите корректный CSV файл",
    }
  ),
});

export type FormData = z.infer<typeof uploadCsvSchema>;
