import { create } from "zustand"
import { extent } from "d3-array"
import _sumBy from "lodash/sumBy"

export const useGeographyComparisonStore = create((set, get) => ({
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  selectedGeographies: [],
  setSelectedGeographies: (geo, slot) => {
    set((state) => {
      const selectedGeographies = [null, null, null]
        .map((d, i) => (i === slot ? geo : state.selectedGeographies[i] || d))
        .filter((d) => !!d)
        .map((data) => {
          data.chartData = {
            utilityPrivatisation: data.indicators.find(
              (d) => d.indicator === "Utility privatisation"
            ),
            electricityPrices: getPricesData(data.electricityPrices),
            capacity: getCapacityData(data.capGen),
            generation: getGenerationData(data.capGen),
            investment: getInvestmentData(data.investment),
          }
          return data
        })

      return { selectedGeographies: fixDomains(selectedGeographies) }
    })
  },
  geographies: [],
  setInitialData: (data, initialMarket) => {
    if (get().isLoaded) return null
    const selectedGeographies = [
      {
        ...initialMarket,
        val: initialMarket.relevantResults.iso,
        label: initialMarket.relevantResults.market,
        chartData: {
          utilityPrivatisation: initialMarket.indicators.find(
            (d) => d.indicator === "Utility privatisation"
          ),
          electricityPrices: getPricesData(initialMarket.electricityPrices),
          capacity: getCapacityData(initialMarket.capGen),
          generation: getGenerationData(initialMarket.capGen),
          investment: getInvestmentData(initialMarket.investment),
        },
      },
    ]
    set({
      isLoaded: true,
      geographies: data,
      selectedGeographies: fixDomains(selectedGeographies),
    })
  },
}))

/**
 * Helpers
 *
 */

function fixDomains(selectedGeographies) {
  const electricityPricesDomain = {
    x: extent(
      selectedGeographies.flatMap(
        (d) => d.chartData.electricityPrices?.domain.x
      )
    ),
    y: extent(
      selectedGeographies.flatMap(
        (d) => d.chartData.electricityPrices?.domain.y
      )
    ),
  }
  const capacityDomain = {
    x: extent(
      selectedGeographies.flatMap((d) => d.chartData.capacity?.domain.x)
    ),
    y: extent(
      selectedGeographies.flatMap((d) => d.chartData.capacity?.domain.y)
    ),
  }
  const generationDomain = {
    x: extent(
      selectedGeographies.flatMap((d) => d.chartData.generation?.domain.x)
    ),
    y: extent(
      selectedGeographies.flatMap((d) => d.chartData.generation?.domain.y)
    ),
  }
  const investmentDomain = {
    x: extent(
      selectedGeographies.flatMap((d) => d.chartData.investment?.domain.x)
    ),
    y: extent(
      selectedGeographies.flatMap((d) => d.chartData.investment?.domain.y)
    ),
  }

  return selectedGeographies.map((d) => {
    if (d.chartData.electricityPrices) {
      d.chartData.electricityPrices.domainX = electricityPricesDomain.x
      d.chartData.electricityPrices.domainY = electricityPricesDomain.y
    }
    if (d.chartData.capacity) {
      d.chartData.capacity.domainX = capacityDomain.x
      d.chartData.capacity.domainY = capacityDomain.y
    }
    if (d.chartData.generation) {
      d.chartData.generation.domainX = generationDomain.x
      d.chartData.generation.domainY = generationDomain.y
    }
    if (d.chartData.investment) {
      d.chartData.investment.domainX = investmentDomain.x
      d.chartData.investment.domainY = investmentDomain.y
    }
    return d
  })
}

function getPricesData(prices) {
  if (!prices?.length) return null

  const subindicators = prices.map((d) => ({
    ...d,
    data: d.data.map((dd) => ({
      year: dd.x_val,
      value: dd.y_val,
    })),
    domain: {
      x: extent(d.data, (o) => parseFloat(o.x_val) || 0),
      y: extent(d.data, (o) => parseFloat(o.y_val) || 0),
    },
  }))

  return {
    indicator: `Electricity prices`,
    subindicators,
    domain: {
      x: extent(subindicators.flatMap((d) => d.domain.x)),
      y: extent(subindicators.flatMap((d) => d.domain.y)),
    },
  }
}

function getCapacityData(capGen) {
  if (!capGen?.length) return null

  const subindicators = capGen
    .filter((d) => d.measure === "installed capacity")
    .map((d) => ({
      subindicator: d.subsector,
      units: d.units,
      data: d.data.map((dd) => ({
        year: dd.x_val,
        value: dd.y_val,
      })),
      domain: {
        x: extent(d.data, (o) => parseFloat(o.x_val) || 0),
        y: extent(d.data, (o) => parseFloat(o.y_val) || 0),
      },
    }))

  return {
    indicator: "Installed capacity",
    subindicators,
    domain: {
      x: extent(subindicators.flatMap((d) => d.domain.x)),
      y: extent(
        subindicators.reduce(
          (acc, cur) => cur.data.map((d, i) => d.value + (acc[i] || 0)),
          []
        )
      ),
    },
  }
}

function getGenerationData(capGen) {
  if (!capGen?.length) return null

  const subindicators = capGen
    .filter((d) => d.measure === "electricity generation")
    .map((d) => ({
      subindicator: d.subsector,
      units: d.units,
      data: d.data.map((dd) => ({
        year: dd.x_val,
        value: dd.y_val,
      })),
      domain: {
        x: extent(d.data, (o) => parseFloat(o.x_val) || 0),
        y: extent(d.data, (o) => parseFloat(o.y_val) || 0),
      },
    }))

  return {
    indicator: "Electricity generation",
    subindicators,
    domain: {
      x: extent(subindicators.flatMap((d) => d.domain.x)),
      y: extent(
        subindicators.reduce(
          (acc, cur) => cur.data.map((d, i) => d.value + (acc[i] || 0)),
          []
        )
      ),
    },
  }
}

function getInvestmentData(investment) {
  if (!investment) return null

  const subindicators = [
    {
      subindicator: investment.deal_type,
      units: investment.unit,
      data: investment.data.map((d) => ({
        year: d.x_val,
        value: d.y_val,
      })),
      domain: {
        x: extent(investment.data, (o) => parseFloat(o.x_val) || 0),
        y: extent(investment.data, (o) => parseFloat(o.y_val) || 0),
      },
    },
  ]

  return {
    indicator: `Investment`,
    subindicators,
    domain: {
      x: extent(subindicators.flatMap((d) => d.domain.x)),
      y: extent(subindicators.flatMap((d) => d.domain.y)),
    },
  }
}
