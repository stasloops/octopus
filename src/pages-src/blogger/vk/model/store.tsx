import { create } from "zustand";

interface ICloseAll {
  value: number;
  onChange: () => void;
}

export const useCloseAll = create<ICloseAll>()((set) => ({
  value: 0,
  onChange: () => set((props) => ({ value: props.value + 1 })),
}));
