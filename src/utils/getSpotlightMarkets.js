function prepareMarketsForSector(markets, sectorIndex) {
  return markets
    .filter((d) => d.sectors[sectorIndex].data[0].value)
    .sort(
      (a, b) =>
        b.sectors[sectorIndex].data[0].value -
        a.sectors[sectorIndex].data[0].value
    )
    .map((d, i) => ({
      finalRank: i + 1,
      finalScore: d.sectors[sectorIndex].data[0].value,
      iso: d.iso,
      name: d.name,
      marketGrouping: d.marketGrouping,
    }))
}

function prepareSpotlightMarket(id, markets, sectorName) {
  const { iso, finalRank, finalScore, name } = markets[
    sectorName.toLowerCase()
  ].find((s) => s.iso === id.toLowerCase())
  return { iso, name, sector: sectorName, score: finalScore, rank: finalRank }
}

export default function getSpotlightMarkets(resultsData) {
  const emergingMarkets = resultsData.filter(
    (d) => d.marketGrouping === "emerging"
  )

  const sortedEmergingMarketsBySector = {
    power: prepareMarketsForSector(emergingMarkets, 0),
    transport: prepareMarketsForSector(emergingMarkets, 1),
    buildings: prepareMarketsForSector(emergingMarkets, 2),
  }

  return {
    power: ["VN", "ZA", "NG", "CL", "BR"].map((id) => {
      return prepareSpotlightMarket(id, sortedEmergingMarketsBySector, "Power")
    }),
    transport: ["CO", "RO", "UY", "CR"].map((id) => {
      return prepareSpotlightMarket(
        id,
        sortedEmergingMarketsBySector,
        "Transport"
      )
    }),
    buildings: ["CN", "BG", "HR", "AM"].map((id) => {
      return prepareSpotlightMarket(
        id,
        sortedEmergingMarketsBySector,
        "Buildings"
      )
    }),
  }
}
