import { writeFile, mkdir, rm } from "fs/promises"
import { join } from "path"

import getPages from "../src/utils/api/server/getPages.js"
import getContent from "../src/utils/api/server/getContent.js"
import prepareMarketProfileData from "../src/utils/prepareMarketProfileData.js"

function convertToBuffer(content) {
  return Buffer.from(content).toString("base64")
}

const allPages = await getPages({
  pageType: "markets",
  fields: ["slug", "iso"],
})

const allResults = await getContent("results.txt", "json")

const paths = allResults
  .filter((d) => d.score.find((s) => s.year === 2024))
  .map((d) => allPages.find((s) => s.iso === d.iso))
  .map(({ slug }) => slug.split("/").pop())

await rm(join(process.env.PWD, "public", "data", "markets"), {
  recursive: true,
  force: true,
})

await mkdir(join(process.env.PWD, "public", "data", "markets"))

await Promise.all(
  paths.map(async (slug) => {
    const { source, ...marketData } = await prepareMarketProfileData(slug)
    return writeFile(
      join(
        process.env.PWD,
        "public",
        "data",
        "markets",
        marketData.relevantResults.iso + ".txt"
      ),
      convertToBuffer(JSON.stringify(marketData)).split("").reverse().join(""),
      "utf8"
    )
  })
)

console.log("Done!")
