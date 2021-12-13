import { getPages } from "@utils/api/server"
import SEO from "@components/SEO"
import AboutLandingPage from "@components/pages/AboutLandingPage"

export default function AboutPage({ allPages }) {
  return (
    <>
      <SEO title="About" />
      <AboutLandingPage allPages={allPages} />
    </>
  )
}

export async function getStaticProps() {
  const allPages = (await getPages("about")) || []
  return { props: { allPages } }
}
