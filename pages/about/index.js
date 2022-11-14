import { getPages } from "@utils/api/server"
import SEO from "@components/SEO"
import AboutLandingPage from "@components/pages/AboutLandingPage"

export default function AboutPage({ allPages }) {
  return (
    <>
      <SEO
        title="About"
        description="Climatescope is an online market assessment tool, report and index that evaluates the relative readiness of individual nations to put energy transition investment to work effectively. It provides snapshots of current clean energy policy and finance conditions that can lead to future capital deployment and project development."
      />
      <AboutLandingPage allPages={allPages} />
    </>
  )
}

export async function getStaticProps() {
  const allPages = (await getPages("about")) || []
  return { props: { allPages } }
}
