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
        description="Climatescope is BNEF's annual assessment of energy transition opportunities, covering the power, transport and buildings sectors across 136 countries. The project's 11th edition adds a new element by highlighting the top 10 markets for investment, capacity additions and policies."
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
