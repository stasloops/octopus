import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { httpGetBlogger, IGetBloggerSchema } from "./http-get-blogger";

export const useGetBloggerMutate = () => {
  const props = useMutation({
    mutationFn: (value: IGetBloggerSchema[`payload`]) =>
      httpGetBlogger({ ...value }),
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
