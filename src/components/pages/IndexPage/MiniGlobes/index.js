import {
  Heading,
  HStack,
  Box,
  AspectRatio,
  Center,
  Stack,
  Text,
  Container,
  useTheme,
} from "@chakra-ui/react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

import SimpleGrid from "@components/SimpleGrid"

function MiniGlobe({ rotate = [0, 0, 0] }) {
  const { colors } = useTheme()
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json"
  return (
    <ComposableMap
      width={800}
      height={800}
      projection="geoOrthographic"
      projectionConfig={{ scale: 390, rotate }}
      style={{ width: "100%", height: "100%" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => {
          return geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colors.brand[800]}
              />
            )
          })
        }}
      </Geographies>
    </ComposableMap>
  )
}

const MiniGlobesSection = ({ data }) => {
  const rotations = {
    "amer": [82, -8, 0],
    "eu": [-10, -45, 0],
    "mena": [-25, -20, 0],
    "asia": [-110, -10, 0],
  }
  const names = {
    "amer": "Americas",
    "eu": "Europe",
    "mena": "Middle East and North Africa",
    "asia": "Asia",
  }
  return (
    <Box
      position="relative"
      bg="teal.900"
      color="white"
      w="100vw"
      left="50%"
      transform="translateX(-50%)"
      py={20}
      style={{ marginTop: 0 }}
    >
      <Container>
        <SimpleGrid columns={2} bg="brand.900">
          <HStack
            gridColumn="1 / -1"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Stack spacing={3}>
              <Heading variant="sectionTitle">
                {"Renewable energy by region"}
              </Heading>
              <Text variant="sectionSubtitleLight">
                {"Share of renewable energy installed capacity by region in 2021"}
              </Text>
            </Stack>
            {/* <Link href="/" variant="section" display={["none", null, "flex"]}>
          {"All highlights"}
          <ChevronRight size={20} strokeWidth={2} />
        </Link> */}
          </HStack>
          <SimpleGrid columns={[1, 2, null, 4]} gridColumn="1 / -1" gridColumnGap={[10, null, 20]} gridRowGap={[10, null, 20]} py={10}>
            {data.map(({ region, value }) => {
              return (
                <Box key={region}>
                  <SimpleGrid columns={1}>
                    <Box gridColumn="1 / -1" gridRow="1">
                      <AspectRatio ratio={1}>
                        <Box
                          bgGradient="radial(brand.800, brand.900)"
                          borderRadius="full"
                          fontSize="2xl"
                          fontWeight={700}
                        >
                          <MiniGlobe rotate={rotations[region]} />
                        </Box>
                      </AspectRatio>
                    </Box>
                    <Center gridColumn="1 / -1" gridRow="1" zIndex={1}>
                      <Stack
                        spacing={2}
                        alignItems="center"
                        maxW="16rem"
                        textAlign="center"
                        p={10}
                      >
                        <Box
                          fontSize="md"
                          lineHeight="shorter"
                          textTransform="uppercase"
                          fontWeight={600}
                          textShadow="0 0 1rem rgba(0,0,0,0.1)"
                        >
                          {names[region] || ""}
                        </Box>
                        <Box
                          fontSize="5xl"
                          lineHeight="shorter"
                          fontWeight={600}
                          textShadow="0 0 1rem rgba(0,0,0,0.1)"
                        >{`${parseFloat(value).toLocaleString("en-us")}%`}</Box>
                      </Stack>
                    </Center>
                  </SimpleGrid>
                </Box>
              )
            })}

            {/* <Box>
          <AspectRatio ratio={1}>
            <Box
              bg="gray.25"
              borderRadius="full"
              fontSize="2xl"
              fontWeight={700}
            >
              <MiniGlobe rotate={[82, -8, 0]} />
            </Box>
          </AspectRatio>
        </Box>
        <Box>
          <AspectRatio ratio={1}>
            <Box
              bg="gray.25"
              borderRadius="full"
              fontSize="2xl"
              fontWeight={700}
            >
              <MiniGlobe rotate={[-10, -45, 0]} />
            </Box>
          </AspectRatio>
        </Box>
        <Box>
          <AspectRatio ratio={1}>
            <Box
              bg="gray.25"
              borderRadius="full"
              fontSize="2xl"
              fontWeight={700}
            >
              <MiniGlobe rotate={[-25, -10, 0]} />
            </Box>
          </AspectRatio>
        </Box>
        <Box>
          <AspectRatio ratio={1}>
            <Box
              bg="gray.25"
              borderRadius="full"
              fontSize="2xl"
              fontWeight={700}
            >
              <MiniGlobe rotate={[-110, -10, 0]} />
            </Box>
          </AspectRatio>
        </Box> */}
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default MiniGlobesSection
