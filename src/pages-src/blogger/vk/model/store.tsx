import { create } from "zustand";

interface ICloseAll {
  group1Open: boolean;
  onChangeGroup1Open: (value: boolean) => void;
  group2Open: boolean;
  onChangeGroup2Open: (value: boolean) => void;
  group3Open: boolean;
  onChangeGroup3Open: (value: boolean) => void;
  group4Open: boolean;
  onChangeGroup4Open: (value: boolean) => void;

  onCloseAll: () => void;
}

export const useCloseAll = create<ICloseAll>()((set, get) => ({
  group1Open: false,
  onChangeGroup1Open: (value) => set(() => ({ group1Open: value })),
  group2Open: false,
  onChangeGroup2Open: (value) => set(() => ({ group2Open: value })),
  group3Open: false,
  onChangeGroup3Open: (value) => set(() => ({ group3Open: value })),
  group4Open: false,
  onChangeGroup4Open: (value) => set(() => ({ group4Open: value })),
  onCloseAll: () =>
    set((props) => ({
      group1Open: false,
      group2Open: false,
      group3Open: false,
      group4Open: false,
    })),
}));
