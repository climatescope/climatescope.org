import { create } from "zustand"
import _max from "lodash/max"
import _sortBy from "lodash/sortBy"

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

  coloredBy: "",
  highlightedMarkets: [],

  yScaleZoomFactor: 1,

  /**
   * Slides
   */
  currentSlide: 0,
  updateSlide: (currentSlide) => {
    // TODO: Update stuff from here to advance the story
    switch (currentSlide) {
      case "1":
        set((state) => ({
          currentSlide,
          yScaleZoomFactor: 1,
          highlightedMarkets: [],
          coloredBy: "",
          data: state.unfilteredData,
        }))
        break
      case "2":
        set((state) => ({
          currentSlide,
          yScaleZoomFactor: 1,
          highlightedMarkets: ["us", "cn"],
          coloredBy: "",
          data: state.unfilteredData,
        }))
        break
      case "3":
        set((state) => ({
          currentSlide,
          yScaleZoomFactor: 1,
          highlightedMarkets: [],
          coloredBy: "marketType",
          data: state.unfilteredData,
        }))
        break
      case "4":
        set((state) => ({
          currentSlide,
          yScaleZoomFactor: 1,
          highlightedMarkets: [],
          coloredBy: "marketType",
          data: state.unfilteredData.filter(
            (d) => d.marketType === "developing markets"
          ),
        }))
        break
      case "5":
        set((state) => {
          return {
            currentSlide,
            yScaleZoomFactor: 400,
            highlightedMarkets: _sortBy(
              state.unfilteredData.filter(
                (d) => d.marketType === "developing markets"
              ),
              (o) => o.score
            )
              .slice(0, 15)
              .map((d) => d.iso),
            coloredBy: "",
            data: state.unfilteredData.filter(
              (d) => d.marketType === "developing markets"
            ),
          }
        })
        break
      case "6":
        set((state) => {
          return {
            currentSlide,
            yScaleZoomFactor: 2000,
            highlightedMarkets: _sortBy(
              state.unfilteredData.filter(
                (d) => d.marketType === "developing markets"
              ),
              (o) => o.score
            )
              .slice(0, 15)
              .filter((d) => d.region === "Africa")
              .map((d) => d.iso),
            coloredBy: "",
            data: state.unfilteredData.filter(
              (d) => d.marketType === "developing markets"
            ),
          }
        })
        break
      case "7":
        set((state) => {
          return {
            currentSlide,
            yScaleZoomFactor: 1,
            highlightedMarkets: [],
            coloredBy: "marketType",
            data: state.unfilteredData.filter(
              (d) => d.marketType === "developing markets"
            ),
          }
        })
        break
      case "8":
        set(() => {
          return {
            currentSlide,
            yScaleZoomFactor: 1,
            highlightedMarkets: [],
            coloredBy: "marketType",
            data: [{}],
          }
        })
        break

      // Switch to bar chart

      case "9":
        set(() => {
          return {
            currentSlide,
            yScaleZoomFactor: 1,
            highlightedMarkets: [],
            coloredBy: "",
            data: [{}],
          }
        })
        break
      default:
        set((state) => ({
          currentSlide,
          yScaleZoomFactor: 1, // 1000
          highlightedMarkets: [],
          coloredBy: "",
          data: state.unfilteredData,
        }))
        break
    }
  },

  /**
   * Data
   */
  unfilteredData: [],
  data: [],
  setInitialData: (data, slides, colors) => {
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
        "developed markets": colors.cyan[500],
        "developing markets": colors.purple[500],
      }
      const unfilteredData = data
        .map((d) => ({ ...d, fill: colorMap[d.marketType] }))
        .filter((d) => d.hasInvestmentData)
      return {
        data: unfilteredData,
        unfilteredData,
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
