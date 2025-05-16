import { Heading, Text, Box } from "@chakra-ui/react"
import dynamic from "next/dynamic"

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

const ETSTool = dynamic(() => import("../../../components/ETSTool"), {
  ssr: false,
})

const CapGenTool = dynamic(() => import("../../../components/CapGenTool"), {
  ssr: false,
})

const RankOverTimeTool = dynamic(
  () => import("../../../components/RankOverTimeTool"),
  {
    ssr: false,
  }
)

const GeographyComparison = dynamic(
  () => import("../../../components/GeographyComparison"),
  {
    ssr: false,
  }
)

export default function ToolPage({ source, data }) {
  const { frontmatter } = source
  const toolSlug = frontmatter.slug.split("/").slice(-1)[0]

  const hideHeader = [
    "energy-capacity-generation-in-emerging-markets",
  ].includes(toolSlug)

  return (
    <>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <Box minH="100vh">
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/tools">{"Tools"}</PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          {!hideHeader && (
            <PageHeaderContent>
              <Heading fontSize="5xl">{frontmatter.title}</Heading>
              <Text fontSize="2xl" color="gray.500">
                {frontmatter.description}
              </Text>
            </PageHeaderContent>
          )}
        </PageHeader>
        {toolSlug === "energy-capacity-generation-in-emerging-markets" && (
          <CapGenTool />
        )}
        {toolSlug === "geography-comparison" && (
          <GeographyComparison data={data} />
        )}
        {[
          "progress-tracker-fundamentals-investments",
          "market-progress-tracker",
        ].includes(toolSlug) && <ETSTool />}
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
    "geography-comparison": results
      .filter((d) => d.iso !== "ru")
      .map(({ iso, market, tradebloc, region }) => {
        return { val: iso, label: market, tradebloc, region }
      }),
  }
  return { props: { source, data: data[slug] || null } }
}

export async function getStaticPaths() {
  const tools = await getPages({
    pageType: "tools",
    fields: ["slug", "publish"],
    // filter: (d) => d.publish,
  })

  return {
    paths: tools.map((d) => ({ params: { slug: d.slug.split("/").pop() } })),
    fallback: false,
  }
}
