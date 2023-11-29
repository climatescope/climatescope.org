import { getServerData, getAllMDXSlugs, getMDXPage } from "@utils/api/server"
// import getMarketCounts from "@utils/getMarketCounts"

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
  const allToolNames = (await getAllMDXSlugs("tools")) || []
  const allTools = await Promise.all(
    allToolNames.map((n) => {
      return getMDXPage("tools", n)
    })
  ).then((d) =>
    d.map((dd, i) => ({
      ...dd.frontmatter,
      slug: allToolNames[i] || "",
    }))
  )

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
    return {
      region: d.region,
      unit: d.unit,
      value: Math.round(d["2022"] * 10) / 10,
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
