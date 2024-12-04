import { MDXRemote } from "next-mdx-remote"
import { Container, SimpleGrid } from "@chakra-ui/react"

import getPages from "@/utils/api/server/getPages"
// import getDataset from "@/utils/api/server/getDataset"
import getContent from "@/utils/api/server/getContent"
import prepareMarketProfileData from "@/utils/prepareMarketProfileData"
import SEO from "@/components/SEO"

import { MarketProvider } from "@/utils/MarketContext"
import marketMDXComponents from "@/components/MDXComponents"
import MarketHeader from "@/components/MarketHeader"

export default function MarketPage({
  slug,
  source,
  relevantResults,
  capGen,
  etfData,
  investment,
  policies,
  indicators,
  regionalPowerScoreData,
  marketCount,
  electricityPrices,
  bbox,
}) {
  return (
    <>
      <SEO title={source.frontmatter.market} />
      <div>
        <Container>
          <MarketHeader
            frontmatter={source.frontmatter}
            data={relevantResults}
            marketCount={marketCount}
            bbox={bbox}
          />
          <MarketProvider
            value={{
              slug,
              frontmatter: source.frontmatter || {},
              data: {
                ...relevantResults,
                capGen,
                etfData,
                investment,
                policies,
                indicators,
                marketCount,
                regionalPowerScoreData,
                electricityPrices,
              },
            }}
          >
            <SimpleGrid
              columns={8}
              gridColumnGap={10}
              gridRowGap={8}
              pt={20}
              pb={40}
            >
              <MDXRemote {...source} components={marketMDXComponents} />
            </SimpleGrid>
          </MarketProvider>
        </Container>
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const props = await prepareMarketProfileData(slug)
  return { props }
}

export async function getStaticPaths() {
  const allPages = await getPages({
    pageType: "markets",
    fields: ["slug", "iso"],
  })
  const allResults = await getContent("results.txt", "json")
  const paths = allResults
    .filter((d) => d.score.find((s) => s.year === 2024))
    .map((d) => allPages.find((s) => s.iso === d.iso))
  return {
    paths: paths.map(({ slug }) => ({
      params: { slug: slug.split("/").pop() },
    })),
    fallback: false,
  }
}
