import { getPages } from "@utils/api/server"

import SEO from "@components/SEO"
import ToolsPage from "@components/pages/ToolsPage"

const ToolsPageWrapper = ({ allTools }) => {
  return (
    <>
      <SEO title="Tools" />
      <ToolsPage tools={allTools} />
    </>
  )
}

export async function getStaticProps() {
  const allTools = (await getPages("tools")) || []
  return { props: { allTools } }
}

export default ToolsPageWrapper
