import { getPages } from "@utils/api/server"

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
  const allPosts = (await getPages("blog")) || []
  return { props: { allPosts } }
}
