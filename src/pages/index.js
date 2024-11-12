import { useEffect, useState } from "react"
import {
  HStack,
  Stack,
  Box,
  Container,
  Heading,
  Text,
  AspectRatio,
  SimpleGrid,
  Center,
  Button,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react"
import { ArrowForwardIcon as ArrowRightIcon, CheckIcon } from "@chakra-ui/icons"

import getPages from "@/utils/api/server/getPages"
import getContent from "@/utils/api/server/getContent"
import fetchDataset from "@/utils/api/client/fetchDataset"
import SEO from "@/components/SEO"
import Image from "@/components/Image"
import { Link, ButtonLink, LinkBox, LinkOverlay } from "@/components/Link"
import SectionHeader from "@/components/SectionHeader"
import {
  QuickSearch,
  QuickSearchInput,
  QuickSearchResults,
} from "@/components/QuickSearch"
import TechnologiesCartogram from "@/components/TechnologiesCartogram"
import GlobePreview from "@/components/GlobePreview"
import MiniGlobes from "@/components/MiniGlobes"
import { RankingIcon, HighlightsIcon, FactbookIcon } from "@/components/Icon"

const overviewItems = [
  {
    key: 1,
    title: "2024 ranking",
    subtitle: "Explore the latest results",
    href: "/results",
    icon: RankingIcon,
    linkProps: {},
  },
  {
    key: 2,
    title: "Highlights",
    subtitle: "Climatescope 2024 findings",
    href: "/highlights",
    icon: HighlightsIcon,
    linkProps: {},
  },
  {
    key: 3,
    title: "Download",
    subtitle: "Emerging Markets Power Factbook",
    href: "/downloads/climatescope-emerging-markets-power-factbook-2024.pdf",
    icon: FactbookIcon,
    linkProps: {
      download: "climatescope-emerging-markets-power-factbook-2024.pdf",
      target: "_blank",
    },
  },
]

function Overview() {
  return (
    <SimpleGrid
      as="section"
      gridColumn="1 / -1"
      gridRow="1 / span 1"
      bg="white"
      zIndex={1}
      py={10}
      px={[0, null, null, 10]}
      columns={[1, null, null, 3]}
      gridColumnGap={10}
      gridRowGap={3}
      borderTop="0.0625rem solid"
      borderColor="gray.200"
    >
      {overviewItems.map((d) => {
        const Icon = d.icon
        return (
          <LinkBox
            key={d.key}
            as={HStack}
            spacing={5}
            _hover={{ bg: "gray.100" }}
          >
            <Center w={20} h={20} flex="none">
              <Icon size="2.5rem" />
            </Center>
            <Stack spacing={1}>
              <Heading textStyle="cardButtonHeading">
                <LinkOverlay
                  href={d.href}
                  {...d.linkProps}
                  _focusVisible={{ outline: "0.125rem solid" }}
                >
                  {d.title}
                </LinkOverlay>
              </Heading>
              <Text textStyle="cardButtonSubheading">{d.subtitle}</Text>
            </Stack>
          </LinkBox>
        )
      })}
    </SimpleGrid>
  )
}

function CoverImage() {
  return (
    <AspectRatio
      ratio={5 / 2}
      gridColumn="1 / -1"
      gridRow={["2 / span 1", null, null, "1 / span 1"]}
      mt={[0, null, null, 20]}
      mx={-10}
    >
      <Box
        bg="brand.900"
        color="brand.50"
        bgImage="url(/images/cover-lg.jpg)"
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
      />
    </AspectRatio>
  )
}

function HomeBanner() {
  return (
    <SimpleGrid
      columns={8}
      gridRowGap={[5, null, null, 10]}
      gridColumnGap={10}
      pt={20}
      pb={[10, null, null, 20]}
    >
      <Box gridColumn={["1 / -1", null, null, "1 / -3"]}>
        <Heading textStyle="pageHeading">
          <Text as="span" textStyle="pageHeading" color="brand.500">
            {"Climatescope"}
          </Text>
          {
            " — Discover the most attractive markets for energy transition investment."
          }
        </Heading>
      </Box>
      <Box gridColumn={["1 / -1", null, null, "1 / 5"]}>
        <QuickSearch maxW="none">
          <QuickSearchInput />
          <QuickSearchResults />
        </QuickSearch>
      </Box>
      <HStack
        spacing={10}
        justifyContent={["flex-end", null, null, "flex-start"]}
        gridColumn={["1 / -1", null, null, "5 / -1"]}
      >
        <ButtonLink
          href="/results"
          size="lg"
          borderRadius="sm"
          rightIcon={<ArrowRightIcon w="1.5rem" h="1.5rem" />}
          pr={5}
          variant="ghost"
          colorScheme="gray"
        >
          {"Explore all markets"}
        </ButtonLink>
      </HStack>
    </SimpleGrid>
  )
}

function LatestResultsPreview({ data }) {
  return (
    <Box
      bg="black"
      color="white"
      left="50%"
      position="relative"
      transform="translateX(-50%)"
      w="100vw"
    >
      <Container>
        <GlobePreview
          globeInsights={data}
          title="Highlights"
          description="a new kind of insight into what is really driving the energy transition in selected markets, as well as the main opportunities for – and barriers to – a low-carbon economy."
          actionText="See all highlights"
          actionHref="/highlights"
        />
      </Container>
    </Box>
  )
}

function PowerGeneratingTechnologiesPreview() {
  return (
    <Box py={20}>
      <TechnologiesCartogram />
    </Box>
  )
}

function RenewableEnergyByRegionPreview() {
  const [data, setData] = useState([])

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    fetchDataset(
      "/data/share-of-renewable-energy-installed-capacity-by-region.txt"
    ).then((data) => setData(data))
  }, [])

  return (
    <Box
      bg="brand.1000"
      color="white"
      left="50%"
      position="relative"
      transform="translateX(-50%)"
      w="100vw"
    >
      <Container>{data.length && <MiniGlobes data={data} />}</Container>
    </Box>
  )
}

function ToolsPreview({ tools }) {
  return (
    <SimpleGrid as="section" columns={[1, null, null, 2]} gridGap={10} py={20}>
      <SectionHeader gridColumn="1 / -1">
        <Heading textStyle="sectionHeading">{"Tools"}</Heading>
        <Text textStyle="sectionSubheading">
          {"Explore the data behind the Climatescope ranking"}
        </Text>
      </SectionHeader>
      {tools.map((tool) => {
        const cover = tool.slug.split("/").slice(-1)[0]
        return (
          <LinkBox
            key={tool.slug}
            as={SimpleGrid}
            bg="black"
            columns={4}
            gridGap={10}
          >
            <Box gridColumn="1 / -1" gridRow="1 / span 1">
              <Image src={`${cover}.jpg`} ratio={3 / 2} />
            </Box>
            <Box
              gridColumn="1 / -2"
              gridRow="1 / span 1"
              bg="white"
              alignSelf="end"
              pt={5}
              pr={10}
              zIndex={1}
            >
              <Heading textStyle="previewCardHeading">
                <LinkOverlay href={tool.slug}>{tool.title}</LinkOverlay>
              </Heading>
            </Box>
          </LinkBox>
        )
      })}
    </SimpleGrid>
  )
}

function InsightsPreview() {
  return (
    <SimpleGrid
      as="section"
      columns={8}
      gridGap={10}
      py={20}
      bg="black"
      color="white"
      mx={-10}
      px={10}
      mb={20}
      bgImage="url(/images/bnef-insights-bg-lg.jpg)"
      bgPosition="top"
      bgSize="cover"
      bgRepeat="no-repeat"
      position="relative"
      _after={{
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient:
          "linear(to-b, blackAlpha.500, blackAlpha.700, blackAlpha.900)",
      }}
    >
      <SectionHeader
        dividerColor="gray.500"
        gridColumn={["1 / -1", null, null, "1 / span 4"]}
        zIndex={2}
      >
        <Heading textStyle="sectionHeading">
          {"Get more insights from BloombergNEF"}
        </Heading>
        <Text textStyle="sectionSubheading">
          {
            "Explore more detailed information on global commodity markets and the disruptive technologies driving the transition to a low-carbon economy."
          }
        </Text>
      </SectionHeader>
      <List
        gridColumn={["1 / -1", null, null, "1 / span 4"]}
        spacing={5}
        fontSize="lg"
        zIndex={2}
      >
        <ListItem fontWeight={600}>
          <ListIcon as={CheckIcon} boxSize={6} mr={5} />
          {"Detailed data on all 222 indicators"}
        </ListItem>
        <ListItem fontWeight={600}>
          <ListIcon as={CheckIcon} boxSize={6} mr={5} />
          {"In-depth analysis for 140 markets"}
        </ListItem>
      </List>
      <List
        gridColumn={["1 / -1", null, null, "span 4"]}
        spacing={5}
        fontSize="lg"
        zIndex={2}
      >
        <ListItem fontWeight={600}>
          <ListIcon as={CheckIcon} boxSize={6} mr={5} />
          {"Historical data for 15 years"}
        </ListItem>
        <ListItem fontWeight={600}>
          <ListIcon as={CheckIcon} boxSize={6} mr={5} />
          {"Model available to download"}
        </ListItem>
      </List>
      <Box gridColumn="1 / -1" zIndex={2}>
        <ButtonLink href="https://about.bnef.com/">
          {"Read more on BNEF"}
        </ButtonLink>
      </Box>
    </SimpleGrid>
  )
}

function FactbookPreview() {
  return (
    <Box
      bg="gray.100"
      left="50%"
      position="relative"
      transform="translateX(-50%)"
      w="100vw"
      py={20}
    >
      <Container>
        <SimpleGrid columns={8} gridGap={10} alignItems="center">
          <Stack
            gridColumn={["1 / -1", null, "1 / span 4", "2 / span 3"]}
            alignItems="flex-start"
            spacing={5}
          >
            <Heading textStyle="sectionHeading">
              {"Emerging Markets Power Factbook"}
            </Heading>
            <Text textStyle="sectionSubheading">
              {
                "This is the 13th annual edition of Climatescope, BNEF’s annual assesment of energy transition opportunities. Until 2023, the country coverage encompassed detailed information for the power and transport sectors on 140 markets around the world (of which 30 developed markets) – or nearly every market in the world with over 2 million inhabitants."
              }
            </Text>
            <ButtonLink
              href="/downloads/climatescope-emerging-markets-power-factbook-2024.pdf"
              download="climatescope-emerging-markets-power-factbook-2024.pdf"
              target="_blank"
              colorScheme="brand"
              size="lg"
            >
              {"Download report"}
            </ButtonLink>
          </Stack>
          <Box
            gridColumn={["1 / -1", null, "span 4", "span 3"]}
            bg="brand.800"
            aspectRatio={210 / 297}
          >
            <Image
              src="climatescope-2024-report-en-cover.jpg"
              ratio={210 / 297}
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

function HomeOverview() {
  return (
    <SimpleGrid columns={8} gridGap={10} alignItems="start">
      <Overview />
      <CoverImage />
      <Stack
        gridColumn={["1 / -1", null, null, "2 / -2"]}
        pt={10}
        pb={20}
        spacing={10}
        alignItems="flex-start"
      >
        <Text fontSize="3xl" lineHeight="base">
          {
            "Climatescope is an online market assessment tool, report and index that evaluates individual markets’ readiness to put energy transition investment to work."
          }
        </Text>
        <Link href="/about" fontSize="xl" color="brand.600" fontWeight={600}>
          {"Read more about Climatescope"}
        </Link>
      </Stack>
    </SimpleGrid>
  )
}

export default function IndexPage({ highlights, tools }) {
  return (
    <>
      <SEO />
      <Box as="main">
        <Container>
          <HomeBanner />
          <HomeOverview />
          <LatestResultsPreview data={highlights} />
          <PowerGeneratingTechnologiesPreview />
          <RenewableEnergyByRegionPreview />
          <ToolsPreview tools={tools} />
          <InsightsPreview />
          <FactbookPreview />
        </Container>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const tools = await getPages({
    pageType: "tools",
    fields: ["slug", "title", "publish"],
    filter: (d) => d.publish,
    limit: 2,
  })

  const markets = await getPages({
    pageType: "markets",
    fields: ["slug", "iso", "market"],
  })

  const coordinates = await getContent(
    "../public/data/augmented-geographies.txt",
    "json"
  )

  const highlights = await getPages({
    pageType: "highlights",
    fields: ["slug", "iso", "title", "description", "publish"],
  })

  const highlightsWithCoordinates = highlights
    .filter((d) => d.publish)
    .map((d, i) => {
      const { lat, lon } =
        coordinates.find((s) => s.iso.toLowerCase() === d.iso) || {}
      const market = markets.find((s) => s.iso === d.iso) || {}
      const title = market.market
      return {
        key: i + 1,
        title,
        href: d.slug || "/",
        description: d.title || "",
        sector: "power",
        coordinates: [parseFloat(lon) || 0, parseFloat(lat) || 0],
      }
    })

  return { props: { tools, highlights: highlightsWithCoordinates } }
}
