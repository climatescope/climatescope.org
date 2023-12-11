import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"

import SEO from "@components/SEO"
import ToolsLandingPage from "@components/pages/ToolsLandingPage"

export default function ToolsPage({ allTools }) {
  return (
    <>
      <SEO title="Tools" />
      <ToolsLandingPage allTools={allTools} />
    </>
  )
}

export async function getStaticProps() {
  const allToolNames = await getAllMDXSlugs("tools")
  const allTools = await Promise.all(
    allToolNames.map((n) => {
      return getMDXPage("tools", n)
    })
  ).then((d) => {
    return d.map((dd, i) => ({ ...dd.frontmatter, slug: allToolNames[i] }))
  })
  return {
    props: { allTools },
  }
}
