
export default function createSummary(market) {
  const withThe = ["gb", "ph", "us", "ae", "do", "ps", "cf", "nl"]
  const { score, name, iso, marketGrouping, marketGroupingScore } = market
  return `With a cumulative score of ${score.data[0].value.toLocaleString(
    "en-US",
    { maximumFractionDigits: 2 }
  )}, ${withThe.includes(iso) ? "the " : ""}${name} ranks number ${
    marketGroupingScore.data[0].rank
  } among ${marketGrouping} markets and number ${
    score.data[0].rank
  } in the global ranking.`
}
