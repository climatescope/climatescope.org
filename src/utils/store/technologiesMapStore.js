import { create } from "zustand"

const useStore = create((set) => ({
  legend: [],
  data: [],
  setData: (data) => {
    const legend = data.columns
      .filter((d) => !isNaN(parseInt(d)))
      .flatMap((key) => data.map((dd) => dd[key]))
      .reduce((acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]), [])
    set({ data, legend })
  },
  year: 2021,
  setYear: (year) => set({ year }),

  tooltipContent: "",
  setTooltipContent: (tooltipContent) => set({ tooltipContent }),
}))

export default useStore
