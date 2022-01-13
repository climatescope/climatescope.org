import { getServerData, getPages } from "@utils/api/server"
import getMarketCounts from "@utils/getMarketCounts"
import getSpotlightMarkets from "@utils/getSpotlightMarkets"

import SEO from "@components/SEO"
import IndexPage from "@components/pages/IndexPage"

export default function IndexPageWrapper({
  marketCounts,
  spotlightMarkets,
  globeInsights,
  allTools,
}) {
  const metaData = {
    indicatorCount: 163,
    marketCounts,
    countryCounts: marketCounts,
  }

  return (
    <>
      <SEO description="Which market is the most attractive for energy transition investment?" />
      <IndexPage
        globeInsights={globeInsights}
        spotlightMarkets={spotlightMarkets}
        metaData={metaData}
        allTools={allTools}
      />
    </>
  )
}

export async function getStaticProps() {
  const allTools = (await getPages("tools")) || []
  const resultsData = await getServerData(`public/data/results-2021.json`)
  const globeInsights = await getServerData(`/public/data/globe-insights.csv`)

  const marketCounts = getMarketCounts(resultsData)
  const spotlightMarkets = getSpotlightMarkets(resultsData)

  return {
    props: {
      marketCounts,
      spotlightMarkets,
      globeInsights,
      resultsData,
      allTools,
    },
  }
}
