import { getPages } from "@utils/api/server"
import SEO from "@components/SEO"
import AboutLandingPage from "@components/pages/AboutLandingPage"

export default function AboutPage({ allPages }) {
  return (
    <>
      <SEO
        title="About"
        description="2021 marks the tenth year of Climatescope. The project has expanded to new markets and sectors."
      />
      <AboutLandingPage allPages={allPages} />
    </>
  )
}

export async function getStaticProps() {
  const allPages = (await getPages("about")) || []
  return { props: { allPages } }
}
