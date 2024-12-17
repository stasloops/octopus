import { create } from "zustand";
import { IGetBloggerSchema } from "../api/http-get-blogger";

interface IBloggerTableStore {
  value: IGetBloggerSchema["response"] | null;
  setValue: (value: IGetBloggerSchema["response"] | null) => void;
}

export const useBloggerTableStore = create<IBloggerTableStore>()((set) => ({
  value: null,
  setValue: (value) => set(() => ({ value })),
}));
