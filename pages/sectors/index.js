import { getPages, getServerData } from "@utils/api/server"
import SEO from "@components/SEO"

import getMarketCounts from "@utils/getMarketCounts"

export default function SectorsPageWrapper({ sectors, counts }) {
  return (
    <>
      <SEO title="Sectors" />
      {"Sectors"}
    </>
  )
}

export async function getStaticProps() {
  const sectors = (await getPages("sectors")) || []
  const marketsData = await getServerData(`public/data/results-2021.json`)
  const counts = getMarketCounts(marketsData)
  return { props: { sectors, counts } }
}
