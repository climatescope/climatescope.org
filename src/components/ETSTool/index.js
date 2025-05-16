import { useEffect, useState, useRef } from "react"
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
import { ChevronDownIcon } from "@chakra-ui/icons"
import _groupBy from "lodash/groupBy"
import { useDebounceCallback, useResizeObserver } from "usehooks-ts"
import { scaleLinear, scaleSqrt } from "d3-scale"
import { extent as d3extent } from "d3-array"
import { AnimatePresence, motion } from "framer-motion"

import fetchDataset from "@/utils/api/client/fetchDataset"

const technologies = [
  { val: "all", label: "All technologies" },
  { val: "solar-pv", label: "Solar PV" },
  { val: "onshore-wind", label: "Onshore wind" },
]

const regions = [
  { val: "all", label: "All regions" },
  { val: "emea", label: "Europe" },
  { val: "mena", label: "Middle-East" },
  { val: "apac", label: "Asia-Pacific" },
  { val: "ssa", label: "Africa" },
  { val: "latam", label: "Latin America" },
]

const years = ["2021", "2022", "2023", "2024"]

export default function ETSTool() {
  const [technology, setTechnology] = useState(technologies[0])
  const [region, setRegion] = useState(regions[0])
  const [year, setYear] = useState(years.slice(-1)[0])

  const [domain, setDomain] = useState({})
  const [data, setData] = useState({})

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    Promise.all([
      fetchDataset("/data/ets-data-wind.txt", "json"),
      fetchDataset("/data/ets-data-solar.txt", "json"),
      fetchDataset("/data/ets-data.txt", "json"),
    ]).then((allDatasets) => {
      const onshoreWindByGeo = allDatasets[0].filter((d) => d.iso !== "cn")
      const solarByGeo = allDatasets[1].filter((d) => d.iso !== "cn")

      console.log(solarByGeo)

      const etsParsed = allDatasets[2]
        .map((d) => {
          return {
            ...d,
            data: d.data.reduce((acc, cur) => {
              acc[`${cur.year}`] = cur
              return acc
            }, {}),
          }
        })
        .filter((d) => !!d && !!d.name)
        .filter((d) => d.iso !== "cn")

      setData({
        "onshore-wind": {
          all: onshoreWindByGeo,
          ..._groupBy(onshoreWindByGeo, (o) => o.region_id),
        },
        "solar-pv": {
          all: solarByGeo,
          ..._groupBy(solarByGeo, (o) => o.region_id),
        },
        "all": {
          all: etsParsed,
          ..._groupBy(etsParsed, (o) => o.region_id),
        },
      })

      setDomain({
        "onshore-wind": {
          x: d3extent(onshoreWindByGeo, (o) => o.data["2024"].x_val || 0),
          y: d3extent(onshoreWindByGeo, (o) => o.data["2024"].y_val || 0),
          r: d3extent(onshoreWindByGeo, (o) => o.data["2024"].r_val || 0),
        },
        "solar-pv": {
          x: d3extent(solarByGeo, (o) => o.data["2024"].x_val || 0),
          y: d3extent(solarByGeo, (o) => o.data["2024"].y_val || 0),
          r: d3extent(solarByGeo, (o) => o.data["2024"].r_val || 0),
        },
        "all": {
          x: d3extent(
            etsParsed.flatMap((d) =>
              Object.entries(d.data).map((d) => d[1].x_val || 0)
            )
          ),
          y: d3extent(
            etsParsed.flatMap((d) =>
              Object.entries(d.data).map((d) => d[1].y_val || 0)
            )
          ),
          r: d3extent(
            etsParsed.flatMap((d) =>
              Object.entries(d.data).map((d) => d[1].r_val || 0)
            )
          ),
        },
      })
    })
  }, [])

  const dataset = data[technology.val]?.[region.val]?.map((d) => ({
    ...d,
    data: technology.val === "all" ? d.data[year] : d.data["2024"],
  }))

  return (
    <Container>
      <Stack gap={10}>
        <HStack gap={3}>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="gray"
              minW="12.5rem"
              textAlign="left"
              rightIcon={<ChevronDownIcon boxSize={6} />}
            >
              {technology.label}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                value={technology.val}
                onChange={(val) => {
                  setTechnology(technologies.find((s) => s.val === val))
                  if (val !== "all") setYear("2024")
                }}
              >
                {technologies.map(({ val, label }) => (
                  <MenuItemOption value={val} key={label}>
                    {label}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="gray"
              minW="11.25rem"
              textAlign="left"
              rightIcon={<ChevronDownIcon boxSize={6} />}
            >
              {region.label}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                value={region.val}
                onChange={(val) => {
                  setRegion(regions.find((s) => s.val === val))
                }}
              >
                {regions.map(({ val, label }) => (
                  <MenuItemOption value={val} key={label}>
                    {label}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="gray"
              minW="6.5rem"
              textAlign="left"
              rightIcon={<ChevronDownIcon boxSize={6} />}
              isDisabled={technology.val !== "all"}
            >
              {year}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                value={year}
                onChange={(val) => setYear(val)}
              >
                {years.map((year) => (
                  <MenuItemOption value={`${year}`} key={year}>
                    {year}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
        <BubbleChart
          technology={technology}
          region={region}
          year={year}
          data={dataset}
          domain={domain}
        />
        <Legend regions={regions} />
        <Footnote />
      </Stack>
    </Container>
  )
}

function Legend({ regions }) {
  const { colors } = useTheme()
  const regionColors = colors.regions
  const fallbackColor = colors.gray[500]
  return (
    <HStack
      gap={6}
      overflowX="scroll"
      borderY="0.0625rem solid"
      borderColor="gray.200"
      py={4}
    >
      {regions.slice(1).map(({ label, val }) => (
        <HStack key={label} flex="none" fontWeight={600} gap={3}>
          <Box
            w={5}
            h={5}
            borderRadius="full"
            style={{ background: regionColors[val] || fallbackColor }}
          />
          <Text as="span">{label}</Text>
        </HStack>
      ))}
    </HStack>
  )
}

const useChartDimensions = ({ ref = null, ratio = 2 }) => {
  const [{ width }, setSize] = useState({
    width: 0,
    height: 0,
  })
  const onResize = useDebounceCallback(setSize, 300)
  useResizeObserver({
    ref,
    box: "border-box",
    onResize,
  })
  return { width, height: width / ratio }
}

function BubbleChart({ technology, region, year, data, domain }) {
  const ref = useRef(null)
  const ratio = 16 / 9
  const { width, height } = useChartDimensions({ ref, ratio })

  const padding = { top: 40, bottom: 40, left: 40, right: 40 }

  const { colors } = useTheme()
  const regionColors = colors.regions
  const fallbackColor = colors.gray[500]

  const x_extent = domain[technology.val]?.x || [0, 0]
  const y_extent = domain[technology.val]?.y || [0, 0]
  const r_extent = domain[technology.val]?.r || [0, 0]

  const yScale = scaleLinear()
    // .domain([0, y_extent[1]])
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

  const labels = [
    {
      label: {
        all: "Higher fundamentals score",
        "solar-pv": "Higher enabling environment",
        "onshore-wind": "Higher enabling environment",
      },
      x: width / 2,
      y: padding.top,
      anchor: "middle",
    },
    {
      label: {
        all: "Lower fundamentals score",
        "solar-pv": "Lower enabling environment",
        "onshore-wind": "Lower enabling environment",
      },
      x: width / 2,
      y: height - padding.bottom,
      anchor: "middle",
    },
    {
      label: {
        all: "Higher investment",
        "solar-pv": "Higher experience",
        "onshore-wind": "Higher experience",
      },
      x: width - padding.right,
      y: height / 2,
      anchor: "end",
    },
    {
      label: {
        all: "Lower investment",
        "solar-pv": "Lower experience",
        "onshore-wind": "Lower experience",
      },
      x: padding.left,
      y: height / 2,
      anchor: "start",
    },
  ]

  return (
    <Box ref={ref} style={{ aspectRatio: ratio }}>
      {width && height ? (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          style={{ width: "100%", height: "auto" }}
        >
          <path
            d={`M${padding.left},${padding.top}L${width - padding.right},${
              padding.top
            }L${width - padding.right},${height - padding.bottom}L${
              padding.left
            },${height - padding.bottom}Z`}
            stroke={colors.gray[100]}
            fill="none"
          />
          <path
            d={`M${0},${height / 2}L${width},${height / 2}M${width / 2},${0}L${
              width / 2
            },${height}`}
            stroke="#FFF"
            strokeWidth={4}
          />
          <path
            d={`M${0},${height / 2}L${width},${height / 2}M${width / 2},${0}L${
              width / 2
            },${height}`}
            stroke={colors.gray[300]}
          />

          {labels.map(({ label, x, y, anchor }) => {
            return (
              <text
                key={label[technology.val]}
                x={x}
                y={y}
                textAnchor={anchor}
                alignmentBaseline="central"
                stroke="#FFF"
                strokeWidth={8}
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                {label[technology.val]}
              </text>
            )
          })}
          {labels.map(({ label, x, y, anchor }) => {
            return (
              <text
                key={label[technology.val]}
                x={x}
                y={y}
                textAnchor={anchor}
                alignmentBaseline="central"
              >
                {label[technology.val]}
              </text>
            )
          })}

          <AnimatePresence>
            {data?.map((d) => {
              const hasData = d.data.x_val && d.data.y_val
              if (!hasData) return null
              const cx = xScale(d.data.x_val) || 0
              const cy = yScale(d.data.y_val) || 0
              const r = rScale(d.data.r_val) || 0
              const delay = cx / 2000
              return (
                <Tooltip
                  key={d.iso}
                  label={
                    <Stack spacing={2} p={3}>
                      <Box fontWeight={600}>{d.name}</Box>
                      <Divider borderColor="gray.500" />
                      <Stack spacing={0}>
                        <HStack spacing={5} justifyContent="space-between">
                          <Box>
                            {technology.val === "all"
                              ? `Investment (${d.data.x_unit}):`
                              : d.data.x_unit}
                          </Box>
                          <Box fontWeight={600}>
                            {(
                              Math.round(d.data.x_val * 100) / 100
                            ).toLocaleString("en-US")}
                          </Box>
                        </HStack>
                        <HStack spacing={2} justifyContent="space-between">
                          <Box>
                            {d.data.y_unit}
                            {":"}
                          </Box>
                          <Box fontWeight={600}>
                            {(
                              Math.round(d.data.y_val * 100) / 100
                            ).toLocaleString("en-US")}
                          </Box>
                        </HStack>
                        <HStack spacing={2} justifyContent="space-between">
                          {/* <Box>
                            {`Renewables capacity (${d.data.r_unit})`}
                            {":"}
                          </Box> */}
                          <Box>
                            {`Capacity (MW)`}
                            {":"}
                          </Box>
                          <Box fontWeight={600}>
                            {(
                              Math.round(d.data.r_val * 100) / 100
                            ).toLocaleString("en-US")}
                          </Box>
                        </HStack>
                      </Stack>
                    </Stack>
                  }
                  hasArrow
                  placement="top"
                >
                  <motion.circle
                    key={d.iso + technology.val + " - motion"}
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
            })}
          </AnimatePresence>
        </svg>
      ) : null}
    </Box>
  )
}

function Footnote() {
  return (
    <Text color="gray.500">
      {
        "Adjusted axis for visualization. Bubble size refers to the country’s total installed capacity of the selected technology. ‘Enabling environment’ based on Climatescope 2024 “market enabling environment” score. ‘Experience’ refers to the share of overall capacity the technology accounts for in a country, its electrification rate, and share of private investment in the technology. MW refers to megawatts. 'All technologies' includes: Solar, Wind, Biomass and waste, Small hydro and Geothermal."
      }
    </Text>
  )
}
