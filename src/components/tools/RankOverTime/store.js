
import _sortBy from "lodash/sortBy"
import _groupBy from "lodash/groupBy"
import { create } from "zustand"

export const useStore = create((set) => ({
  selectedMarket: "nl",
  hoveredMarket: "",
  setSelectedMarket: (selectedMarket) => set({ selectedMarket }),
  setHoveredMarket: (hoveredMarket) => set({ hoveredMarket }),
  selectedMarketGroup: "",
  setSelectedMarketGroup: (selectedMarketGroup) => set({ selectedMarketGroup }),
  selectedRegion: "",
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
}))