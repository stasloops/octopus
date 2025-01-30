import { enqueueSnackbar } from "notistack";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { getBlogers, IGetBlogerSchema } from "../api";
import { limitCount } from "../config";

const BLOGERS_QUERY_KEY = "blogers";

export const useBlogers = () => {
  const queryClient = useQueryClient();

  const query = useQuery(
    BLOGERS_QUERY_KEY,
    () => getBlogers({ limit: limitCount, sort: `-subscribers` }),
    {
      enabled: false,
    }
  );

  const mutation = useMutation({
    mutationFn: (value: IGetBlogerSchema[`payload`]) =>
      getBlogers({ limit: limitCount, ...value, sort: `-subscribers` }),
    onSuccess: (data) => {
      if (!data) return;
      if (data.data.length < limitCount) data.meta.end = true;
      queryClient.setQueryData(BLOGERS_QUERY_KEY, data);
    },
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });

  return {
    ...query,
    mutateAsync: mutation.mutateAsync,
  };
};
