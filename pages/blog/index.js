import { getPages } from "@utils/api/server"

import SEO from "@components/SEO"

export default function BlogPage({ allPosts }) {
  return (
    <>
      <SEO title="Blog" />
      {"Blog "}
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getPages("blog")) || []
  return { props: { allPosts } }
}
