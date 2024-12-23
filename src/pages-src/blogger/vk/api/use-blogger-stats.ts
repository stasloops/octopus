import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "react-query";
import { httpGetBloggerStats } from "./http-get-blogger-stats";

export const useGetBloggerMutateStats = () => {
  const params = useParams();
  const id = params.id as unknown as number;

  const props = useQuery({
    queryKey: [`httpGetBloggerStats`, id],
    queryFn: () => httpGetBloggerStats({ id: id }),
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
