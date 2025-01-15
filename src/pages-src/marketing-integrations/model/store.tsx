import { create } from "zustand";
import {
  IGetMarketingIntegrationsSchema
} from "../api/http-get-marketing-integrations";

interface IMarketingTableStore {
  value: IGetMarketingIntegrationsSchema["response"] | null;
  setValue: (value: IGetMarketingIntegrationsSchema["response"] | null) => void;
}

export const useMarketingTableStore = create<IMarketingTableStore>()((set) => ({
  value: null,
  setValue: (value) => set(() => ({ value })),
}));
