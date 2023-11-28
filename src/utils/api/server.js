import fs from "fs/promises"
import { join, extname } from "path"
import shuffle from "lodash/shuffle"
import { csvParse } from "d3-dsv"
import { serialize } from "next-mdx-remote/serialize"

import { extractMetadata } from "@utils/api/extractMetadata"
import nav from "@utils/navigation"

const postsDirectory = (p = "") => join(process.cwd(), `pages/${p}`)

export async function getPostSlugs(n) {
  const slug = await fs.readdir(postsDirectory(n))
  return slug.filter((d) => d.includes(".mdx"))
}

export async function getPageBySlug(slug, n) {
  const realSlug = slug.replace(/\.mdx$/, "")
  const fullPath = join(postsDirectory(n), `${realSlug}.mdx`)
  const fileContents = await fs.readFile(fullPath, "utf8")
  return extractMetadata(fileContents, realSlug)
}

export async function getPages(n = "") {
  if (n === "sectors") return nav.find((s) => s.title === "Sectors").links
  const slugs = await getPostSlugs(n)
  const pages = await Promise.all(slugs.map((slug) => getPageBySlug(slug, n)))
  return pages
}

export async function getDataPreview(filePath, options = {}) {
  const format = filePath.split(".").reverse()[0]
  const shuffleOption = options.shuffle
  const inputPath = join(process.cwd(), filePath)
  const data = await fs.readFile(inputPath, "utf8").catch(() => "{}")
  const formatted = format === "csv" ? csvParse(data) : JSON.parse(data)
  const shuffled = shuffleOption ? shuffle(formatted) : formatted
  const sliceOption = options.slice || [0]
  return shuffled.slice ? shuffled.slice(...sliceOption) : shuffled
}

export const getServerData = getDataPreview

export async function getPathsFromDirectory(n, ext) {
  const slugs = await fs.readdir(join(process.cwd(), n))
  return ext ? slugs.filter((d) => d.includes(ext)) : slugs
}

/**
 * MDX Remote helpers
 *
 */

export async function getMDXPage(dir = "", slug = "") {
  const content = await fs.readFile(
    join(process.cwd(), "content", dir, `${slug}.mdx`),
    "utf8"
  )
  const options = { parseFrontmatter: true }
  const source = await serialize(content, options)
  return source
}

export async function getAllMDXSlugs(dir = "") {
  const pages = await fs.readdir(join(process.cwd(), "content", dir))
  return pages
    .filter((d) => extname(d).includes("mdx"))
    .map((d) => d.split(extname(d))[0])
}
