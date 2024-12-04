import { readFile, writeFile } from "fs/promises"
import { join } from "path"

// await mkdir(join(process.env.PWD, "public", "data"))

function convertFromBuffer(content) {
  return Buffer.from(content, "base64").toString()
}

function convertToBuffer(content) {
  return Buffer.from(content).toString("base64")
}

const markets = await readFile(
  join(process.env.PWD, "content", "markets.txt"),
  "utf8"
).then((d) =>
  JSON.parse(convertFromBuffer(d.trim().split("").reverse().join("")))
)

const searchIndex = markets.pages
  .filter((d) => !d.slug.includes("russia"))
  .map(({ slug, frontmatter }, i) => {
    return {
      key: i + 1,
      label: frontmatter.market,
      href: slug,
      type: "market",
      content: "",
    }
  })

await writeFile(
  join(process.env.PWD, "public", "data", "search-index-lite.txt"),
  convertToBuffer(JSON.stringify(searchIndex)).split("").reverse().join(""),
  "utf8"
)
