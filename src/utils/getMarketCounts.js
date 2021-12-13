export default function getMarketCounts(countriesData) {
  return {
    total: countriesData.length,
    power: countriesData.filter((d) => d.sectors[0].data[0].value).length,
    transport: countriesData.filter((d) => d.sectors[1].data[0].value).length,
    buildings: countriesData.filter((d) => d.sectors[2].data[0].value).length,

    emerging: {
      total: countriesData.filter((d) => d.marketGrouping === "emerging")
        .length,
      power: countriesData.filter(
        (d) => d.marketGrouping === "emerging" && d.sectors[0].data[0].value
      ).length,
      transport: countriesData.filter(
        (d) => d.marketGrouping === "emerging" && d.sectors[1].data[0].value
      ).length,
      buildings: countriesData.filter(
        (d) => d.marketGrouping === "emerging" && d.sectors[2].data[0].value
      ).length,
    },
  }
}
