import { MDXRemote } from "next-mdx-remote"

import SEO from "@components/SEO"
import components from "@components/MDXComponents"
import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"

export default function Page({ source }) {
  const { frontmatter } = source
  return (
    <div>
      <SEO {...frontmatter} />
      <MDXRemote {...source} components={components} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const source = await getMDXPage("test", params.slug || "")
  return { props: { source } }
}

export async function getStaticPaths() {
  const slugs = await getAllMDXSlugs("test")
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
