import groupBy from "lodash/groupBy"
import sortBy from "lodash/sortBy"

import { getPathsFromDirectory } from "@utils/api/server"
import SEO from "@components/SEO"
import HighlightsPage from "@components/pages/HighlightsPage"

export default function HighlightsPageWrapper({ miniRankingsPaths }) {
  return (
    <>
      <SEO
        title="Highlights"
        description="Climatescope is BNEF's annual assessment of energy transition opportunities, covering the power, transport and buildings sectors across 136 countries. The project's 11th edition adds a new element by highlighting the top 10 markets for investment, capacity additions and policies."
      />
      <HighlightsPage miniRankingsPaths={miniRankingsPaths} />
    </>
  )
}

export async function getStaticProps() {
  const data = await getPathsFromDirectory(`/public/data/mini-rankings`, ".csv")

  const miniRankingsPaths = Object.entries(
    groupBy(data, (o) => o.split("__")[0])
  ).reduce((acc, [key, values]) => {
    acc[key] = sortBy(values, (s) => parseInt(s.split("__")[1]))
    return acc
  }, {})

  return { props: { miniRankingsPaths } }
}
