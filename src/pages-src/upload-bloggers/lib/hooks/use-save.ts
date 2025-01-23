import { useMutation } from "react-query";
import { saveBloggerPlatformCsv } from "../../api";
import { enqueueSnackbar } from "notistack";

const MESSAGE_CONFIG = {
  success: "Данные успешно сохранены!",
  error: "Ошибка: Что-то пошло не так.",
  error_400:
    "Ошибка: Загруженный файл содержит некорректные данные. Проверьте содержание и повторите попытку.",
};

export const useSave = () => {
  const { mutate: handleSaveBloggerPlatform } = useMutation({
    mutationFn: (file: File) => saveBloggerPlatformCsv(file),
    onSuccess: () => {
      enqueueSnackbar(MESSAGE_CONFIG["success"], { variant: "success" });
    },
    onError: ({ response }: { response: { status: number } }) => {
      if (response.status === 400) {
        enqueueSnackbar(MESSAGE_CONFIG["error_400"], {
          variant: "error",
        });
      } else {
        enqueueSnackbar(MESSAGE_CONFIG["error"], { variant: "error" });
      }
    },
  });

  return handleSaveBloggerPlatform
};
