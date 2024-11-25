import {
  Heading,
  Container,
  Box,
  SimpleGrid,
  // Text,
  Center,
  Stack,
  HStack,
} from "@chakra-ui/react"

import SEO from "@/components/SEO"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import getPages from "@/utils/api/server/getPages"
import { LinkBox, LinkOverlay } from "@/components/Link"
import { ChevronRightIcon } from "@/components/Icon"

export default function BlogListingPage({ pages }) {
  return (
    <>
      <SEO title="Blog" />
      <main>
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/">{"Home"}</PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          <PageHeaderContent gridColumn={["1 / -1", null, null, "2 / span 5"]}>
            <Heading textStyle="pageHeading">{"Blog"}</Heading>
            {/* <Text textStyle="pageSubheading">{frontmatter.description}</Text> */}
          </PageHeaderContent>
        </PageHeader>
        <Container>
          <Stack
            spacing={10}
            borderTop="0.0625rem solid"
            borderColor="gray.200"
          >
            {pages.map((page) => {
              return (
                <LinkBox
                  key={page.slug}
                  as={SimpleGrid}
                  columns={8}
                  gridGap={10}
                  py={[10, null, null, 20]}
                  borderBottom="0.0625rem solid"
                  borderColor="gray.200"
                >
                  <HStack
                    gridColumn={["1 / -1", null, null, "2 / -1"]}
                    spacing={10}
                    justifyContent="space-between"
                  >
                    <Heading textStyle="previewCardHeading" maxW="55rem">
                      <LinkOverlay href={page.slug}>{page.title}</LinkOverlay>
                    </Heading>
                    <Center flex="none" w={16}>
                      <ChevronRightIcon size="2rem" />
                    </Center>
                  </HStack>
                </LinkBox>
              )
            })}
          </Stack>
        </Container>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const pagesRaw = await getPages({ pageType: "blog" })
  const pages = pagesRaw.filter((d) => !d.slug.includes("sample-post"))
  return { props: { pages } }
}
