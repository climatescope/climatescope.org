import {
  Heading,
  Container,
  Box,
  SimpleGrid,
  Text,
  Center,
} from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"

import SEO from "@/components/SEO"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import getPages from "@/utils/api/server/getPages"
import getPage from "@/utils/api/server/getPage"
import { Link, LinkBox, LinkOverlay } from "@/components/Link"
import { baseComponents } from "@/components/MDXComponents"

const illustrations = {
  contact:
    "M31 4.64H1A.36.36 0 0 0 .64 5v22c0 .199.161.36.36.36h30a.36.36 0 0 0 .36-.36V5a.36.36 0 0 0-.36-.36m-.36 21.541L19.638 16.097 30.64 5.829zm-14.886-6.918a.356.356 0 0 0 .491 0l2.865-2.674L30.074 26.64H1.926L12.89 16.59zM30.087 5.36 16 18.508 1.913 5.36zM12.362 16.097 1.36 26.182V5.829z",
  license:
    "M11 28.36a.4.4 0 0 1-.139-.028A13.33 13.33 0 0 1 2.64 16C2.64 8.633 8.633 2.64 16 2.64S29.36 8.633 29.36 16c0 5.409-3.228 10.25-8.222 12.332a.36.36 0 0 1-.3-.011.36.36 0 0 1-.188-.234l-2-8a.36.36 0 0 1 .134-.375A4.6 4.6 0 0 0 20.639 16c0-2.559-2.081-4.64-4.64-4.64s-4.64 2.082-4.64 4.64c0 1.473.677 2.826 1.856 3.712a.36.36 0 0 1 .133.375l-2 8a.35.35 0 0 1-.188.234.33.33 0 0 1-.16.039m8.406-8.221 1.84 7.361A12.61 12.61 0 0 0 28.64 16c0-6.97-5.67-12.64-12.64-12.64S3.36 9.03 3.36 16c0 4.978 2.888 9.446 7.394 11.5l1.84-7.361A5.32 5.32 0 0 1 10.64 16 5.365 5.365 0 0 1 16 10.64 5.366 5.366 0 0 1 21.36 16c0 1.621-.71 3.116-1.954 4.139",
  methodology:
    "M30 30.36H2a.36.36 0 0 1-.36-.36V2A.36.36 0 0 1 2 1.64h28a.36.36 0 0 1 .36.36v28a.36.36 0 0 1-.36.36m-13.64-.72h13.28V16.36H16.36zm-14 0h13.28V16.36H2.36zm14-14h13.28V2.36H16.36zm-14 0h13.28V2.36H2.36zM23 27.36c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36m0-2a.64.64 0 1 0 .001 1.281A.64.64 0 0 0 23 25.36m-11.254.895L9 23.509l-2.746 2.746-.509-.51L8.491 23l-2.745-2.745.509-.51L9 22.491l2.746-2.746.509.51L9.509 23l2.745 2.745zM27 23.36h-8v-.72h8zm-4-2c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36m0-2a.64.64 0 1 0 .001 1.281A.64.64 0 0 0 23 19.36M9.36 13h-.72V9.36H5v-.72h3.64V5h.72v3.64H13v.72H9.36zM27 9.36h-8v-.72h8z",
}

export default function AboutPage({ pages, source }) {
  const { frontmatter } = source
  return (
    <>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <main>
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/">{"Home"}</PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          <PageHeaderContent gridColumn={["1 / -1", null, null, "2 / span 5"]}>
            <Heading textStyle="pageHeading">{frontmatter.title}</Heading>
            <Text textStyle="pageSubheading">{frontmatter.description}</Text>
          </PageHeaderContent>
        </PageHeader>
        <Container>
          <SimpleGrid columns={8} gridGap={10}>
            <MDXRemote {...source} components={baseComponents} />
          </SimpleGrid>

          <SimpleGrid columns={[1, null, null, 3]} gridGap={10} pt={20} pb={20}>
            {pages.slice(1).map((page) => {
              const slug = page.slug.split("/").slice(-1)[0]
              const illustration = illustrations[slug]
              return (
                <LinkBox
                  as={SimpleGrid}
                  key={page.slug}
                  columns={2}
                  gridGap={10}
                  bg="gray.50"
                >
                  <Center pt={10} gridColumn="1 / -1" color="gray.900">
                    <svg
                      viewBox="0 0 32 32"
                      style={{ height: "5rem", width: "auto" }}
                    >
                      <path d={illustration} fill="currentcolor" />
                    </svg>
                  </Center>
                  <Box bg="white" pt={5} mr={-10} gridColumn="1 / span 1">
                    <Heading textStyle="previewCardHeading">
                      <LinkOverlay href={page.slug}>{page.title}</LinkOverlay>
                    </Heading>
                  </Box>
                </LinkBox>
              )
            })}
          </SimpleGrid>
        </Container>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const pages = await getPages({ pageType: "about" })
  const source = await getPage({ pageType: "about", slug: "about" })
  return { props: { pages, source } }
}
