import {
  Box,
  Stack,
  Heading,
  Text,
  AspectRatio,
  Tag,
  Wrap,
  WrapItem,
  Divider,
  Center,
} from "@chakra-ui/react"

import { Link, ButtonLink } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import MarketMap from "@components/pages/MarketPage/MarketBanner/MarketMap"
import RadarChart from "@components/RadarChart"
import { ChevronLeft } from "@components/Icon"

const MarketBanner = ({ market, summary, marketCounts }) => {
  return (
    <SimpleGrid columns={8} pb={20} gridRowGap={[5, null, null, 10]}>
      <Box
        gridColumn={[" 1/ span 8", null, null, "4 / span 5"]}
        gridRow="1"
        pointerEvents="none"
      >
        <AspectRatio ratio={[3 / 2, null, null, 1]}>
          <Box />
        </AspectRatio>
      </Box>
      <Box
        gridColumn={["1 / span 8", null, null, "4 / span 5"]}
        gridRow={["1", null, null, "1"]}
        pointerEvents="none"
        bg="teal.900"
        overflow="hidden"
      >
        <Box width={["100%", null, null, "115%"]} height="100%">
          <MarketMap market={market} />
        </Box>
      </Box>
      <Box
        gridColumn={["span 8", null, null, "1 / span 4"]}
        gridRow={["3", null, null, "1"]}
        zIndex={99}
        alignSelf="end"
      >
        <SimpleGrid columns={4}>
          <Stack
            spacing={[3, null, null, 6]}
            bg="white"
            gridColumn={["1 / -1", null, null, "1 / -2"]}
            pb={[5, null, null, 10]}
          >
            <Box
              fontWeight={600}
              _hover={{ color: "teal.500" }}
              _active={{ color: "teal.500" }}
              _focus={{ color: "teal.500" }}
            >
              <ButtonLink
                href="/results"
                variant="ghost"
                px="0"
                size="sm"
                colorScheme="gray"
                leftIcon={<ChevronLeft size="1.25rem" />}
                _hover={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
              >
                {"All markets"}
              </ButtonLink>
            </Box>
            <Heading variant="pageTitle">{market.name}</Heading>
            <Text fontSize={["md", null, "xl"]} color="gray.500">
              {summary}
            </Text>
            <Wrap spacing={2}>
              <WrapItem>
                <Tag colorScheme="gray">
                  {market.marketGrouping.slice(0, 1).toUpperCase() +
                    market.marketGrouping.slice(1) +
                    " markets"}
                </Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme="gray">{market.region.name}</Tag>
              </WrapItem>
            </Wrap>
          </Stack>
          <Box gridColumn="1 / -1" bg="white" boxShadow="2.5rem 0 0 #FFF">
            <SimpleGrid columns={2} py={[5, null, null, 10]}>
              {["power", "transport"].map((d) => {
                const sector = market.sectors.find((s) => s.id === d)

                if (!sector) {
                  return (
                    <Stack key={d} spacing={[3, null, null, 6]}>
                      <Stack spacing={2}>
                        <Heading
                          as="p"
                          textTransform="capitalize"
                          fontSize={["2xl", "3xl"]}
                        >
                          &nbsp;
                        </Heading>
                        <Text
                          as="h3"
                          fontWeight={600}
                          lineHeight="short"
                          color="gray.500"
                        >
                          {`${d[0].toUpperCase() + d.slice(1)} score`}
                        </Text>
                      </Stack>
                      <Divider />
                      <Center flex={1} bg="gray.25" color="gray.500">
                        &nbsp;
                      </Center>
                    </Stack>
                  )
                }

                const score = sector.data[0].value

                return (
                  <Stack key={d} spacing={[3, null, null, 6]}>
                    <Stack spacing={2}>
                      <Heading
                        as="p"
                        textTransform="capitalize"
                        fontSize={["2xl", "3xl"]}
                      >
                        {score ? (
                          `${score.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })} / 5`
                        ) : (
                          <>&nbsp;</>
                        )}
                      </Heading>
                      <Text
                        as="h3"
                        fontWeight={600}
                        lineHeight="short"
                        color="gray.500"
                      >
                        {`${sector.name} score`}
                      </Text>
                    </Stack>
                    <Divider />
                    <Box>
                      {score ? (
                        <Center>
                          <RadarChart
                            market={market}
                            sector={d}
                            padding={40}
                            size={175}
                            maxWidth="16rem"
                          />
                        </Center>
                      ) : marketCount ? (
                        <Text
                          fontSize="sm"
                          fontWeight={400}
                          color="gray.500"
                          lineHeight="short"
                        >
                          {`Only ${marketCounts.buildings} markets ${
                            market.marketGrouping === "emerging"
                              ? `(${marketCounts.emerging.buildings} emerging markets)`
                              : ""
                          } are scored on the Buildings sector. See the full list on the `}
                          <Link
                            href="/about/methodology"
                            color="brand.700"
                            fontWeight={600}
                          >
                            {"methodology page"}
                          </Link>
                          {"."}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Box>
                    {/* <Divider /> */}
                  </Stack>
                )
              })}
            </SimpleGrid>
            <Divider />
          </Box>
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  )
}

export default MarketBanner
