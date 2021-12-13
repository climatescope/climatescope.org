import { useMemo, useState, useEffect } from "react"
import {
  Box,
  Heading,
  Text,
  Stack,
  HStack,
  AspectRatio,
  Divider,
  useTheme,
  Skeleton,
} from "@chakra-ui/react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { feature } from "topojson-client"
import { geoOrthographic } from "d3-geo"
import centroid from "@turf/centroid"
import shuffle from "lodash/shuffle"
import getConfig from "next/config"

import { Link, LinkBox, LinkOverlay } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import { useClientData } from "@utils/api/client"
import { ChevronRight, ArrowRight } from "@components/Icon"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

const geoUrl = `${basePath}/data/globe-insights-geo.json`

const getCentroid = ({ geometry }) => {
  if (!geometry) return [0, 0]
  return centroid(geometry).geometry?.coordinates?.map((d) => -d)
}

const MapPreview = ({ market, data, colors }) => {
  const selectedIso = market.iso.toUpperCase()

  const isSelected = ({ properties }) => properties.ISO_A2 === selectedIso

  const selectedGeo = data.features.find(isSelected)
  const coordinates = getCentroid(selectedGeo || {})

  const padding = 40

  const proj = geoOrthographic()
    .rotate([...coordinates, 0])
    .fitExtent(
      [
        [padding, padding],
        [400 - padding, 400 - padding],
      ],
      selectedGeo
    )

  return (
    <ComposableMap width={400} height={400} projection={proj}>
      <Geographies
        geography={[selectedGeo]}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <g key={geo.rsmKey}>
              <Geography
                geography={geo}
                fill="none"
                stroke={colors.teal[100]}
                strokeWidth={12}
                tabIndex="-1"
                vectorEffect="non-scaling-stroke"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
              <Geography
                geography={geo}
                fill="#FFF"
                stroke={colors.teal[700]}
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                paintOrder="stroke fill"
                tabIndex="-1"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            </g>
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}

const Markets = ({ markets, metaData }) => {
  const { colors } = useTheme()
  const [loaded, setLoaded] = useState(false)

  const { data, error } = useClientData(geoUrl)

  const gg = useMemo(() => {
    if (!data) return null
    return feature(data, data.objects[Object.keys(data.objects)[0]])
  }, [data])

  const filteredMarkets = useMemo(() => {
    return shuffle([
      ...markets.power,
      ...markets.transport,
      ...markets.buildings,
    ]).slice(0, 4)
  }, [])

  useEffect(() => {
    /**
     * Only load the cards on the client side
     */
    if (typeof window === "undefined") return
    setLoaded(true)
  }, [])

  return (
    <SimpleGrid as="section" columns={[4, null, null, 8]}>
      <HStack
        gridColumn="1 / -1"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Heading fontSize={["3xl", null, null, "4xl"]}>
          {"Emerging markets spotlight"}
        </Heading>
        <Link
          href="/results"
          variant="section"
          display={["none", null, "flex"]}
        >
          {"All markets"}
          <ChevronRight size={20} strokeWidth={2} />
        </Link>
      </HStack>
      {loaded ? (
        filteredMarkets.map((market) => {
          return (
            <LinkBox key={market.iso} gridColumn="span 2">
              <Stack spacing={4}>
                <AspectRatio ratio={1}>
                  <Box pointerEvents="none">
                    {gg ? (
                      <MapPreview market={market} data={gg} colors={colors} />
                    ) : null}
                  </Box>
                </AspectRatio>
                <Divider />
                <HStack justifyContent="space-between" alignItems="flex-start">
                  <Stack spacing={2}>
                    <Heading as="h2" fontSize="2xl">
                      <LinkOverlay
                        href={`/markets/${market.iso.toLowerCase()}`}
                      >
                        {market.name}
                      </LinkOverlay>
                    </Heading>
                    <HStack spacing={1}>
                      <Text
                        fontFamily="heading"
                        fontWeight={700}
                        fontSize="2xl"
                        color="brand.700"
                        lineHeight="shorter"
                      >
                        {`${market.rank}`}
                      </Text>
                      <Text color="gray.300" fontWeight="600">
                        {" / "}
                      </Text>
                      <Text color="gray.300" fontWeight="600">
                        {`${
                          metaData.marketCounts.emerging[
                            market.sector.toLowerCase()
                          ]
                        } in ${market.sector}`}
                      </Text>
                    </HStack>
                  </Stack>
                  <Box pt="0.1875rem">
                    <ArrowRight size={24} strokeWidth={2} />
                  </Box>
                </HStack>
              </Stack>
            </LinkBox>
          )
        })
      ) : (
        <>
          {[1, 2, 3, 4].map((d) => {
            return (
              <Stack key={d} spacing={3} gridColumn="span 2">
                <Skeleton
                  gridColumn="span 2"
                  h="8rem"
                  startColor="gray.50"
                  endColor="gray.100"
                />
                <Skeleton
                  gridColumn="span 2"
                  h="2.5rem"
                  startColor="gray.50"
                  endColor="gray.100"
                />
                <Skeleton
                  gridColumn="span 2"
                  h="1.25rem"
                  startColor="gray.50"
                  endColor="gray.100"
                />
              </Stack>
            )
          })}
        </>
      )}
    </SimpleGrid>
  )
}

export default Markets
