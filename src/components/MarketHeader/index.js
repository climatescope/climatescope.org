import { Stack, SimpleGrid, Box, Heading, Text, Center } from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"

import {
  PageHeaderSubnavigation,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import RadarChart from "@/components/ResultsList/RadarChart"
// import LineChart from "@/components/ResultsList/LineChart"

import { prefixMarket } from "@/utils/marketsWithThe"
import MarketMap from "@/components/MarketMap"

export default function MarketHeader({ frontmatter, data, marketCount, bbox }) {
  const relevantScores = data.score.find((s) => s.year == 2024)
  const powerData = relevantScores.sectors.find((s) => s.id === "power")

  const introduction = [
    "With a power score of",
    Math.round(powerData.global.value * 100) / 100 + ",",
    prefixMarket(frontmatter.iso, frontmatter.market),
    "ranks number",
    powerData.tradebloc.rank,
    "among",
    data.tradebloc.name,
    " and number",
    powerData.region.rank,
    "in the ",
    data.region.name,
    " region",
  ].join(" ")

  const allScoreYears = data.score.map((d) => d.year)

  const timeSeries = _sortBy(data.score, (o) => o.year)

  return (
    <Box>
      <PageHeaderSubnavigation>
        <PageHeaderBackButton href="/results">
          {"All results"}
        </PageHeaderBackButton>
        <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
      </PageHeaderSubnavigation>

      <SimpleGrid columns={8} gridGap={10}>
        <Box
          gridColumn={["1 / -1", null, null, "4 / -1"]}
          gridRow="1"
          bg="gray.500"
          alignSelf="stretch"
          h="90vh"
          minH="100%"
          position="relative"
          pointerEvents="none"
          sx={{
            ".mapboxgl-ctrl-bottom-right": {
              position: "absolute",
              bottom: 2,
              right: 2,
              color: "white",
              fontSize: "xs",
              lineHeight: "short",
              fontWeight: 600,
            },
          }}
        >
          <MarketMap
            market={{ iso: frontmatter.iso, region: frontmatter.region, bbox }}
          />
        </Box>

        <SimpleGrid
          columns={4}
          gridGap={10}
          gridColumn={["1 / -1", null, null, "1 / span 4"]}
          gridRow="1"
          alignSelf={["end", null, null, "stretch"]}
          pt={[40, null, null, 0]}
          position="relative"
        >
          <Stack
            spacing={3}
            gridColumn="1 / -2"
            alignSelf="start"
            pt={[5, null, null, 40]}
            bg="white"
            pr={10}
            mr={-10}
          >
            <Text fontSize="lg" fontWeight={600} lineHeight="shorter">
              {data.region.name}
            </Text>
            <Heading textStyle="pageHeading">{frontmatter.market}</Heading>
            <Text textStyle="pageSubheading">{introduction}</Text>
          </Stack>
          <SimpleGrid
            columns={2}
            gridGap={10}
            bg="white"
            gridColumn="1 / -1"
            alignSelf="end"
            pt={10}
            mt={-10}
            pr={10}
            mr={-10}
          >
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Text textStyle="cardButtonHeading">{"Power score"}</Text>
                <Text textStyle="sectionHeading">{`${
                  Math.round(powerData.global.value * 100) / 100
                }/5`}</Text>
              </Stack>
              <Center bg="white" aspectRatio={1}>
                <RadarChart
                  data={relevantScores.topics
                    .filter((d) => d.id.startsWith("power-"))
                    .map((d) => ({ label: d.name, value: d.global.value }))}
                />
              </Center>
            </Stack>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Text textStyle="cardButtonHeading">{"Score over time"}</Text>
                <Text textStyle="sectionHeading">{`${
                  allScoreYears.slice(-1)[0]
                } - ${allScoreYears[0]}`}</Text>
              </Stack>
              <Center aspectRatio={1}>
                <SimpleGrid columns={4} gridGap={1} w="100%">
                  {timeSeries.map((d) => {
                    return (
                      <SimpleGrid
                        key={d.year}
                        columns={1}
                        gridGap={0}
                        gridTemplateRows={`repeat(${marketCount}, 0.125rem) 2.5rem`}
                        bg="gray.50"
                      >
                        <Box
                          bg="brand.500"
                          gridRow={`${d.global.rank} / span 1`}
                          position="relative"
                        >
                          <Center
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            bg="brand.500"
                            color="brand.1000"
                            w={8}
                            h={8}
                            fontWeight={600}
                            borderRadius="full"
                            border="0.125rem solid"
                            borderColor="white"
                          >
                            {d.global.rank}
                          </Center>
                        </Box>
                        <Center
                          gridRow="-2 / -1"
                          borderTop="0.125rem solid white"
                          color="gray.500"
                          fontWeight={600}
                        >
                          {d.year}
                        </Center>
                      </SimpleGrid>
                    )
                  })}
                </SimpleGrid>
              </Center>
            </Stack>
          </SimpleGrid>
        </SimpleGrid>
      </SimpleGrid>

      {/* <SimpleGrid columns={8} gridGap={10} pb={5}>
        <Box h="1rem" bg="gray.500" />
        <Box h="1rem" bg="gray.500" />
        <Box h="1rem" bg="gray.500" />
        <Box h="1rem" bg="gray.500" />
        <Box h="1rem" bg="gray.500" />
        <Box h="1rem" bg="gray.500" />
        <Box h="1rem" bg="gray.500" />
        <Box h="1rem" bg="gray.500" />
      </SimpleGrid> */}
    </Box>
  )
}
