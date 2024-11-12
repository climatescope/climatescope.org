import { useEffect, useState } from "react"
import {
  Box,
  Stack,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  useTheme,
  Tooltip,
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react"
import { extent as d3extent } from "d3-array"
import { scaleLinear, scaleSqrt } from "d3-scale"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon } from "@chakra-ui/icons"
import _sortBy from "lodash/sortBy"

import fetchDataset from "@/utils/api/client/fetchDataset"

const regions = [
  { val: "", label: "All regions" },
  { val: "emea", label: "Europe" },
  { val: "mena", label: "Middle-East" },
  { val: "apac", label: "Asia-Pacific" },
  { val: "ssa", label: "Africa" },
  { val: "latam", label: "Latin America" },
]

export default function ETSTool() {
  const { colors } = useTheme()
  const regionColors = colors.regions
  const fallbackColor = colors.gray[500]

  const width = 800
  const height = width / 2

  const padding = { top: 40, bottom: 40, left: 40, right: 40 }

  const [year, setYear] = useState("2024")
  const [region, setRegion] = useState(regions[0])
  const [dataRaw, setData] = useState([])

  const years = [2021, 2022, 2023, 2024]
  const yearIndex = years.indexOf(parseInt(year))

  const data = dataRaw.filter((d) => {
    const hasRegion = region.val ? d.region_id === region.val : true
    const hasData = d.data[yearIndex]?.y_val && d.data[yearIndex]?.x_val
    return hasRegion && hasData
  })

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    fetchDataset("/data/ets-data.txt", "json").then((data) => {
      setData(data.filter((d) => d.iso !== "cn"))
    })
  }, [])

  // const y_max = d3max(data, (o) => o.data[yearIndex]?.y_val)
  // const x_max = d3max(data, (o) => o.data[yearIndex]?.x_val)

  // const y_extent = d3extent(data, (o) => o.data[yearIndex]?.y_val)
  // const x_extent = d3extent(data, (o) => o.data[yearIndex]?.x_val)

  const allXValues = dataRaw.flatMap((d) => d.data.map((dd) => dd.x_val || 0))
  const allRValues = dataRaw.flatMap((d) => d.data.map((dd) => dd.r_val || 0))

  const x_extent = d3extent(allXValues)

  // const r_extent = d3extent(data, (o) => o.data[yearIndex]?.r_val)
  const r_extent = d3extent(allRValues)

  const yScale = scaleLinear()
    .domain([0, 5])
    .range([height - padding.bottom, padding.top])

  const xScale = scaleSqrt()
    .domain([0, x_extent[1]])
    .range([padding.left, width - padding.right])

  const rScale = scaleSqrt()
    .domain([0, 0.0000001, r_extent[1]])
    .range([
      0,
      2,
      Math.min(padding.top, padding.bottom, padding.right, padding.left),
    ])

  return (
    <Stack>
      <Container>
        <HStack
          spacing={3}
          borderY="0.0625rem solid"
          borderColor="gray.200"
          py={3}
        >
          {/* <Box flex={1} color="gray.500">{`Showing ${data.length} market${
            data.length === 1 ? "" : "s"
          }`}</Box> */}
          <Box flex={1} color="gray.500" fontWeight={600}>
            {"Filters"}
          </Box>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="gray"
              rightIcon={<ChevronDownIcon boxSize={6} />}
              pr={3}
            >
              {year}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                value={`${year}`}
                onChange={(val) => {
                  setYear(val)
                }}
              >
                {years.map((y) => {
                  return (
                    <MenuItemOption key={y} value={`${y}`}>
                      {y}
                    </MenuItemOption>
                  )
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="gray"
              rightIcon={<ChevronDownIcon boxSize={6} />}
              pr={3}
            >
              {region.label}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                value={`${region.val}`}
                onChange={(val) => {
                  setRegion(regions.find((s) => s.val === val))
                }}
              >
                {regions.map((r) => {
                  return (
                    <MenuItemOption key={r.val} value={`${r.val}`}>
                      {r.label}
                    </MenuItemOption>
                  )
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
        <Box py={10}>
          <svg viewBox={`0 0 ${width} ${height}`}>
            <g stroke={colors.gray[200]} strokeWidth={0.5}>
              <line
                vectorEffect="non-scaling-stroke"
                x1={80}
                x2={width - 80}
                y1={height / 2}
                y2={height / 2}
              />
              <line
                vectorEffect="non-scaling-stroke"
                x1={width / 2}
                x2={width / 2}
                y1={24}
                y2={height - 24}
              />
            </g>

            <g fontSize={8} fontWeight={600} fill={colors.gray[500]}>
              <g transform={`translate(${width / 2} 10)`}>
                <line x1={0} x2={0} y1={-4} y2={-10} stroke={colors.gray[200]} />
                {/* <path d="M-4,4L0,0L4,4M0,0L0,8" stroke="#000" fill="none" /> */}
                <text textAnchor="middle" alignmentBaseline="hanging" y={1}>
                  {"Stronger enabling environment"}
                </text>
              </g>

              <g transform={`translate(${width / 2} ${height - 10})`}>
                <line x1={0} x2={0} y1={4} y2={10} stroke={colors.gray[200]} />
                <text textAnchor="middle" alignmentBaseline="baseline" y={-1}>
                  {"Weaker enabling environment"}
                </text>
              </g>

              <g transform={`translate(10 ${height / 2})`}>
                <line x1={-4} x2={-10} y1={0} y2={0} stroke={colors.gray[200]} />
                <text textAnchor="start" alignmentBaseline="central">
                  {"Less experience"}
                </text>
              </g>

              <g transform={`translate(${width - 10} ${height / 2})`}>
                <line x1={4} x2={10} y1={0} y2={0} stroke={colors.gray[200]} />
                <text textAnchor="end" alignmentBaseline="central">
                  {"More experience"}
                </text>
              </g>

              {/* <g transform="rotate(26) translate(10 0)">
                <line x1={-4} x2={-10} y1={0} y2={0} stroke="#000" />
                <text textAnchor="start" alignmentBaseline="central">
                  {"Enabled for market development"}
                </text>
              </g>

              <g
                transform={`translate(${width} ${height}) rotate(26) translate(-10 0)`}
              >
                <line x1={4} x2={10} y1={0} y2={0} stroke="#000" />
                <text textAnchor="end" alignmentBaseline="central">
                  {"Maintenance"}
                </text>
              </g>

              <g
                transform={`translate(0 ${height}) rotate(-26) translate(10 0)`}
              >
                <line x1={-4} x2={-10} y1={0} y2={0} stroke="#000" />
                <text textAnchor="start" alignmentBaseline="central">
                  {"Early stages"}
                </text>
              </g>

              <g
                transform={`translate(${width} 0) rotate(-26) translate(-10 0)`}
              >
                <line x1={4} x2={10} y1={0} y2={0} stroke="#000" />
                <text textAnchor="end" alignmentBaseline="central">
                  {"Enabled for private finance"}
                </text>
              </g> */}
            </g>

            <g opacity={0.8}>
              <AnimatePresence>
                {_sortBy(data, (o) => -o.data[yearIndex]?.r_val || 0).map(
                  (d) => {
                    const dd = d.data[yearIndex]
                    if (!dd.x_val || !dd.y_val) return null
                    const cx = xScale(dd.x_val) || 0
                    const cy = yScale(dd.y_val) || 0
                    const r = rScale(dd.r_val) || 0
                    const delay = cx / 2000
                    return (
                      <Tooltip
                        key={d.iso}
                        label={
                          <Stack spacing={2} p={3}>
                            <Box fontWeight={600}>{d.name}</Box>
                            <Divider borderColor="gray.500" />
                            <Stack spacing={0}>
                              <HStack
                                spacing={5}
                                justifyContent="space-between"
                              >
                                <Box>{`Investment (${dd.x_unit}):`}</Box>
                                <Box fontWeight={600}>
                                  {Math.round(dd.x_val * 100) / 100}
                                </Box>
                              </HStack>
                              <HStack
                                spacing={2}
                                justifyContent="space-between"
                              >
                                <Box>
                                  {dd.y_unit}
                                  {":"}
                                </Box>
                                <Box fontWeight={600}>
                                  {Math.round(dd.y_val * 100) / 100}
                                </Box>
                              </HStack>
                              <HStack
                                spacing={2}
                                justifyContent="space-between"
                              >
                                <Box>
                                  {`Renewables capacity (${dd.r_unit})`}
                                  {":"}
                                </Box>
                                <Box fontWeight={600}>
                                  {Math.round(dd.r_val * 100) / 100}
                                </Box>
                              </HStack>
                            </Stack>
                          </Stack>
                        }
                        hasArrow
                        placement="top"
                      >
                        <motion.circle
                          key={d.iso + "-motion"}
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill={regionColors[d.region_id] || fallbackColor}
                          stroke="#FFF"
                          strokeWidth={2}
                          paintOrder="stroke fill"
                          initial={{ cx, cy, r: 0 }}
                          animate={{ cx, cy, r }}
                          exit={{ cx, cy, r: 0 }}
                          transition={{
                            duration: 0.6,
                            bounce: 0,
                            type: "spring",
                            delay,
                          }}
                        />
                      </Tooltip>
                    )
                  }
                )}
              </AnimatePresence>
            </g>
          </svg>
        </Box>
        <HStack
          spacing={5}
          mb={5}
          borderY="0.0625rem solid"
          borderColor="gray.200"
          py={5}
        >
          {regions.slice(1).map((r) => {
            return (
              <HStack key={r.val} spacing={3}>
                <Box
                  w={5}
                  h={5}
                  borderRadius="full"
                  style={{
                    opacity: 0.8,
                    background: colors.regions[r.val] || colors.gray[500],
                  }}
                />
                <Box key={r.val} fontWeight={600}>
                  {r.label}
                </Box>
              </HStack>
            )
          })}
        </HStack>
        <Text mb={20} color="gray.500">
          {
            "Please note that the investment data presented in each year reflects investment trends from the five preceding years, not the year itself, and the capacity data presented in the 2024 filter reflects total renewables capacity by prior year-end."
          }
        </Text>
      </Container>
    </Stack>
  )
}
