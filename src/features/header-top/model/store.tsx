import { create } from "zustand";

interface ISearchStore {
  value: string;
  setValue: (value: string) => void;
}

export const useSearchStore = create<ISearchStore>()((set) => ({
  value: ``,
  setValue: (value) => set(() => ({ value })),
}));
