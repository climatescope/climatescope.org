import { create } from "zustand"

export const useStore = create((set) => ({
  highlighted: "",
  setHighlighted: (highlighted) => set({ highlighted }),
}))
