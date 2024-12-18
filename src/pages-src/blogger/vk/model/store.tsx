import { create } from "zustand";
import { IBlogger } from "../api/http-get-blogger";

interface IBloggerTableStore {
  value: IBlogger | null;
  setValue: (value: IBlogger | null) => void;
}

export const useBloggerTableStore = create<IBloggerTableStore>()((set) => ({
  value: null,
  setValue: (value) => set(() => ({ value })),
}));
