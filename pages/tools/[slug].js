import { MDXRemote } from "next-mdx-remote"
import { Container, Stack } from "@chakra-ui/layout"

import SEO from "@components/SEO"
import components from "@components/MDXComponents/toolsComponents"
import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"

export default function ToolPage({ source }) {
  const { frontmatter } = source
  return (
    <div>
      <SEO {...frontmatter} />
      <Container as="main">
        <Stack spacing={10} pt={10} pb={20} alignItems="center" textAlign="center">
          <MDXRemote {...source} components={components} />
        </Stack>
      </Container>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const source = await getMDXPage("tools", params.slug || "")
  return { props: { source } }
}

export async function getStaticPaths() {
  const slugs = await getAllMDXSlugs("tools")
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
