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

interface ICheckListStore {
  value: number[];
  setValue: (value: number[]) => void;
}

export const useCheckListStore = create<ICheckListStore>()((set) => ({
  value: [],
  setValue: (value) => set(() => ({ value })),
}));
