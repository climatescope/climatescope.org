import { getPages } from "@utils/api/server"
import SEO from "@components/SEO"
import ThemesPage from "@components/pages/ThemesPage"

export default function ThemesPageWrapper({ allThemes }) {
  return (
    <>
      <SEO
        title="Themes"
        description="The energy transition investment gap is growing, despite COP26 pledges"
      />
      <ThemesPage themes={allThemes} />
    </>
  )
}

export async function getStaticProps() {
  const allThemes = (await getPages("themes")) || []
  return { props: { allThemes } }
}
