const fs = require("fs")
const path = require("path")
const sortBy = require("lodash/sortBy")

const { join } = path

function extractMetadata(str, slug, metaDataName = "metaData") {
  const [, bodyText] = str.split(`const ${metaDataName} = `)

  let closedMetaBlock = false // avoid parsing component props in MDX
  let openBraceCount = 0

  const cleanData =
    bodyText.split("").reduce((acc, cur) => {
      if (cur === "{") openBraceCount = openBraceCount + 1
      if (cur === "}") {
        openBraceCount = openBraceCount - 1
        if (!openBraceCount) closedMetaBlock = true
      }
      if (closedMetaBlock) return acc
      if (!openBraceCount && acc.length > 1) return acc
      if (!openBraceCount) return acc
      return acc + cur
    }, "") + "}"

  const spacelessStr = cleanData
    .replaceAll("{", "{————")
    .replaceAll("}", "————}")
    .replaceAll(",\n", "————")
    .split("————")
    .map((d) => d.replaceAll("\n", "").replaceAll("\t", "").trim())
    .reduce((acc, cur) => {
      const cleanedLine = cur.trim()
      if (!cur) return acc
      if (["{", "}"].includes(cleanedLine)) return [...acc, cur]
      const [key, ...val] = cleanedLine.split(":")
      const cleanedValue = val.join("").trim()
      const hasTrailingComma = cleanedValue[cleanedValue.length - 1] === ","
      return [
        ...acc,
        `"${key.trim()}":${
          hasTrailingComma ? cleanedValue : cleanedValue + ","
        }`,
      ]
    }, [])
    .join("")
    .replaceAll(",}", "}")

  const parsedMetaData = JSON.parse(spacelessStr)

  return { ...parsedMetaData, slug }
}

const writePath = join(process.cwd(), `src/utils/navigation.js`)

const postsDirectory = (p = "") => join(process.cwd(), `pages/${p}`)

function getPostSlugs(n) {
  return fs
    .readdirSync(postsDirectory(n))
    .filter((d) => d.indexOf(".mdx") !== -1)
}

function getPageBySlug(slug, n) {
  const realSlug = slug.replace(/\.mdx$/, "")
  const fullPath = join(postsDirectory(n), `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  return extractMetadata(fileContents, realSlug)
}

function getPages(n = "") {
  const slugs = getPostSlugs(n)
  return slugs.map((slug) => getPageBySlug(slug, n))
}

const about = getPages("about") || []
const sectorsRaw = getPages("sectors") || []
const tools = getPages("tools") || []
// const reports = getPages("reports") || []
const blog = getPages("blog") || []
const pages = getPages("") || []

const enBlogPosts = sortBy(
  blog.filter((d) => !d.lang || d.lang === "en"),
  (o) => -parseInt(o.date.split("-").join(""))
)

const sectors = [
  ...sectorsRaw,
  {
    title: "Transport",
    description: "",
    path: "/sectors",
    order: 2,
    thumbnail: "transport.jpg",
    cover: "transport-cover.jpg",
  },
  {
    title: "Buildings",
    description: "",
    path: "/sectors",
    order: 3,
    thumbnail: "buildings.jpg",
    cover: "buildings-cover.jpg",
  },
]

const navigation = [
  ...pages.map((d) => {
    return {
      title: d.title,
      path: `/${d.slug}`,
      links: [],
    }
  }),
  {
    title: "Results",
    path: "/results",
    links: [],
  },
  {
    title: "Highlights",
    path: "/highlights",
    links: [],
  },
  {
    title: "Sectors",
    path: "/sectors",
    links: sectors
      .map((d) => ({
        title: d.title,
        path: `/sectors/${d.slug}`,
        order: d.order,
        ...d,
      }))
      .sort((a, b) => a.order - b.order),
  },
  {
    title: "Markets",
    path: "/markets",
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
    links: tools.map((d) => ({
      title: d.title,
      path: `/tools/${d.slug}`,
    })),
  },
  {
    title: "About",
    path: "/about",
    links: about.map((d) => ({ title: d.title, path: `/about/${d.slug}` })),
  },
  {
    title: "Blog",
    path: "/blog",
    links: enBlogPosts
      .slice(0, 1)
      .map((d) => ({ title: d.title, path: `/blog/${d.slug}` })),
  },
]

const output = `export default ${JSON.stringify(navigation)}`

fs.writeFile(writePath, output, (err) =>
  err ? console.log(err) : console.log("Done writing navigation!")
)
