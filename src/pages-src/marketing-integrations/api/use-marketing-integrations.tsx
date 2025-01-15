import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { limitCount } from "../model/const";
import { IFormFilter } from "../model/form";
import { useMarketingTableStore } from "../model/store";
import { httpMarketingIntegrations } from "./http-get-marketing-integrations";

export const useMarketingIntegrations = () => {
  const setMarketingTable = useMarketingTableStore((state) => state.setValue);

  const props = useMutation({
    mutationFn: (data: IFormFilter) =>
      httpMarketingIntegrations({
        offset: 0,
        limit: limitCount,
        // sort: `-subscribers`,
      }).then(),
    onSuccess: (data, variables) => {
      if (!!data) {
        setMarketingTable(data);
      }
    },
    onError: (error: Error, variables) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
