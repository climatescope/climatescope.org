const fs = require("fs")
const path = require("path")

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
const themes = getPages("themes") || []
const sectors = getPages("sectors") || []
const tools = getPages("tools") || []
// const reports = getPages("reports") || []
const blog = getPages("blog") || []
const pages = getPages("") || []

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
    title: "Themes",
    path: "/themes",
    links: themes.map((d) => ({
      title: d.title,
      path: `/themes/${d.slug}`,
    })),
  },
  {
    title: "Sectors",
    path: "/sectors",
    links: sectors.map((d) => ({
      title: d.title,
      path: `/sectors/${d.slug}`,
    })),
  },
  // {
  //   title: "Markets",
  //   path: "/markets",
  //   links: [],
  // },
  {
    title: "Reports",
    path: "/reports",
    links: [],
    // links: reports.map((d) => ({
    //   title: d.title,
    //   path: `/reports/${d.slug}`,
    // })),
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
    links: blog
      .filter((d) => d.slug === "press-release-climatescope-2021")
      .map((d) => ({ title: d.title, path: `/blog/${d.slug}` })),
  },
]

const output = `export default ${JSON.stringify(navigation)}`

fs.writeFile(writePath, output, (err) =>
  err ? console.log(err) : console.log("Done writing navigation!")
)
