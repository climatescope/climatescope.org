import { getPages } from "@utils/api/server"

import SEO from "@components/SEO"

const ToolsPage = ({ allTools }) => {
  return (
    <>
      <SEO title="Tools" />
      {"Tools"}
    </>
  )
}

export async function getStaticProps() {
  const allTools = (await getPages("tools")) || []
  return { props: { allTools } }
}

export default ToolsPage
