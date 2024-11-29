import { enqueueSnackbar } from "notistack";
import { useQuery } from "react-query";
import { httpGetBlogger } from "./http-get-blogger";

export const useBlogger = () => {
  const props = useQuery({
    queryKey: [`getBlogger`],
    queryFn: () => httpGetBlogger({}),
    onError: (error: Error) => {
      enqueueSnackbar("Ошибка загрузки данных", { variant: "error" });
    },
  });
  return props;
};
