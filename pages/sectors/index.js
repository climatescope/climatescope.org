import { getServerData, getAllMDXSlugs, getMDXPage } from "@utils/api/server"
import getMarketCounts from "@utils/getMarketCounts"
import SEO from "@components/SEO"
import SectorsPage from "@components/pages/SectorsPage"

export default function SectorsPageWrapper({ marketCounts, allSectors, indicators }) {
  return (
    <>
      <SEO
        title="Sectors"
        description="The energy transition investment gap is growing, despite COP26 pledges"
      />
      <SectorsPage sectors={allSectors} marketCounts={marketCounts} indicators={indicators} />
    </>
  )
}

export async function getStaticProps() {
  const marketsData = await getServerData(`public/data/results-2022.json`)
  const marketCounts = getMarketCounts(marketsData)

  const allSectorNames = await getAllMDXSlugs("sectors")
  const allSectors = await Promise.all(
    allSectorNames.map((sectorName) => {
      return getMDXPage("sectors", sectorName)
    })
  ).then((d) => {
    return d.map((dd, i) => {
      return { ...dd.frontmatter, slug: allSectorNames[i] }
    })
  })

  return { props: { marketCounts, allSectors } }
}
