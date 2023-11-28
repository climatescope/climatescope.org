import { create } from "zustand"
import _max from "lodash/max"

const useHighlightsStore = create((set) => ({
  /**
   * Config
   */
  padding: {
    top: 40,
    left: 20,
    right: 20,
    bottom: 40,
  },

  currentYear: 2022,
  currentDataKey: "cumulative",

  yScaleZoomFactor: 1,

  /**
   * Slides
   */
  currentSlide: 0,
  updateSlide: (currentSlide) => {
    // TODO: Update stuff from here to advance the story
    switch (currentSlide) {
      case 1:
        set({ currentSlide, yScaleZoomFactor: 1000 })
        break
      default:
        set({ currentSlide, yScaleZoomFactor: 1 })
        break
    }
  },

  /**
   * Data
   */
  data: [],
  setInitialData: (data) => {
    set((state) => {
      const maxScore = _max(data, (o) => o.score)
      const maxValue = _max(
        data.map((d) => {
          // const keys = ["2018", "2019", "2020", "2021", "2022"]
          const keys = [state.currentDataKey]
          const allValues = keys.map((y) => d[y]).filter((dd) => dd?.hasValue)
          const maxValue2 = _max(allValues, (o) => o.value)
          return maxValue2?.value || 0
        })
      )
      const domains = {
        x: [0, getNiceValue(maxScore?.score)],
        y: [0, getNiceValue(maxValue)],
      }
      const colorMap = {
        "developed markets": "#F05",
        "developing markets": "#06F",
      }
      console.log(data)
      return {
        data: data.map((d) => ({ ...d, fill: colorMap[d.marketType] })),
        domains,
      }
    })
  },

  /**
   * Domains + Scales
   */
  domains: {
    x: [0, 5],
    y: [0, 100],
  },
}))

function getNiceValue(val) {
  if (!val) return val
  const rounded = Math.ceil(val)
  const str = `${rounded}`
  const factor = Math.pow(10, str.length - 1)
  return Math.ceil(rounded / factor) * factor || 0
}

export default useHighlightsStore
