import { getServerData, getAllMDXPages } from "@utils/api/server"

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
  const allTools = await getAllMDXPages("tools", { sortBy: "order" })

  const globeInsights = await getServerData(`/public/data/globe-insights.csv`)
  const miniGlobesDataRaw = await getServerData(
    `/public/data/share_of_renewable_energy_installed_capacity_by_region.csv`
  )

  const marketCounts = {
    total: 140,
    power: 140,
    transport: 140,
    buildings: 29,
    emerging: {
      total: 0,
      power: 0,
      transport: 0,
      buildings: 0,
    },
  }

  const miniGlobesData = miniGlobesDataRaw.map((d) => {
    const { region, unit, ...allYears } = d
    return {
      region,
      unit,
      values: Object.entries(allYears).reduce((acc, cur) => {
        acc[cur[0]] = Math.round(cur[1] * 10) / 10
        return acc
      }, {}),
    }
  })

  return {
    props: {
      marketCounts,
      globeInsights,
      allTools,
      miniGlobesData,
    },
  }
}
