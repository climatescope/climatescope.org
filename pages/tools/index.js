import { getAllMDXPages } from "@utils/api/server"

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
  const allTools = await getAllMDXPages("tools")
  return { props: { allTools } }
}
