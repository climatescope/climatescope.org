import { MDXRemote } from "next-mdx-remote"
import { Container, Stack } from "@chakra-ui/layout"

import SEO from "@components/SEO"
import components from "@components/MDXComponents"
import SimpleGrid from "@components/SimpleGrid"
import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"

export default function AboutPage({ source }) {
  const { frontmatter } = source
  return (
    <div>
      <SEO {...frontmatter} />
      <Container as="main">
        <SimpleGrid columns={8} pt={10} pb={40}>
          <Stack
            spacing={10}
            gridColumn={["1 / -1", null, null, "2 / span 5"]}
            sx={{
              "h1 + p": {
                fontSize: ["lg", null, "2xl"],
                lineHeight: "short",
                fontWeight: 500,
              },
            }}
          >
            <MDXRemote {...source} components={components} />
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const source = await getMDXPage("about", params.slug || "")
  return { props: { source } }
}

export async function getStaticPaths() {
  const slugs = await getAllMDXSlugs("about")
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
