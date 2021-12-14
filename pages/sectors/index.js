import { getPages, getServerData } from "@utils/api/server"
import SEO from "@components/SEO"

import getMarketCounts from "@utils/getMarketCounts"
import SectorsPage from "@components/pages/SectorsPage"

export default function SectorsPageWrapper({ sectors, marketCounts }) {
  return (
    <>
      <SEO
        title="Sectors"
        description="The energy transition investment gap is growing, despite COP26 pledges"
      />
      <SectorsPage sectors={sectors} marketCounts={marketCounts} />
    </>
  )
}

export async function getStaticProps() {
  const sectors = (await getPages("sectors")) || []
  const marketsData = await getServerData(`public/data/results-2021.json`)
  const marketCounts = getMarketCounts(marketsData)
  return { props: { sectors, marketCounts } }
}
