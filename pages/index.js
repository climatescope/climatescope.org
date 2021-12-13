import { Heading } from "@chakra-ui/react"
import { getServerData } from "@utils/api/server"
import getMarketCounts from "@utils/getMarketCounts"
import getSpotlightMarkets from "@utils/getSpotlightMarkets"

export default function IndexPage({
  marketCounts,
  spotlightMarkets,
  globeInsights,
}) {
  const metaData = {
    indicatorCount: 163,
    marketCounts,
  }

  return <Heading variant="pageTitle">{"Hello, Climatescope 2021!"}</Heading>
}

export async function getStaticProps() {
  const resultsData = await getServerData(`public/data/results-2021.json`)
  const globeInsights = await getServerData(`/public/data/globe-insights.csv`)

  const marketCounts = getMarketCounts(resultsData)
  const spotlightMarkets = getSpotlightMarkets(resultsData)

  return {
    props: {
      marketCounts,
      spotlightMarkets,
      globeInsights,
    },
  }
}
