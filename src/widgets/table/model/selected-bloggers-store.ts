import {create} from 'zustand';

export type SelectedBlogger = {
  id: number
  name: string
}

interface SelectedBloggersStore {
  selectedBloggers: SelectedBlogger[]
  isAllSelected: boolean
  toggleSelection: (blogger: SelectedBlogger) => void
  isBloggerSelected: (id: SelectedBlogger['id']) => boolean
  setSelectedBloggers: (bloggers: SelectedBlogger[]) => void
  toggleSelectAll: () => void
}

export const useSelectedBloggers = create<SelectedBloggersStore>((set, get) => ({
  selectedBloggers: [],
  isAllSelected: false,

  setSelectedBloggers: (bloggers: SelectedBlogger[]) => set((state)=>({
    selectedBloggers: bloggers,
    isAllSelected: state.isAllSelected,
  })),

  toggleSelection: (blogger: SelectedBlogger) => set((state) => {
    const bloggerExists = state.selectedBloggers.find(b => b.id === blogger.id);

    if (bloggerExists) {
      const newBloggers = state.selectedBloggers.filter(item => item.id !== blogger.id);
      return {
        selectedBloggers: newBloggers,
        isAllSelected: false
      };
    }

    return {
      selectedBloggers: [...state.selectedBloggers, blogger],
      isAllSelected: state.isAllSelected
    };
  }),

  isBloggerSelected: (id: SelectedBlogger['id']) => {
    const state = get();
    return state.isAllSelected || state.selectedBloggers.find((blogger) => blogger.id === id) !== undefined;
  },

  toggleSelectAll: () => {
    const state = get();
    if (state.isAllSelected) {
      return set({
        selectedBloggers: [],
        isAllSelected: false
      });
    }
    return set({
      isAllSelected: true
    });
  }}))