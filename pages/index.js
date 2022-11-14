import {
  getServerData,
  getPages,
  getPathsFromDirectory,
} from "@utils/api/server"
import getMarketCounts from "@utils/getMarketCounts"

import SEO from "@components/SEO"
import IndexPage from "@components/pages/IndexPage"

export default function IndexPageWrapper({
  marketCounts,
  globeInsights,
  allTools,
  miniRankingsPaths,
  miniGlobesData,
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
        metaData={metaData}
        allTools={allTools}
        miniRankingsPaths={miniRankingsPaths}
        miniGlobesData={miniGlobesData}
      />
    </>
  )
}

export async function getStaticProps() {
  const allTools = (await getPages("tools")) || []
  const resultsData = await getServerData(`public/data/results-2022.json`)
  const globeInsights = await getServerData(`/public/data/globe-insights.csv`)
  const miniRankingsPaths = await getPathsFromDirectory(
    `/public/data/mini-rankings`,
    ".csv"
  )
  const miniGlobesData = await getServerData(
    `/public/data/share_of_renewable_energy_installed_capacity_by_region.csv`
  )

  const marketCounts = getMarketCounts(resultsData)

  return {
    props: {
      marketCounts,
      globeInsights,
      resultsData,
      allTools,
      miniRankingsPaths,
      miniGlobesData,
    },
  }
}
