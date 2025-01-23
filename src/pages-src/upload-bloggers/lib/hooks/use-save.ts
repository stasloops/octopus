import { useMutation } from "react-query";
import { saveBloggerPlatformCsv } from "../../api";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

interface IError {
  response: { status: number; data: { detail: string } };
}

const MESSAGE_CONFIG = {
  success: "Данные успешно сохранены!",
  error: "Ошибка: Что-то пошло не так.",
  error_400:
    "Ошибка: Загруженный файл содержит некорректные данные. Проверьте содержание и повторите попытку.",
};

export const useSave = () => {
  const router = useRouter();

  const { mutate: handleSaveBloggerPlatform } = useMutation({
    mutationFn: (file: File) => saveBloggerPlatformCsv(file),
    onSuccess: () => {
      enqueueSnackbar(MESSAGE_CONFIG["success"], { variant: "success" });
      router.push("/");
    },
    onError: ({
      response: {
        status,
        data: { detail },
      },
    }: IError) => {
      if (status === 400) {
        enqueueSnackbar(detail, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(MESSAGE_CONFIG["error"], { variant: "error" });
      }
    },
  });

  return handleSaveBloggerPlatform;
};
