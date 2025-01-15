import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { limitCount } from "../model/const";
import { useMarketingTableStore } from "../model/store";
import {
  httpMarketingIntegrations,
  IGetMarketingIntegrationsSchema,
} from "./http-get-marketing-integrations";

export const useMarketingIntegrations = () => {
  const setMarketingTable = useMarketingTableStore((state) => state.setValue);

  const props = useMutation({
    mutationFn: (data: IGetMarketingIntegrationsSchema["payload"]) =>
      httpMarketingIntegrations(data).then(),
    onSuccess: (data, variables) => {
      if (!data) return;
      if (data.data.length < limitCount) data.meta.end = true;
    },
    onError: (error: Error, variables) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
