import {enqueueSnackbar} from "notistack";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getBlogers, IPayload} from "../api";
import {limitCount} from "../config";
import {create} from "zustand";

export const BLOGERS_QUERY_KEY = "blogers";

interface BlogersFiltersStore {
  filters: IPayload;
  setFilters: (filters: IPayload | ((prev: IPayload) => IPayload)) => void;
}

export const useFiltersStore = create<BlogersFiltersStore>((set) => ({
  filters: {},
  setFilters: (filters) =>
    set((state) => ({
      filters: typeof filters === "function" ? filters(state.filters) : filters,
    })),
}));

export const useBlogers = () => {
  const { filters, setFilters } = useFiltersStore();
  const queryClient = useQueryClient();

  const query = useQuery(
    BLOGERS_QUERY_KEY,
    () => getBlogers({ limit: limitCount, sort: `-subscribers` }),
    {
      enabled: false,
    }
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await getBlogers({
        limit: limitCount,
        ...filters,
        sort: `-subscribers`,
      });
      setFilters((prev) => ({
        ...prev,
        ...res.meta,
      }));
      return res;
    },
    onSuccess: (data) => {
      if (!data) return;
      if (data.data.length < limitCount) data.meta.end = true;
      queryClient.setQueryData(BLOGERS_QUERY_KEY, data);
    },
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });

  const mutateAsync = async () => {
    setTimeout(() => {
      mutation.mutateAsync();
    });
  };

  return {
    ...query,
    setFilters,
    mutateAsync,
  };
};
