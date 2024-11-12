import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"

import SEO from "@/components/SEO"
import getPage from "@/utils/api/server/getPage"
import getPages from "@/utils/api/server/getPages"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import { baseComponents } from "@/components/MDXComponents"

export default function HighlightPage({ source }) {
  const { frontmatter } = source
  return (
    <>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <div>
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/highlights">
              {"Highlights"}
            </PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          <PageHeaderContent gridColumn={["1 / -1", null, null, "2 / span 5"]}>
            <Heading textStyle="pageHeading">{frontmatter.title}</Heading>
            <Text textStyle="pageSubheading">{frontmatter.description}</Text>
          </PageHeaderContent>
        </PageHeader>
        <Container pb={20}>
          <SimpleGrid columns={8} gridGap={10}>
            <MDXRemote {...source} components={baseComponents} />
          </SimpleGrid>
        </Container>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const pages = await getPages({ pageType: "highlights" })
  return {
    paths: pages.map((page) => ({
      params: { slug: page.slug.split("/").pop() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const source = await getPage({
    pageType: "highlights",
    slug,
  })
  return { props: { source } }
}
