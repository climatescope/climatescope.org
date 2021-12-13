export default function getSpotlightMarkets(resultsData) {
  return {
    power: ["VN", "ZA", "NG", "CL", "BR"].map((id) => {
      const { iso, name, sectors } = resultsData.find(
        (s) => s.iso === id.toLowerCase()
      )
      return { iso, name, sector: sectors[0].name, score: sectors[0].data[0] }
    }),
    transport: ["CO", "RO", "UY", "CR"].map((id) => {
      const { iso, name, sectors } = resultsData.find(
        (s) => s.iso === id.toLowerCase()
      )
      return { iso, name, sector: sectors[1].name, score: sectors[1].data[0] }
    }),
    buildings: ["CN", "BG", "HR", "AM"].map((id) => {
      const { iso, name, sectors } = resultsData.find(
        (s) => s.iso === id.toLowerCase()
      )
      return { iso, name, sector: sectors[2].name, score: sectors[2].data[0] }
    }),
  }
}
