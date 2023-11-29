import _sortBy from "lodash/sortBy"

import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"

import SEO from "@components/SEO"
import BlogLandingPage from "@components/pages/BlogLandingPage"

export default function BlogPage({ allPosts }) {
  return (
    <>
      <SEO title="Blog" />
      <BlogLandingPage allPosts={allPosts} />
    </>
  )
}

export async function getStaticProps() {
  const allPostNames = await getAllMDXSlugs("blog")
  const allPosts = await Promise.all(
    allPostNames.map((n) => getMDXPage("blog", n))
  ).then((d) => {
    return _sortBy(
      d.filter((d) => d.frontmatter.lang === "en").map((dd) => dd.frontmatter),
      (o) => -parseInt(o.date.split("-").join(""))
    )
  })
  return { props: { allPosts } }
}
