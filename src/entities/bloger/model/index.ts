import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { getBlogers, IGetBlogerSchema } from "../api";
import { limitCount } from "../config";

export const useBlogers = () => {
  const props = useMutation({
    mutationFn: (value: IGetBlogerSchema[`payload`]) =>
      getBlogers({ limit: limitCount, ...value, sort: `-subscribers` }),
    onSuccess: (data) => {
      if (!data) return;
      if (data.data.length < limitCount) data.meta.end = true;
    },
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
