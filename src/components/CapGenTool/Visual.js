import {
  Container,
  SimpleGrid,
  Grid,
  Stack,
  HStack,
  Box,
  useTheme,
  Tooltip,
  Divider,
  Text,
  Heading,
} from "@chakra-ui/react"
import { scaleLinear } from "d3-scale"
import { max as d3Max } from "d3-array"
import { AnimatePresence, motion } from "framer-motion"

import { useStore } from "./store"

const MotionGrid = motion(Grid)
const MotionStack = motion(Stack)
const MotionBox = motion(Box)

export default function Visual() {
  const view = useStore((state) => state.view)
  const year = useStore((state) => state.year)
  const grouping = useStore((state) => state.grouping)

  const regions = useStore((state) => state.regions)
  const sectors = useStore((state) => state.sectors)
  const countries = useStore((state) => state.countries)

  const capacityUnit = useStore((state) => state.capacityUnit)
  const generationUnit = useStore((state) => state.generationUnit)

  const filteredData = useStore((state) => state.filteredData)
  const { capacity, generation } = filteredData

  const { colors } = useTheme()

  const capacityMaxRaw = Math.max(
    1,
    Math.ceil(d3Max(capacity, (o) => o.total.value))
  )
  const capacityFactor = Math.pow(10, `${capacityMaxRaw}`.length - 2)
  const capacityMax =
    Math.ceil(capacityMaxRaw / capacityFactor) * capacityFactor

  const capacityScale = scaleLinear()
    // .domain([0, 0.0000001, capacityMax])
    .domain([0, capacityMax])
    // .range([0, 0.125, 30])
    .range([0, 30])

  // const generationMax = Math.round(d3Max(generation, (o) => o.total.value))

  const generationMaxRaw = Math.max(
    1,
    Math.ceil(d3Max(generation, (o) => o.total.value))
  )
  const generationFactor = Math.pow(10, `${generationMaxRaw}`.length - 2)
  const generationMax =
    Math.ceil(generationMaxRaw / generationFactor) * generationFactor

  const generationScale = scaleLinear()
    // .domain([0, 0.0000001, generationMax])
    .domain([0, generationMax])
    // .range([0, 0.125, 30])
    .range([0, 30])

  const keyOverrides = {
    "mena": "Middle East",
    "emea": "Europe",
    "amer": "Northern America",
    "latam": "Latin America",
    "ssa": "Africa",
    "apac": "Asia-Pacific",
  }

  const postFilters =
    sectors.join("-") + "-" + regions.join("-") + countries.join("-")

  return (
    <Container>
      <AnimatePresence mode="wait">
        <SimpleGrid
          gridTemplateColumns={["1fr", null, null, "var(--custom-col-count)"]}
          gridGap={20}
          py={16}
          style={{
            "--custom-col-count": view === "capgen" ? "repeat(2, 1fr)" : "1fr",
          }}
        >
          <Stack gap={10}>
            <Heading as="h2" textStyle="previewCardHeading">
              {`Installed capacity (${capacityUnit})`}
            </Heading>
            {["capgen", "capacity"].includes(view) && (
              <MotionGrid
                key={`${view}-${year}-${grouping}-${postFilters}-capacity-visualization`}
                style={{
                  gridTemplateColumns: `repeat(${capacity.length}, 1fr)`,
                }}
                gridGap={2}
                position="relative"
              >
                <Box
                  borderBottom="0.0625rem dashed"
                  borderColor="gray.200"
                  bottom="100%"
                  position="absolute"
                  left={0}
                  right={0}
                  fontSize="sm"
                  lineHeight="short"
                  color="gray.500"
                  mb="0.0625rem"
                  fontWeight={600}
                >
                  {capacityMax
                    ? `${capacityMax.toLocaleString("en-US")} ${capacityUnit}`
                    : ""}
                </Box>
                {capacityMax ? (
                  <>
                    <Box
                      top="25%"
                      left={0}
                      right={0}
                      borderBottom="0.0625rem dashed"
                      borderColor="gray.200"
                      position="absolute"
                    />
                    <Box
                      top="50%"
                      left={0}
                      right={0}
                      borderBottom="0.0625rem dashed"
                      borderColor="gray.200"
                      position="absolute"
                    />
                    <Box
                      top="75%"
                      left={0}
                      right={0}
                      borderBottom="0.0625rem dashed"
                      borderColor="gray.200"
                      position="absolute"
                    />
                    <Box
                      top="100%"
                      left={0}
                      right={0}
                      mt="0.0625rem"
                      borderBottom="0.0625rem solid"
                      borderColor="gray.200"
                      position="absolute"
                    />
                  </>
                ) : null}

                {capacity.map((item, i) => {
                  return (
                    <Stack
                      gap={0}
                      key={item.year}
                      justifyContent="flex-end"
                      style={{ height: capacityScale(capacityMax) + "rem" }}
                    >
                      <Tooltip
                        p={0}
                        bg="white"
                        color="black"
                        label={
                          <Stack gap={2} p={3}>
                            <Box
                              flex={1}
                              fontWeight={600}
                            >{`${item.year} installed capacity (${capacityUnit})`}</Box>
                            <Divider />
                            {item.data.map((d) => {
                              if (
                                grouping === "sector" &&
                                sectors.length &&
                                !sectors.includes(d.key)
                              )
                                return null

                              if (
                                grouping === "region_id" &&
                                regions.length &&
                                !regions.includes(d.key)
                              )
                                return null
                              return (
                                <HStack key={d.key} gap={10}>
                                  <HStack flex={1} gap={3}>
                                    <Box
                                      w={3}
                                      h={3}
                                      flex="none"
                                      style={{
                                        background: colors.indicators[d.key],
                                      }}
                                    />
                                    <Text>{keyOverrides[d.key] || d.key}</Text>
                                  </HStack>
                                  <Box
                                    style={{
                                      fontVariantNumeric: "tabular-nums",
                                    }}
                                  >
                                    {d.value.toLocaleString("en", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </Box>
                                </HStack>
                              )
                            })}
                          </Stack>
                        }
                        placement={
                          i < capacity.length / 2 ? "right-start" : "left-start"
                        }
                      >
                        <MotionStack
                          tabIndex={0}
                          bg="gray.50"
                          gap={0}
                          justifyContent="flex-end"
                          transformOrigin="bottom"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{
                            delay: i * 0.01,
                            duration: 0.3,
                            bounce: 0,
                            type: "spring",
                          }}
                          position="relative"
                          _hover={{
                            outline: "0.125rem solid #000",
                            outlineOffset: "0.125rem",
                          }}
                          _focusVisible={{
                            outline: "0.125rem solid #000",
                            outlineOffset: "0.125rem",
                          }}
                        >
                          {item.data.map((d) => {
                            const background =
                              colors.indicators[d.key] || "#FFF"
                            if (!d.value) return null
                            const h = capacityScale(d.value)
                            return (
                              <MotionBox
                                key={d.key}
                                flex="none"
                                style={{
                                  height: `${h}rem`,
                                  background,
                                  borderTop:
                                    h > 0.125 ? "0.0625rem solid #FFF" : "none",
                                }}
                              />
                            )
                          })}
                          <Box
                            position="absolute"
                            top="100%"
                            fontSize="xs"
                            fontWeight={600}
                            w="100%"
                            textAlign="center"
                            whiteSpace="nowrap"
                          >
                            {`'${item.year.slice(-2)}`}
                          </Box>
                        </MotionStack>
                      </Tooltip>
                    </Stack>
                  )
                })}
              </MotionGrid>
            )}
          </Stack>

          <Stack gap={10}>
            <Heading as="h2" textStyle="previewCardHeading">
              {`Electricity generation (${generationUnit})`}
            </Heading>

            {["capgen", "generation"].includes(view) && (
              <MotionGrid
                key={`${view}-${year}-${grouping}-${postFilters}-generation-visualization`}
                style={{
                  gridTemplateColumns: `repeat(${generation.length}, 1fr)`,
                }}
                gridGap={2}
                position="relative"
              >
                <Box
                  borderBottom="0.0625rem dashed"
                  borderColor="gray.200"
                  bottom="100%"
                  position="absolute"
                  left={0}
                  right={0}
                  fontSize="sm"
                  lineHeight="short"
                  color="gray.500"
                  mb="0.0625rem"
                  fontWeight={600}
                >
                  {generationMax
                    ? `${generationMax.toLocaleString(
                        "en-US"
                      )} ${generationUnit}`
                    : ""}
                </Box>
                {generationMax ? (
                  <>
                    <Box
                      top="25%"
                      left={0}
                      right={0}
                      borderBottom="0.0625rem dashed"
                      borderColor="gray.200"
                      position="absolute"
                    />
                    <Box
                      top="50%"
                      left={0}
                      right={0}
                      borderBottom="0.0625rem dashed"
                      borderColor="gray.200"
                      position="absolute"
                    />
                    <Box
                      top="75%"
                      left={0}
                      right={0}
                      borderBottom="0.0625rem dashed"
                      borderColor="gray.200"
                      position="absolute"
                    />
                    <Box
                      top="100%"
                      left={0}
                      right={0}
                      mt="0.0625rem"
                      borderBottom="0.0625rem solid"
                      borderColor="gray.200"
                      position="absolute"
                    />
                  </>
                ) : null}

                {generation.map((item, i) => {
                  return (
                    <Stack
                      gap={0}
                      key={item.year}
                      justifyContent="flex-end"
                      style={{ height: generationScale(generationMax) + "rem" }}
                    >
                      <Tooltip
                        p={0}
                        bg="white"
                        color="black"
                        label={
                          <Stack gap={2} p={3} direction="column-reverse">
                            {item.data.map((d) => {
                              if (
                                grouping === "sector" &&
                                sectors.length &&
                                !sectors.includes(d.key)
                              )
                                return null

                              if (
                                grouping === "region_id" &&
                                regions.length &&
                                !regions.includes(d.key)
                              )
                                return null

                              return (
                                <HStack key={d.key} gap={10}>
                                  <HStack flex={1} gap={3}>
                                    <Box
                                      w={3}
                                      h={3}
                                      flex="none"
                                      style={{
                                        background: colors.indicators[d.key],
                                      }}
                                    />
                                    <Text>{keyOverrides[d.key] || d.key}</Text>
                                  </HStack>
                                  <Box
                                    style={{
                                      fontVariantNumeric: "tabular-nums",
                                    }}
                                  >
                                    {d.value.toLocaleString("en", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </Box>
                                </HStack>
                              )
                            })}
                            <Divider />
                            <Box
                              flex={1}
                              fontWeight={600}
                            >{`${item.year} electricity generation (${generationUnit})`}</Box>
                          </Stack>
                        }
                        placement={
                          i < capacity.length / 2 ? "right-start" : "left-start"
                        }
                      >
                        <MotionStack
                          tabIndex={0}
                          bg="gray.50"
                          gap={0}
                          justifyContent="flex-end"
                          transformOrigin="bottom"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{
                            delay: i * 0.01,
                            duration: 0.3,
                            bounce: 0,
                            type: "spring",
                          }}
                          position="relative"
                          _hover={{
                            outline: "0.125rem solid #000",
                            outlineOffset: "0.125rem",
                          }}
                          _focusVisible={{
                            outline: "0.125rem solid #000",
                            outlineOffset: "0.125rem",
                          }}
                        >
                          {item.data.map((d) => {
                            const background =
                              colors.indicators[d.key] || "#FFF"
                            const h = generationScale(d.value)
                            return (
                              <MotionBox
                                key={d.key}
                                flex="none"
                                style={{
                                  height: `${h}rem`,
                                  background,
                                  borderTop:
                                    h > 0.125 ? "0.0625rem solid #FFF" : "none",
                                }}
                              />
                            )
                          })}
                          <Box
                            position="absolute"
                            top="100%"
                            fontSize="xs"
                            fontWeight={600}
                            w="100%"
                            textAlign="center"
                            whiteSpace="nowrap"
                          >
                            {`'${item.year.slice(-2)}`}
                          </Box>
                        </MotionStack>
                      </Tooltip>
                    </Stack>
                  )
                })}
              </MotionGrid>
            )}
          </Stack>
        </SimpleGrid>
      </AnimatePresence>
    </Container>
  )
}
