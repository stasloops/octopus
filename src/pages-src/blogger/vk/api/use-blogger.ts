import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "react-query";
import { httpGetBlogger } from "./http-get-blogger";

export const useGetBloggerMutate = () => {
  const params = useParams();
  const id = params.id as unknown as number;

  const props = useQuery({
    queryKey: [`httpGetBlogger`, id],
    queryFn: () => httpGetBlogger({ id: id }),
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
