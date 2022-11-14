import create from "zustand"
import getConfig from "next/config"
import { extent } from "d3-array"

import { fetchers } from "@utils/api/client"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

function determineDomains(domains, markets) {
  const allIndicators = markets
    .filter((d) => d.indicators)
    .flatMap((d) =>
      d.indicators
        .filter((dd) => dd.domain)
        .map((dd) => ({ indicator: dd.indicator, ...dd.domain }))
    )

  return domains.map((domain) => {
    const relevant = allIndicators.filter(
      (d) => d.indicator === domain.indicator
    )
    const x = extent(relevant.flatMap((d) => d.x))
    const y = extent(relevant.flatMap((d) => d.y))
    return { ...domain, x, y: [Math.min(0, Math.floor(y[0])), Math.ceil(y[1])] }
  })
}

const useStore = create((set, get) => ({
  currentMarket: {},
  setCurrentMarket: async (iso = "nl") => {
    const currentIso = get().currentMarket.iso
    if (currentIso === iso) return
    const currentMarket = await fetchers.json()(
      `${basePath}/data/markets/${iso}.json`
    )

    const domains = determineDomains(get().domains, [
      currentMarket,
      ...get().comparisonMarkets,
    ])

    set({ currentMarket, domains })
  },

  comparisonMarkets: [{}, {}],
  setComparisonMarkets: async (iso, slot = 0) => {
    if (!iso) {
      set((state) => {
        const comparisonMarkets = state.comparisonMarkets.reduce(
          (acc, cur, i) => {
            if (i === slot) return [...acc, {}]
            else return [...acc, cur]
          },
          []
        )
        const domains = determineDomains(get().domains, [
          get().currentMarket,
          ...comparisonMarkets,
        ])
        return { comparisonMarkets, domains }
      })
      return
    }

    const comparisonMarket = await fetchers.json()(
      `${basePath}/data/markets/${iso}.json`
    )

    set((state) => {
      const comparisonMarkets = state.comparisonMarkets.reduce(
        (acc, cur, i) => {
          if (i === slot) return [...acc, comparisonMarket]
          return i === slot
            ? comparisonMarket
              ? [...acc, comparisonMarket]
              : acc
            : [...acc, cur]
        },
        []
      )

      const domains = determineDomains(get().domains, [
        get().currentMarket,
        ...comparisonMarkets,
      ])

      return { comparisonMarkets, domains }
    })
  },

  domains: [
    {
      indicator: "Electricity Prices",
      x: [0, 0],
      y: [0, 0],
    },
    {
      indicator: "Installed Capacity",
      x: [0, 0],
      y: [0, 0],
    },
    {
      indicator: "Electricity Generation",
      x: [0, 0],
      y: [0, 0],
    },
    {
      indicator: "Investment Clean energy",
      x: [0, 0],
      y: [0, 0],
    },
  ],
}))

export default useStore
