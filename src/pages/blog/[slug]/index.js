import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"

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
import SEO from "@/components/SEO"

export default function AboutDetailPage({ source }) {
  const { frontmatter } = source
  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || ""}
      />
      <main>
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/blog">{"Blog"}</PageHeaderBackButton>
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
            {/* <Stack
            spacing={10}
            gridColumn={["1 / -1", null, null, "2 / span 5"]}
            fontSize="lg"
          >
            <MDXRemote {...source} components={baseComponents} />
          </Stack> */}
          </SimpleGrid>
        </Container>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const pagesRaw = await getPages({ pageType: "blog" })
  const pages = pagesRaw.filter((d) => !d.slug.includes("sample-post"))
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
    pageType: "blog",
    slug: `/blog/${slug}`,
  })
  return { props: { source } }
}
