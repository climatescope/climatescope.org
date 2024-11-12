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
  SimpleGrid,
} from "@chakra-ui/react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { animate, motion } from "framer-motion"

import CustomTimeSlider from "@/components/TimeSlider"
import SectionHeader from "@/components/SectionHeader"

function AnimatedCircle({ value = 0, thickness = 40 }) {
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
      projectionConfig={{ scale: 350, rotate }}
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

const MiniGlobesSection = ({ data = [] }) => {
  const allYears = Object.keys(data[0].data) || []
  const [currentYear, setCurrentYear] = useState(allYears.slice(-1)[0])

  const rotations = {
    "northamer": [82, -40, 0],
    "emea": [-30, -40, 0],
    "mena": [-40, -15, 0],
    "apac": [-110, -10, 0],
    "ssa": [-25, -5, 0],
    "latam": [68, 17, 0],
  }

  const handleChange = (year) => setCurrentYear(year)

  return (
    <Box
      as="section"
      position="relative"
      bg="black"
      color="white"
      w="100vw"
      left="50%"
      transform="translateX(-50%)"
      py={20}
    >
      <Container>
        <SimpleGrid columns={8} gridGap={10}>
          <HStack
            gridColumn={["1 / -1", null, "1 / -1"]}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <SectionHeader dividerColor="gray.500">
              <Heading textStyle="sectionHeading">
                {"Renewable energy by region"}
              </Heading>
              <Text textStyle="sectionSubheading">
                {`Share of installed renewable energy capacity by region in ${
                  currentYear || ""
                }, excluding Large Hydro`}
              </Text>
            </SectionHeader>
          </HStack>
          <HStack
            spacing={0}
            rowGap={10}
            gridColumn="1 / -1"
            flexWrap="wrap"
            justifyContent="center"
          >
            {data.map(({ region_id, region_name, data }) => {
              const value = data[currentYear] || 0
              return (
                <Box
                  key={region_id}
                  w={["100%", "50%", "33.333%"]}
                  flex="none"
                  px={5}
                >
                  <SimpleGrid columns={1}>
                    <Center gridColumn="1 / -1" gridRow="1">
                      <AspectRatio ratio={1} w="100%" maxW="16rem">
                        <Box
                          bgGradient="radial(brand.800, brand.900)"
                          borderRadius="full"
                          fontSize="2xl"
                          fontWeight={700}
                        >
                          <MiniGlobe
                            value={value}
                            rotate={rotations[region_id]}
                          />
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
                          {region_name || ""}
                        </Box>
                        <AnimatedNumberBox value={value} />
                      </Stack>
                    </Center>
                  </SimpleGrid>
                </Box>
              )
            })}
          </HStack>
          <Box gridColumn="1 / -1">
            <Box w="100%" maxW="72rem" mx="auto">
              <CustomTimeSlider
                years={allYears}
                value={currentYear}
                ticks={[2010, 2012, 2014, 2016, 2018, 2020, 2022]}
                onChange={handleChange}
                name="Renewable energy by region time slider"
                bg="black"
                sliderTrackProps={{ bg: "gray.700" }}
              />
            </Box>
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
      fontSize={["4xl", null, null, "5xl"]}
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
