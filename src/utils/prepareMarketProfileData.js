import { readFile } from "fs/promises"
import { join } from "path"

import getPage from "./api/server/getPage.js"
import getContent from "./api/server/getContent.js"

export default async function prepareMarketProfileData(slug) {
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

  const marketCount = allResults.length

  return {
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
  }
}
