import { Heading, Text, Box } from "@chakra-ui/react"

import getPage from "@/utils/api/server/getPage"
import getPages from "@/utils/api/server/getPages"
import getContent from "@/utils/api/server/getContent"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import SEO from "@/components/SEO"
import ETSTool from "@/components/ETSTool"
import RankOverTimeTool from "@/components/RankOverTimeTool"

export default function ToolPage({ source, data }) {
  const { frontmatter } = source
  const toolSlug = frontmatter.slug.split("/").slice(-1)[0]

  return (
    <>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <Box minH="100vh">
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/tools">{"Tools"}</PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          <PageHeaderContent>
            <Heading fontSize="5xl">{frontmatter.title}</Heading>
            <Text fontSize="2xl" color="gray.500">
              {frontmatter.description}
            </Text>
          </PageHeaderContent>
        </PageHeader>
        {/* {toolSlug === "energy-capacity-generation-in-emerging-markets" && (
        <CapGenTool />
      )} */}
        {/* {toolSlug === "geography-comparison" && <GeographyComparison />} */}
        {toolSlug === "progress-tracker-fundamentals-investments" && (
          <ETSTool />
        )}
        {toolSlug === "rank-over-time" && <RankOverTimeTool data={data} />}
      </Box>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const source = await getPage({ pageType: "tools", slug: `/tools/${slug}` })
  const results = await getContent("results.txt", "json")
  const data = {
    "rank-over-time": results,
  }
  return { props: { source, data: data[slug] || null } }
}

export async function getStaticPaths() {
  const tools = await getPages({
    pageType: "tools",
    fields: ["slug", "publish"],
    filter: (d) => d.publish,
  })

  return {
    paths: tools.map((d) => ({ params: { slug: d.slug.split("/").pop() } })),
    fallback: false,
  }
}