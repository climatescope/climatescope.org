import { Container, SimpleGrid, Box, Heading, Text } from "@chakra-ui/react"

import { LinkBox, LinkOverlay } from "@/components/Link"
import getPages from "@/utils/api/server/getPages"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import Image from "@/components/Image"
import SEO from "@/components/SEO"

export default function ToolsPage({ tools }) {
  return (
    <>
      <SEO title="Tools" />
      <main>
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/">{"Home"}</PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          <PageHeaderContent>
            <Heading textStyle="pageHeading">{"Tools"}</Heading>
            {/* <Text textStyle="pageSubheading">{"Tools page"}</Text> */}
          </PageHeaderContent>
        </PageHeader>
        <Container>
          <SimpleGrid columns={[1, null, null, 2]} gridGap={10} pb={20}>
            {tools.map(({ slug, title }) => {
              const cover = slug.split("/").slice(-1)[0]
              return (
                <LinkBox
                  key={slug}
                  as="article"
                  display="grid"
                  gridTemplateColumns="repeat(4, 1fr)"
                  gridGap={10}
                >
                  <Box gridColumn="1 / -1" gridRow="1 / span 1">
                    <Image src={`${cover}.jpg`} ratio={3 / 2} />
                  </Box>
                  <Box
                    gridColumn="1 / -2"
                    gridRow="1 / span1"
                    bg="white"
                    alignSelf="end"
                    pt={5}
                    pr={10}
                    zIndex={1}
                  >
                    <Heading textStyle="previewCardHeading">
                      <LinkOverlay href={slug}>{title}</LinkOverlay>
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
  const tools = await getPages({
    pageType: "tools",
    fields: ["slug", "title", "publish"],
    filter: (d) => d.publish,
  })
  return {
    props: {
      tools,
    },
  }
}
