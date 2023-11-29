import { readdir, readFile, writeFile } from "fs/promises"
import { join, extname, parse as parsePath } from "path"
import sortBy from "lodash/sortBy.js"
import { serialize } from "next-mdx-remote/serialize"

const writePath = join(process.cwd(), `src/utils/navigation.js`)

async function getMDXFilesFromDirectory(
  dirName = "sectors",
  pathPrefixRaw = [""]
) {
  const pathPrefix = [pathPrefixRaw].flat()
  const contentDir = join(process.cwd(), "content")
  const sectorFiles = await readdir(join(contentDir, dirName)).then((d) =>
    d.filter((dd) => [".mdx"].includes(extname(dd)))
  )
  const allContent = await Promise.all(
    sectorFiles.map(async (d) => {
      const content = await readFile(join(contentDir, dirName, d), "utf8")
      const options = { parseFrontmatter: true }
      const { frontmatter } = await serialize(content, options)
      const cleanedPaths = pathPrefix.map((s) => s.split("/").join(""))
      frontmatter.path = `/${join(...cleanedPaths, parsePath(d).name || "")}`
      frontmatter.slug = parsePath(d).name || ""
      return frontmatter
    })
  )
  return sortBy(
    allContent,
    (o) => o.order || -parseInt(o.date?.split("-").join("")) || 0
  )
}

const about = await getMDXFilesFromDirectory("about", ["about"])
const sectors = await getMDXFilesFromDirectory("sectors", ["sectors"])
const tools = await getMDXFilesFromDirectory("tools", ["tools"])
const blog = await getMDXFilesFromDirectory("blog", ["blog"])

const enBlogPosts = sortBy(
  blog.filter((d) => !d.lang || d.lang === "en"),
  (o) => -parseInt(o.date?.split("-").join(""))
)

const navigation = [
  {
    title: "Results",
    path: "/results",
    links: [],
  },
  // {
  //   title: "Highlights",
  //   path: "/highlights",
  //   links: [],
  // },
  {
    title: "Sectors",
    path: "/sectors",
    links: sectors,
  },
  {
    title: "Markets",
    path: "/results",
    links: [],
  },
  {
    title: "Reports",
    path: "/reports",
    links: [],
  },
  {
    title: "Tools",
    path: "/tools",
    links: tools,
  },
  {
    title: "About",
    path: "/about",
    links: about,
  },
  {
    title: "Blog",
    path: "/blog",
    links: enBlogPosts.slice(0, 1),
  },
]

const output = `export default ${JSON.stringify(navigation)}`

await writeFile(writePath, output)

console.log("Done writing navigation!")
