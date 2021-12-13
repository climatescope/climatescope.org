import { getServerData } from "@utils/api/server"
import getMarketCounts from "@utils/getMarketCounts"
import getSpotlightMarkets from "@utils/getSpotlightMarkets"

import SEO from "@components/SEO"
import IndexPage from "@components/pages/IndexPage"

export default function IndexPageWrapper({
  marketCounts,
  spotlightMarkets,
  globeInsights,
}) {
  const metaData = {
    indicatorCount: 163,
    marketCounts,
    countryCounts: marketCounts,
  }

  return (
    <>
      <SEO />
      <IndexPage
        globeInsights={globeInsights}
        countriesSpotlight={spotlightMarkets}
        metaData={metaData}
      />
    </>
  )
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
