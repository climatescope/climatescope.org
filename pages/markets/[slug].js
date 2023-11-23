import { getServerData } from "@utils/api/server"
import SEO from "@components/SEO"

// import getMarketCounts from "@utils/getMarketCounts"
import createMarketSummary from "@utils/createMarketSummary"
// import MarketPage from "@components/pages/MarketPage"
import MarketPage from "@components/pages/MarketPage"

export default function MarketPageWrapper({ market, marketCounts }) {
  const summary = createMarketSummary(market)
  if (!summary) return <div>{"Missing data..."}</div>
  return (
    <>
      <SEO title={market.name} description={summary} />
      <MarketPage summary={summary} market={market} />
      {/* <MarketPage
        market={market}
        summary={summary}
        marketCounts={marketCounts}
      /> */}
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const market = await getServerData(
    `/public/data/markets/${slug}.json`,
    {},
    true
  )
  const geos = await getServerData(`/public/data/geographies.json`)
  // const resultsData = await getServerData(`public/data/results-2022.json`)
  const resultsData = await getServerData(`public/data/results-2023.json`)
  // const marketCounts = getMarketCounts(resultsData)
  const marketCounts = {}
  const { bbox } = geos.find((s) => s.iso === market.iso) || { bbox: [] }
  return { props: { slug, market: { ...market, bbox }, marketCounts } }
}

export async function getStaticPaths() {
  const resultsData = await getServerData("/public/data/results-2022.json")
  return {
    paths: resultsData.map(({ iso }) => ({ params: { slug: iso } })),
    fallback: false,
  }
}
