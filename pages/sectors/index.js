import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"
import SEO from "@components/SEO"
import SectorsPage from "@components/pages/SectorsPage"

export default function SectorsPageWrapper({
  marketCounts,
  allSectors,
  indicators,
}) {
  return (
    <>
      <SEO
        title="Sectors"
        description="The energy transition investment gap is growing, despite COP26 pledges"
      />
      <SectorsPage
        sectors={allSectors}
        marketCounts={marketCounts}
        indicators={indicators}
      />
    </>
  )
}

export async function getStaticProps() {
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