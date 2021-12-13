import { getPages } from "@utils/api/server"
import SEO from "@components/SEO"

export default function ThemesPageWrapper({ allThemes }) {
  return (
    <>
      <SEO title="Themes" />
      {"Themes"}
    </>
  )
}

export async function getStaticProps() {
  const allThemes = (await getPages("themes")) || []
  return { props: { allThemes } }
}
