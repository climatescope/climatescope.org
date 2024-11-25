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

  const regions = useStore(state => state.regions)
  const sectors = useStore(state => state.sectors)

  const filteredData = useStore((state) => state.filteredData)
  const { capacity, generation } = filteredData

  const { colors } = useTheme()

  const capacityScale = scaleLinear()
    .domain([0, 0.0000001, d3Max(capacity, (o) => o.total.value)])
    .range([0, 0.125, 30])

  const generationScale = scaleLinear()
    .domain([0, 0.0000001, d3Max(generation, (o) => o.total.value)])
    .range([0, 0.125, 30])

  const keyOverrides = {
    "mena": "Middle East",
    "emea": "Europe",
    "amer": "Northern America",
    "latam": "Latin America",
    "ssa": "Africa",
    "apac": "Asia-Pacific",
  }

  const postFilters = sectors.join("-") + "-" + regions.join("-")

  return (
    <Container>
      <AnimatePresence mode="wait">
        <SimpleGrid
          gridTemplateColumns={["1fr", null, null, "var(--custom-col-count)"]}
          gridGap={10}
          py={10}
          style={{
            "--custom-col-count": view === "capgen" ? "repeat(2, 1fr)" : "1fr",
          }}
        >
          {["capgen", "capacity"].includes(view) && (
            <MotionGrid
              key={`${view}-${year}-${grouping}-${postFilters}-capacity-visualization`}
              style={{ gridTemplateColumns: `repeat(${capacity.length}, 1fr)` }}
              gridGap={2}
            >
              {capacity.map((item, i) => {
                return (
                  <Stack gap={0} key={item.year} justifyContent="flex-end">
                    <Tooltip
                      p={0}
                      bg="white"
                      color="black"
                      label={
                        <Stack gap={2} p={3} direction="column-reverse">
                          {item.data.map((d) => {
                            return (
                              <HStack key={d.key} gap={10}>
                                <Box flex={1}>
                                  {keyOverrides[d.key] || d.key}
                                </Box>
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
                          >{`${item.year} installed capacity (MW)`}</Box>
                        </Stack>
                      }
                      placement={
                        i < capacity.length / 2 ? "right-start" : "left-start"
                      }
                    >
                      <MotionStack
                        tabIndex={0}
                        bg="gray.50"
                        gap="0.125rem"
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
                        {item.data.map((d, i) => {
                          const background = colors.indicators[d.key] || "#FFF"
                          return (
                            <MotionBox
                              key={d.key}
                              flex="none"
                              style={{
                                height: `${capacityScale(d.value)}rem`,
                                background,
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

          {["capgen", "generation"].includes(view) && (
            <MotionGrid
              key={`${view}-${year}-${grouping}-${postFilters}-generation-visualization`}
              style={{
                gridTemplateColumns: `repeat(${generation.length}, 1fr)`,
              }}
              gridGap={2}
            >
              {generation.map((item, i) => {
                return (
                  <Stack gap={0} key={item.year} justifyContent="flex-end">
                    <Tooltip
                      p={0}
                      bg="white"
                      color="black"
                      label={
                        <Stack gap={2} p={3} direction="column-reverse">
                          {item.data.map((d) => {
                            return (
                              <HStack key={d.key} gap={10}>
                                <Box flex={1}>
                                  {keyOverrides[d.key] || d.key}
                                </Box>
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
                          >{`${item.year} electricity generation (GWh)`}</Box>
                        </Stack>
                      }
                      placement={
                        i < capacity.length / 2 ? "right-start" : "left-start"
                      }
                    >
                      <MotionStack
                        tabIndex={0}
                        bg="gray.50"
                        gap="0.125rem"
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
                        {item.data.map((d, i) => {
                          const background = colors.indicators[d.key] || "#FFF"
                          return (
                            <MotionBox
                              key={d.key}
                              flex="none"
                              style={{
                                height: `${generationScale(d.value)}rem`,
                                background,
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
        </SimpleGrid>
      </AnimatePresence>
    </Container>
  )
}
