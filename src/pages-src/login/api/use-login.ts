import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";
import { IForm } from "../model/form";
import { login } from "./login";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const props = useMutation({
    mutationFn: (data: IForm) => login(data).then(),
    onSuccess: (data, variables) => {
      if (!data) return;
      if (!!data?.error) {
        enqueueSnackbar(data.error, { variant: "error" });
        return;
      }
      if (!data.value) return;
      localStorage.setItem(`token`, data.value?.access_token);
      enqueueSnackbar("Добро пожаловать!", { variant: "success" });
      setTimeout(() => {
        router.push("/");
      }, 200);
      setTimeout(() => {
        queryClient.refetchQueries();
      }, 1000);
    },
    onError: (error: Error, variables) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });

  return props;
};
