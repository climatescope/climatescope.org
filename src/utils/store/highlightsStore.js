import { create } from "zustand"
import _max from "lodash/max"
import _sortBy from "lodash/sortBy"

const useHighlightsStore = create((set) => ({
  /**
   * Config
   */
  padding: {
    top: 60,
    left: 20,
    right: 20,
    bottom: 60,
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
          highlightedMarkets: _sortBy(
            state.unfilteredData.filter(
              (d) => d.marketType === "developing markets"
            ),
            (o) => -o.score
          )
            .slice(0, 15)
            .map((d) => d.iso),
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
            coloredBy: "marketType",
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
              // .filter((d) => d.region === "Africa")
              .filter((d) => d.region === "Middle East & Africa")
              .map((d) => d.iso),
            coloredBy: "marketType",
            data: state.unfilteredData.filter(
              (d) => d.marketType === "developing markets"
            ),
          }
        })
        break
      // case "7":
      //   set((state) => {
      //     return {
      //       currentSlide,
      //       yScaleZoomFactor: 1,
      //       highlightedMarkets: [],
      //       coloredBy: "marketType",
      //       data: state.unfilteredData.filter(
      //         (d) => d.marketType === "developing markets"
      //       ),
      //     }
      //   })
      //   break

      case "7":
        set(() => {
          return {
            currentSlide,
            yScaleZoomFactor: 2000,
            highlightedMarkets: [],
            coloredBy: "marketType",
            data: [{}],
          }
        })
        break

      // Switch to bar chart

      case "8":
        set((state) => {
          return {
            currentSlide,
            yScaleZoomFactor: 1,
            highlightedMarkets: [],
            coloredBy: "",
            visiblePolicies: state.policies.slice(0, 1),
            data: [{}],
          }
        })
        break

      case "9":
        set((state) => {
          return {
            currentSlide,
            yScaleZoomFactor: 1,
            highlightedMarkets: [],
            coloredBy: "",
            visiblePolicies: state.policies.slice(0, 2),
            data: [{}],
          }
        })
        break

      case "10":
        set((state) => {
          return {
            currentSlide,
            yScaleZoomFactor: 1,
            highlightedMarkets: [],
            coloredBy: "",
            visiblePolicies: state.policies.slice(0, 3),
            data: [{}],
          }
        })
        break

      case "11":
        set((state) => {
          return {
            currentSlide,
            yScaleZoomFactor: 1,
            highlightedMarkets: [],
            coloredBy: "",
            visiblePolicies: state.policies,
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
  setInitialData: (data, policies, slides, colors) => {
    set((state) => {
      const maxScore = _max(data, (o) => o.score)
      const maxValue = _max(data.map((d) => d[state.currentDataKey] || 0))
      const domains = {
        x: [0, getNiceValue(maxScore?.score)],
        y: [0, getNiceValue(maxValue)],
      }
      const colorMap = {
        "developed markets": colors.cyan[400],
        "developing markets": colors.purple[600],
      }
      const unfilteredData = _sortBy(
        data
          .map((d) => ({ ...d, fill: colorMap[d.marketType] }))
          .filter((d) => d.hasInvestmentData),
        (o) => o.score
      )
      return {
        data: unfilteredData,
        unfilteredData,
        domains,
        policies,
      }
    })
  },

  policies: [],
  visiblePolicies: [],

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
