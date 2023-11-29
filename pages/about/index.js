import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"
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
  const allPageNames = await getAllMDXSlugs("about")
  const allPages = await Promise.all(
    allPageNames.map((n) => {
      return getMDXPage("about", n)
    })
  ).then((d) => {
    return d.map((dd, i) => ({ ...dd.frontmatter, slug: allPageNames[i] }))
  })

  return { props: { allPages } }
}
