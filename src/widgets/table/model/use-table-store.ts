import {create} from 'zustand';

interface TableState {
  selectable: boolean;
  setSelectable: (value: boolean) => void;
}

export const useTableStore = create<TableState>((set) => ({
  selectable: false,

  setSelectable: (value) => set((state) => {
    if (state.selectable !== value) {
      return { selectable: value };
    }
    return state;
  }),
}));