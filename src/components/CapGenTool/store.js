import { create } from "zustand"
import _groupBy from "lodash/groupBy"
import _sumBy from "lodash/sumBy"
import _sortBy from "lodash/sortBy"
import _uniqBy from "lodash/uniqBy"

function filterDataset({
  capacity,
  generation,
  year,
  grouping,
  sectors,
  regions,
}) {
  const years = Object.keys(capacity[0])
    .filter((d) => d.startsWith("val_"))
    .map((d) => `${d.split("_")[1]}`.trim())
    .filter((d) => year.includes("all") || year.includes(d))

  const excludedSectors = ["Storage", "undefined"]

  const groupedCapacity = Object.entries(_groupBy(capacity, (o) => o[grouping]))
    .map(([key, items]) => {
      return { key, items }
    })
    .filter((d) => !excludedSectors.includes(d.key))

  const groupedGeneration = Object.entries(
    _groupBy(generation, (o) => o[grouping])
  )
    .map(([key, items]) => {
      return { key, items }
    })
    .filter((d) => !excludedSectors.includes(d.key))

  const capacitySummed = years.map((year) => {
    const data = _sortBy(
      groupedCapacity.map(({ key, items }) => {
        const filteredItems = items.filter((d) => {
          const hasSector = sectors?.length ? sectors.includes(d.sector) : true
          const hasRegion = regions?.length
            ? regions.includes(d.region_id)
            : true
          return hasSector && hasRegion
        })
        const value = _sumBy(
          filteredItems,
          (o) => parseFloat(o[`val_${year}`]) || 0
        )
        return { key, value }
      }),
      (o) => o.value
    )
    const total = { key: "Total", value: _sumBy(data, (o) => o.value) }
    return { year, data, total }
  })

  const generationSummed = years.map((year) => {
    const data = _sortBy(
      groupedGeneration.map(({ key, items }) => {
        const filteredItems = items.filter((d) => {
          const hasSector = sectors?.length ? sectors.includes(d.sector) : true
          const hasRegion = regions?.length
            ? regions.includes(d.region_id)
            : true
          return hasSector && hasRegion
        })
        const value = _sumBy(
          filteredItems,
          (o) => parseFloat(o[`val_${year}`]) || 0
        )
        return { key, value }
      }),
      (o) => o.value
    )
    const total = { key: "Total", value: _sumBy(data, (o) => o.value) }
    return { year, data, total }
  })

  return {
    capacity: capacitySummed,
    generation: generationSummed,
  }
}

export const useStore = create((set, get) => ({
  year: ["all"], // ["all"] | ["2010"] || ["2010", "2020"] ...

  setYear: (year) => {
    set((state) => ({
      year,
      filteredData: filterDataset({
        capacity: state.data.capacity,
        generation: state.data.generation,
        year,
        grouping: state.grouping,
        regions: state.regions,
        sectors: state.sectors,
      }),
    }))
  },

  grouping: "sector", // "sector" | "region" | "country"

  setGrouping: (grouping) => {
    set((state) => ({
      grouping,
      filteredData: filterDataset({
        capacity: state.data.capacity,
        generation: state.data.generation,
        year: state.year,
        grouping: grouping,
        regions: state.regions,
        sectors: state.sectors,
      }),
    }))
  },

  setInitialData: (dataRaw, geographies) => {
    const geos = geographies.reduce((acc, cur) => {
      acc[cur.iso2.toLowerCase()] = cur
      return acc
    }, {})

    const data = dataRaw.map((d) => {
      const { region_id, region_name } = geos[d.iso] || {}
      return { ...d, region_id, region_name }
    })

    const measures = ["installed capacity", "electricity generation"]

    const [capacity, generation] = measures.map((measure) =>
      data.filter((d) => d.measure === measure)
    )

    const filteredData = filterDataset({
      capacity,
      generation,
      year: get().year,
      grouping: get().grouping,
    })

    const allRegions = _uniqBy(
      data.map((d) => ({ key: d.region_id, label: d.region_name })),
      (o) => o.key
    )

    const allSectors = _uniqBy(
      data.map((d) => ({ key: d.sector, label: d.sector })),
      (o) => o.key
    )

    set({
      data: { capacity, generation },
      filteredData,
      allRegions,
      allSectors,
    })
  },

  view: "capgen", // "capgen" | "capacity" | "generation"

  setView: (view) => set({ view }),

  data: { capacity: [], generation: [] },
  filteredData: { capacity: [], generation: [] },

  regions: [],
  sectors: [],

  allSectors: [],
  allRegions: [],

  setPostFilters: ({ regions, sectors }) => {
    set((state) => {
      const filteredData = filterDataset({
        capacity: state.data.capacity,
        generation: state.data.generation,
        year: state.year,
        grouping: state.grouping,
        regions: regions || state.regions,
        sectors: sectors || state.sectors,
      })
      return {
        regions: regions || state.regions,
        sectors: sectors || state.sectors,
        filteredData,
      }
    })
  },
}))
