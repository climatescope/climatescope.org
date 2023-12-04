// import groupBy from "lodash/groupBy"
// import sortBy from "lodash/sortBy"

import { getServerData } from "@utils/api/server"
import { useClientData } from "@utils/api/client"

import SEO from "@components/SEO"
import HighlightsPage from "@components/pages/HighlightsPage"

export default function HighlightsPageWrapper({ slides }) {
  const dataQuery = useClientData("/data/investment_score_chart_data.json")
  const policies = useClientData("/data/highlightsPolicies.json")
  return (
    <>
      <SEO
        title="Highlights"
        description="Climatescope is BNEF’s annual assessment of energy transition opportunities around the world. Now in its 12th year, the project surveys the power, transport and buildings sectors in 140 developing and developed markets. The 2023 edition also boasts a new deep dive into in the correlation between effective policy mechanisms and renewable energy investment."
      />
      <HighlightsPage
        data={dataQuery.data}
        policies={policies.data}
        slides={slides}
      />
    </>
  )
}

export async function getStaticProps() {
  const slides = await getServerData("/public/highlights-slides.csv")
  return { props: { slides } }
}
