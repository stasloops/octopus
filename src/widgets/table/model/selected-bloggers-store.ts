import {create} from 'zustand';

export type SelectedBlogger = {
  id: number
  name: string
}

interface SelectedBloggersStore {
  selectedBloggers: SelectedBlogger[]
  setSelectedBloggers: (bloggers: SelectedBlogger[]) => void

  isBloggerSelected: (id: SelectedBlogger['id']) => boolean
  toggleBloggerSelected: (blogger: SelectedBlogger) => void
}

export const useSelectedBloggers = create<SelectedBloggersStore>((set, get) => ({
  selectedBloggers: [],

  setSelectedBloggers: (bloggers: SelectedBlogger[]) => set((state)=>({
    selectedBloggers: bloggers,
  })),

  toggleBloggerSelected: (blogger: SelectedBlogger) => set((state) => {
    const bloggerExists = state.selectedBloggers.find(item => item.id === blogger.id);

    if (bloggerExists) {
      return {
        selectedBloggers: state.selectedBloggers.filter(item => item.id !== blogger.id),
      };
    }

    return {
      selectedBloggers: [...state.selectedBloggers, blogger],
    };
  }),

  isBloggerSelected: (id: SelectedBlogger['id']) => {
    const state = get();
    return state.selectedBloggers.find((blogger) => blogger.id === id) !== undefined;
  },
}))