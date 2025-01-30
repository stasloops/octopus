import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import {
  httpGetIntersections,
  IGetIntersectionsSchema,
} from "./http-post-intersections";

export const useGetIntersectionsMutate = () => {
  const props = useMutation({
    mutationFn: (value: IGetIntersectionsSchema[`payload`]) =>
      httpGetIntersections(value),
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
