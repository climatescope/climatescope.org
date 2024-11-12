import { useRef, useEffect, useState } from "react"
import {
  Box,
  HStack,
  Stack,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Tooltip,
  useTheme,
  Divider,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import _sortBy from "lodash/sortBy"

import CustomTimeSlider from "@/components/TimeSlider"
import fetchDataset from "@/utils/api/client/fetchDataset"
// import DownloadChart from "@components/DownloadChart"

export default function TechnologiesCartogram() {
  const [regions, setRegions] = useState([])
  const [years, setYears] = useState([])
  const [currentYear, setCurrentYear] = useState("")
  const [extent, setExtent] = useState([
    { r: 0, popValue: 0 },
    { r: 0, popValue: 0 },
    { r: 0, popValue: 0 },
  ])
  const { colors } = useTheme()

  const chartRef = useRef(null)

  // const technologyColors = {
  //   // "Solar": colors.indicators["Solar"],
  //   "Solar PV": colors.indicators["Solar"],
  //   // "Hydro": colors.indicators["Hydro"],
  //   "Small Hydro": colors.indicators["Hydro"],
  //   "Large Hydro": colors.indicators["Hydro"],
  //   "Wind": colors.indicators["Wind"],
  //   "Biomass": colors.indicators["Biomass"],
  //   "Geothermal": colors.indicators["Geothermal"],
  //   "Other - non fossil": colors.indicators["Other - non fossil"],
  //   "Nuclear": colors.indicators["Nuclear"],
  //   "Gas": colors.indicators["Gas"],
  //   "Oil": colors.indicators["Oil"],
  //   "Coal": colors.indicators["Coal"],
  //   "Other - fossil": colors.indicators["Other - fossil"],
  //   "None": colors.gray[50],
  // }

  const technologyColors = {
    "Biomass & Waste": colors.indicators["Biomass"],
    "Coal": colors.indicators["Coal"],
    "Geothermal": colors.indicators["Geothermal"],
    "Marine": colors.indicators["Hydro"],
    "Natural Gas": colors.indicators["Gas"],
    "Nuclear": colors.indicators["Nuclear"],
    "Wind": colors.indicators["Wind"],
    "Oil & Diesel": colors.indicators["Oil"],
    "Other - fossil": "",
    "Small Hydro": colors.indicators["Hydro"],
    "Solar PV": colors.indicators["Solar"],
    // "Solar thermal": colors.gray[200],
    "Solar thermal": colors.yellow[600],
    "None": colors.gray[50],
  }

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    fetchDataset(
      "/data/most_popular_new_power_generating_technology_installed_2010_2022.txt"
    ).then((regions) => {
      const allYears = Object.keys(regions[0].markets[0].data).filter((d) =>
        parseInt(d)
      )

      // const scale = scaleSqrt().domain([1, 1500000000]).range([4, 50])

      setExtent([
        {
          r: 5,
          popValue: 500000,
          label: "500K",
        },
        {
          r: 25,
          popValue: 300000000,
          label: "300M",
        },
        {
          r: 48,
          popValue: 1400000000,
          label: "1.4Bn",
        },
      ])
      setYears(allYears)
      setCurrentYear(allYears.slice(-1)[0])
      setRegions(regions)
    })
  }, [])

  const handleChange = (year) => {
    setCurrentYear(year)
  }

  const width = 630
  const height = 330 + 10

  return (
    <Box>
      <Stack w="100%" spacing={6} alignItems="center">
        <Stack spacing={4} flex={1} alignItems="center" pb={5}>
          <Heading textStyle="sectionHeading">{`Power-generating technologies`}</Heading>
          <Text textStyle="sectionSubheading" maxW="45rem" textAlign="center">
            {`Most popular power-generating technologies added in ${currentYear} across emerging markets covered by Climatescope`}
          </Text>
        </Stack>
        <Wrap
          spacingX={5}
          spacingY={3}
          maxW="50rem"
          sx={{ "ul": { justifyContent: "center" } }}
        >
          {Object.entries(technologyColors).map((d) => {
            return (
              <WrapItem key={d[0]}>
                <HStack spacing={2}>
                  <Box
                    w="1.25rem"
                    h="1.25rem"
                    borderRadius="full"
                    style={{ background: d[1] || "transparent" }}
                  />
                  <Text as="span" fontSize="sm" fontWeight={500}>
                    {d[0]}
                  </Text>
                </HStack>
              </WrapItem>
            )
          })}
        </Wrap>
        <Box position="relative" userSelect="none" maxW="72rem" w="100%">
          <svg ref={chartRef} viewBox={`0 0 ${width} ${height}`}>
            {regions.map((region) => {
              return (
                <g key={region.id}>
                  {region.markets.map(({ iso, x, y, r, data, name }, i) => {
                    const showId = r > 8
                    const textValue = !data
                      ? "Not covered by Climatescope"
                      : data[currentYear] || "N/A"
                    const fill = technologyColors[textValue] || "#FFFFFF"
                    const textFill = [
                      "Not covered by Climatescope",
                      "None",
                      "N/A",
                      "Gas",
                      "Solar",
                    ].includes(textValue)
                      ? colors.gray[800]
                      : "#FFFFFF"
                    return (
                      <g key={iso} transform={`translate(${x} ${y})`}>
                        <Tooltip
                          label={data ? `${name} - ${textValue}` : null}
                          placement="top"
                          hasArrow
                        >
                          <g>
                            <motion.circle
                              stroke={
                                data && data[currentYear]
                                  ? "none"
                                  : colors.gray[200]
                              }
                              strokeWidth={0.75}
                              strokeDasharray={[2, 1]}
                              initial={{ opacity: 0, fill, r: 0 }}
                              animate={{
                                opacity: 1,
                                fill,
                                r,
                                transition: {
                                  r: { delay: i * 0.01 },
                                },
                              }}
                            />
                            {showId && (
                              <motion.text
                                textAnchor="middle"
                                alignmentBaseline="central"
                                fontSize={6}
                                fontWeight={600}
                                initial={{ opacity: 0, fill: textFill }}
                                animate={{
                                  opacity: 1,
                                  fill: textFill,
                                  transition: {
                                    opacity: { delay: i * 0.01 },
                                  },
                                }}
                              >
                                {name.length > Math.ceil(r) - 6
                                  ? iso.toUpperCase()
                                  : name}
                              </motion.text>
                            )}
                          </g>
                        </Tooltip>
                      </g>
                    )
                  })}
                </g>
              )
            })}

            <g
              transform={`translate(${(width / 5) * 4} ${
                height - extent[0].r - 10
              })`}
            >
              <circle
                r={extent[0].r}
                fill="none"
                stroke={colors.gray[300]}
                strokeWidth={0.5}
                strokeDasharray={[2, 1]}
              />
              <circle
                cy={-extent[1].r + extent[0].r}
                r={extent[1].r}
                fill="none"
                stroke={colors.gray[300]}
                strokeWidth={0.5}
                strokeDasharray={[2, 1]}
              />
              <circle
                cy={-extent[2].r + extent[0].r}
                r={extent[2].r}
                fill="none"
                stroke={colors.gray[300]}
                strokeWidth={0.5}
                strokeDasharray={[2, 1]}
              />
              <text
                textAnchor="middle"
                alignmentBaseline="hanging"
                fontSize={5}
                fontWeight={600}
                y={extent[0].r + 3}
                fill={colors.gray[800]}
              >
                {"POPULATION"}
              </text>
              <text
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize={5}
                fontWeight={600}
                y={-extent[0].r * 2}
                fill={colors.gray[400]}
              >
                {extent[0].label}
              </text>
              <text
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize={5}
                fontWeight={600}
                y={-extent[1].r * 2}
                fill={colors.gray[400]}
              >
                {extent[1].label}
              </text>
              <text
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize={5}
                fontWeight={600}
                y={-extent[2].r * 2}
                fill={colors.gray[400]}
              >
                {extent[2].label}
              </text>
            </g>
          </svg>
        </Box>
        <Box w="100%" maxW="72rem">
          {currentYear && (
            <CustomTimeSlider
              years={years}
              ticks={[2010, 2012, 2014, 2016, 2018, 2020, 2022]}
              value={parseInt(currentYear)}
              onChange={handleChange}
              name="Power-generating technologies time slider"
              bg="white"
            />
          )}
        </Box>
      </Stack>
    </Box>
  )
}
