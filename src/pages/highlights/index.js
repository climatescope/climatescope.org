import { Heading, Text, Container, SimpleGrid, Box } from "@chakra-ui/react"

import SEO from "@/components/SEO"
import getPages from "@/utils/api/server/getPages"
import { LinkBox, LinkOverlay } from "@/components/Link"
import Image from "@/components/Image"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"

export default function HighlightsPage({ highlights }) {
  return (
    <>
      <SEO title="Highlights" />
      <div>
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/">{"Home"}</PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          <PageHeaderContent>
            <Heading textStyle="pageHeading">{"Highlights"}</Heading>
            <Text textStyle="pageSubheading">
              {
                "The result is Climatescope Postcards, a series designed to offer a new kind of insight into what is really driving the energy transition in selected markets, as well as the main opportunities for – and barriers to – a low-carbon economy."
              }
            </Text>
          </PageHeaderContent>
        </PageHeader>
        <Container>
          <SimpleGrid columns={[1, null, 2]} gridGap={10} pb={20}>
            {highlights.map((highlight) => {
              return (
                <LinkBox
                  as={SimpleGrid}
                  key={highlight.key}
                  columns={2}
                  gridRowGap={3}
                >
                  <Box gridColumn="1 / -1" gridRow="1 / span 1">
                    <Image
                      src={highlight.cover}
                      alt={highlight.market.market}
                    />
                  </Box>
                  <Box
                    gridColumn="1 / span 1"
                    gridRow="1 / span 1"
                    alignSelf="flex-end"
                    zIndex={1}
                    pt={5}
                    pr={10}
                    mr={-10}
                    bg="white"
                  >
                    <Text
                      textStyle="previewCardSubheading"
                      lineHeight="shorter"
                      fontWeight={600}
                      color="brand.600"
                    >
                      {highlight.market.market}
                    </Text>
                  </Box>
                  <Box gridColumn="1 / -1">
                    <Heading textStyle="previewCardHeading">
                      <LinkOverlay href={highlight.href}>
                        {highlight.title}
                      </LinkOverlay>
                    </Heading>
                  </Box>
                </LinkBox>
              )
            })}
          </SimpleGrid>
        </Container>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const highlights = await getPages({
    pageType: "highlights",
    fields: ["slug", "iso", "title", "description", "publish"],
  })

  const markets = await getPages({
    pageType: "markets",
    fields: ["slug", "iso", "market", "description"],
  })

  const highlightsWithIllustrations = highlights
    .filter((d) => d.publish)
    .map((d, i) => {
      const market = markets.find((s) => s.iso === d.iso) || {}
      return {
        key: i + 1,
        title: d.title || "",
        href: d.slug || "/",
        cover: `${d.slug.split("/").slice(-1)[0]}-postcard.jpg`,
        description: d.description || "",
        sector: "power",
        illustration: "",
        market,
      }
    })

  return { props: { highlights: highlightsWithIllustrations } }
}
