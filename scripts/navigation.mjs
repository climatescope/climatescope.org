import fs from "fs"
import path from "path"
import sortBy from "lodash/sortBy.js"
// import { serialize } from "next-mdx-remote/serialize"

const { join } = path

const writePath = join(process.cwd(), `src/utils/navigation.js`)

const blog = [
  {
    title: "Developing countries raise their clean power policy ambitions",
    description:
      "92% of emerging markets have set long-term renewable energy targets, but follow-through remains critical and incomplete, finds BloombergNEF in its latest Climatescope survey.",
    date: "2022-11-15",
    category: "Press release",
    lang: "en",
    languages: ["en", "es", "fr", "pt", "cn"],
    slug: "developing-countries-raise-their-clean-power-policy-ambitions",
  },
  {
    title: "Emerging market clean energy investment slid as Covid-19 spread",
    description:
      "Investor support for the energy transition surged in 2020 but capital flows to less developed countries slowed as the pandemic raged on",
    date: "2021-12-14",
    category: "Press release",
    lang: "en",
    languages: ["en", "es", "fr", "pt", "ru"],
    slug: "press-release-climatescope-2021",
  },
]

const enBlogPosts = sortBy(
  blog.filter((d) => !d.lang || d.lang === "en"),
  (o) => -parseInt(o.date.split("-").join(""))
)

const tools = [
  {
    title: "Geography comparison",
    description: "",
    slug: "geography-comparison",
    order: 1,
    thumbnail: "",
    cover: "",
  },
  {
    title: "Capacity & generation in emerging markets",
    description: "",
    slug: "energy-capacity-generation-in-emerging-markets",
    order: 1,
    thumbnail: "",
    cover: "",
  },
]

const sectors = [
  {
    title: "Power",
    description: "",
    path: "/sectors/power",
    order: 1,
    thumbnail: "power.jpg",
    cover: "power-cover.jpg",
  },
  {
    title: "Transport",
    description: "",
    path: "/sectors/transport",
    order: 2,
    thumbnail: "transport.jpg",
    cover: "transport-cover.jpg",
  },
  {
    title: "Buildings",
    description: "",
    path: "/sectors/buildings",
    order: 3,
    thumbnail: "buildings.jpg",
    cover: "buildings-cover.jpg",
  },
]

const about = [
  {
    title: "Methodology",
    slug: "methodology",
  },
  {
    title: "Contact",
    slug: "contact",
  },
  {
    title: "License",
    slug: "license",
  },
]

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