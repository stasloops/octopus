import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { limitCount } from "../model/const";
import { httpGetBlogger, IGetBloggerSchema } from "./http-get-blogger";

export const useGetBloggerMutate = () => {
  const props = useMutation({
    mutationFn: (value: IGetBloggerSchema[`payload`]) =>
      httpGetBlogger({ limit: limitCount, ...value, sort: `-subscribers` }),
    onSuccess: (data, variables) => {
      if (!data) return;
      if (data.data.length < limitCount) data.meta.end = true;
    },
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
