import { useRef, useState, useEffect } from "react"
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
import { animate, motion } from "framer-motion"

import SimpleGrid from "@components/SimpleGrid"
import CustomTimeSlider from "@components/CustomTimeSlider"

function AnimatedCircle({ value = 0, thickness = 20 }) {
  return (
    <motion.circle
      initial={{ pathLength: 0 }}
      animate={{
        pathLength: value / 100,
      }}
      cx={400}
      cy={400}
      r={400 - thickness / 2}
      fill="none"
      stroke="#FFF"
      strokeWidth={thickness}
      transform={`translate(400 400) rotate(-90) translate(-400 -400)`}
    />
  )
}

function MiniGlobe({ value, rotate = [0, 0, 0] }) {
  const { colors } = useTheme()
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json"
  return (
    <ComposableMap
      width={800}
      height={800}
      projection="geoOrthographic"
      projectionConfig={{ scale: 379, rotate }}
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
                tabIndex={-1}
              />
            )
          })
        }}
      </Geographies>
      <AnimatedCircle value={value} />
    </ComposableMap>
  )
}

const MiniGlobesSection = ({ data }) => {
  const allYears = Object.keys(data[0].values) || []
  const [currentYear, setCurrentYear] = useState(allYears.slice(-1)[0])
  const rotations = {
    "northamer": [82, -40, 0],
    "emea": [-30, -40, 0],
    "mena": [-40, -15, 0],
    "apac": [-110, -10, 0],
    "ssa": [-25, -5, 0],
    "latam": [68, 17, 0],
  }
  const names = {
    "northamer": "Northern America",
    "apac": "Asia-Pacific",
    "emea": "Europe",
    "mena": "Middle East",
    "ssa": "Africa",
    "latam": "Latin America",
  }

  const handleChange = (year) => setCurrentYear(year)

  return (
    <Box
      position="relative"
      bg="teal.900"
      color="white"
      w="100vw"
      left="50%"
      transform="translateX(-50%)"
      py={20}
    >
      <Container>
        <SimpleGrid columns={8}>
          <HStack
            gridColumn={["1 / -1", null, "1 / -1"]}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Stack spacing={3}>
              <Heading variant="sectionTitle">
                {"Renewable energy by region"}
              </Heading>
              <Text variant="sectionSubtitleLight">
                {`Share of installed renewable energy capacity by region in ${
                  currentYear || ""
                }, excluding Large Hydro`}
              </Text>
            </Stack>
          </HStack>
          <SimpleGrid
            columns={[1, 2, null, 3]}
            gridColumn={["1 / -1", null, "1 / -1"]}
            gridColumnGap={[10, null, 20]}
            gridRowGap={[10, null, 20]}
            py={10}
          >
            {data.map(({ region, values }) => {
              const value = values[currentYear] || 0
              return (
                <Box key={region}>
                  <SimpleGrid columns={1}>
                    <Center gridColumn="1 / -1" gridRow="1">
                      <AspectRatio ratio={1} w="100%" maxW="18rem">
                        <Box
                          bgGradient="radial(brand.800, brand.900)"
                          borderRadius="full"
                          fontSize="2xl"
                          fontWeight={700}
                        >
                          <MiniGlobe value={value} rotate={rotations[region]} />
                        </Box>
                      </AspectRatio>
                    </Center>
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
                        <AnimatedNumberBox value={value} />
                      </Stack>
                    </Center>
                  </SimpleGrid>
                </Box>
              )
            })}
          </SimpleGrid>
          <Box gridColumn="1 / -1">
            <CustomTimeSlider
              years={allYears}
              value={currentYear}
              bg="blackAlpha.300"
              onChange={handleChange}
              name="Renewable energy by region time slider"
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

function AnimatedNumberBox({ value }) {
  const boxRef = useRef(null)
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const node = boxRef.current
    if (!node) return undefined
    const currentValue = parseFloat(node.innerText) || 0
    animate(currentValue, value, {
      duration: 0.3,
      onUpdate: (v) => {
        const [n, m] = `${Math.round(v * 10) / 10}`.split(".")
        node.innerText = `${n || 0}.${m || 0}`
      },
    })
  }, [value])
  return (
    <Box
      fontSize="5xl"
      lineHeight="shorter"
      fontWeight={600}
      textShadow="0 0 1rem rgba(0,0,0,0.1)"
    >
      <span ref={boxRef} />
      <span>{"%"}</span>
    </Box>
  )
}

export default MiniGlobesSection
