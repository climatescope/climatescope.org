import _sortBy from "lodash/sortBy"
import _uniqBy from "lodash/uniqBy"
import { create } from "zustand"

export const useStore = create((set, get) => ({
  year: 2024,
  region: "",
  sector: "power",
  setYear: (year) => {
    const sector = [2024, 2023].includes(year) ? "power" : get().sector
    set({ year, sector })
  },
  setSector: (sector) => set({ sector }),
  setRegion: (region) => set({ region }),
}))