import { getPathsFromDirectory } from "@utils/api/server"
import SEO from "@components/SEO"
import HighlightsPage from "@components/pages/HighlightsPage"

export default function HighlightsPageWrapper({ miniRankingsPaths }) {
  return (
    <>
      <SEO title="Highlights" />
      <HighlightsPage miniRankingsPaths={miniRankingsPaths} />
    </>
  )
}

export async function getStaticProps() {
  const miniRankingsPaths = await getPathsFromDirectory(
    `/public/data/mini-rankings`,
    ".csv"
  )
  return { props: { miniRankingsPaths } }
}
