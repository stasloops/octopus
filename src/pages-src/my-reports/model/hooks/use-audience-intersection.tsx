import { useInfiniteQuery } from "react-query";
import { getAudienceIntersection } from "../../api/audience-intersection";
import { enqueueSnackbar } from "notistack";
import { useFormContext } from "react-hook-form";
import { IFormFilter } from "../form";

const LIMIT = 20;

export const useAudienceIntersection = () => {
  const { watch } = useFormContext<IFormFilter>();
  const created_at__gte = watch("created_at__gte");
  const created_at__lte = watch("created_at__lte");

  return useInfiniteQuery(
    ["audienceIntersection", { created_at__gte, created_at__lte }],
    ({ pageParam = 0 }) =>
      getAudienceIntersection({
        created_at__gte: created_at__gte,
        created_at__lte: created_at__lte,
        limit: LIMIT,
        offset: pageParam * LIMIT,
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.meta.end) return undefined;
        return pages.length;
      },
      onError: (error: any) => {
        enqueueSnackbar("Ошибка сервера", { variant: "error" });
      },
    }
  );
};
