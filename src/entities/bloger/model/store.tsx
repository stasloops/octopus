import {create} from "zustand";
import {IGetBloggerSchema} from "../api/http-get-blogger";
import {IBlogger} from "@/shared/api/blogger/model";

interface IBloggerTableStore {
  bloggerTable: IGetBloggerSchema["response"] | null;
  selectable: boolean;

  setBloggerTable: (bloggerTable: IGetBloggerSchema['response']) => void;
  removeBlogger: (id: IBlogger['id']) => void;
  setSelectable: (value: boolean) => void;
}

export const useBloggerTableStore = create<IBloggerTableStore>((set, get) => ({
  bloggerTable: null,
  selectable: false,

  setBloggerTable: (data: IGetBloggerSchema['response']) => set((state) => {
    return {
      ...state,
      bloggerTable: data,
    };
  }),

  removeBlogger: (id) => set((state) => {
      if (!state.bloggerTable?.data) return state;

      return {
        bloggerTable: {
          ...state.bloggerTable,
          data: state.bloggerTable.data.filter((blogger) => blogger.id !== id)
        }
      };
  }),

  setSelectable: (value) => set((state) => {
      if (state.selectable === value) return state;
      return { selectable: value };
  }),

}));
