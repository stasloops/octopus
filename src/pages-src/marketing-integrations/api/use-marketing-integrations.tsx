import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { IFormFilter } from "../model/form";
import { httpMarketingIntegrations } from "./http-get-marketing-integrations";

export const useMarketingIntegrations = () => {
  const props = useMutation({
    mutationFn: (data: IFormFilter) => httpMarketingIntegrations(data).then(),
    onSuccess: (data, variables) => {},
    onError: (error: Error, variables) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
    },
  });
  return props;
};
