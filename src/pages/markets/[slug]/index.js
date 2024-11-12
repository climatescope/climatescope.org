import { readFile } from "fs/promises"
import { join } from "path"
import { MDXRemote } from "next-mdx-remote"
import { Container, SimpleGrid } from "@chakra-ui/react"

import getPage from "@/utils/api/server/getPage"
import getPages from "@/utils/api/server/getPages"
// import getDataset from "@/utils/api/server/getDataset"
import getContent from "@/utils/api/server/getContent"
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
  const source = await getPage({
    pageType: "markets",
    slug: `/markets/${slug}`,
  })

  const allResults = await getContent("results.txt", "json")

  const capGen = await getContent("capacity-generation.txt", "json")
    .then((d) => d.filter((dd) => dd.iso === source?.frontmatter?.iso))
    .then((res) =>
      res.map(({ iso, market, measure, sector, subsector, units, ...rest }) => {
        const data = Object.entries(rest)
          .filter((dd) => dd[0].startsWith("val_"))
          .map((d) => ({
            x_val: parseInt(d[0].split("val_").join("")),
            y_val: d[1] ? parseFloat(d[1]) : "",
          }))
        return { iso, market, measure, sector, subsector, units, data }
      })
    )

  const etfData = await getContent("etf-data.txt", "json").then((d) =>
    d.find((dd) => dd.iso === source?.frontmatter?.iso)
  )

  const investment =
    (await getContent("investment-2024.txt", "json").then((d) =>
      d.find((dd) => dd.iso.toLowerCase() === source?.frontmatter?.iso)
    )) || null

  const policies = await getContent("policies-2024.txt", "json").then((d) =>
    d.filter((dd) => dd.iso.toLowerCase() === source?.frontmatter?.iso)
  )

  const indicators = await getContent("indicators-2024.txt", "json").then((d) =>
    d.filter((dd) => dd.iso.toLowerCase() === source?.frontmatter?.iso)
  )

  const relevantResults = allResults.find(
    (s) => s.iso === source?.frontmatter?.iso
  )

  const regionalPowerScoreData = allResults
    .map((result) => {
      const regionalPowerScore =
        result.score.find((s) => s.year === 2024)?.global?.value || {}
      return {
        iso: result.iso,
        market: result.market,
        region_id: result.region.id,
        regionalPowerScore,
      }
    })
    .filter((d) => d.region_id === source.frontmatter.region.id)

  const electricityPrices = await getContent(
    "electricity-prices-2024.txt",
    "json"
  ).then((d) =>
    d.filter((dd) => dd.iso.toLowerCase() === source?.frontmatter?.iso)
  )

  const geos = await readFile(
    join(process.env.PWD, "public", "data", "bbox.json"),
    "utf8"
  ).then((res) => JSON.parse(res))

  const bbox = geos.find((s) => s.iso === source?.frontmatter?.iso)?.bbox || []

  return {
    props: {
      slug,
      source,
      relevantResults,
      capGen,
      etfData,
      investment,
      policies,
      indicators,
      regionalPowerScoreData,
      marketCount: allResults.length,
      electricityPrices,
      bbox,
    },
  }
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
