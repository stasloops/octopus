import { create } from "zustand";
import { IBlogger } from "../api/http-get-blogger";

interface IBloggerStore {
  value: IBlogger | null;
  setValue: (value: IBlogger | null) => void;
}

export const useBloggerStore = create<IBloggerStore>()((set) => ({
  value: null,
  setValue: (value) => set(() => ({ value })),
}));
