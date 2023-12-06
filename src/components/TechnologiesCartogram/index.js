import { useRef, useEffect, useState } from "react"
import {
  Box,
  HStack,
  Stack,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout"
import { useTheme } from "@chakra-ui/system"
import { motion } from "framer-motion"
import { Tooltip } from "@chakra-ui/tooltip"
import _sortBy from "lodash/sortBy"

import CustomTimeSlider from "@components/CustomTimeSlider"
import DownloadChart from "@components/DownloadChart"

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

  const technologyColors = {
    "Solar": colors.indicators["Solar"],
    "Hydro": colors.indicators["Hydro"],
    "Wind": colors.indicators["Wind"],
    "Biomass": colors.indicators["Biomass"],
    "Geothermal": colors.indicators["Geothermal"],
    "Other - non fossil": colors.indicators["Other - non fossil"],
    "Nuclear": colors.indicators["Nuclear"],
    "Gas": colors.indicators["Gas"],
    "Oil": colors.indicators["Oil"],
    "Coal": colors.indicators["Coal"],
    "Other - fossil": colors.indicators["Other - fossil"],
    "None": colors.gray[50],
  }

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    fetch(
      "/data/most_popular_new_power_generating_technology_installed_2010_2022.json"
    )
      .then((res) => res.json())
      .then((regions) => {
        const allYears = Object.keys(regions[0].markets[0].data).filter(
          (d) => d !== "iso"
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
      <Stack w="100%" spacing={6}>
        <HStack spacing={3} alignItems="flex-start">
          <Stack spacing={3} flex={1}>
            <Heading variant="sectionTitle">
              {`Power-generating technologies`}
            </Heading>
            <Text variant="sectionSubtitle">
              {`Most popular power-generating technologies added in ${currentYear}`}
            </Text>
          </Stack>
          <DownloadChart
            chartRef={chartRef}
            title={`Power-generating technologies`}
            subtitle={`Most popular power-generating technologies added in ${currentYear}`}
            legend={Object.entries(technologyColors).map((d) => ({
              color: d[1],
              label: d[0],
            }))}
            padding={{ top: 48, bottom: 25, left: 0, right: 90 }}
          />
        </HStack>
        <Wrap spacingX={5} spacingY={0}>
          {Object.entries(technologyColors).map((d) => {
            return (
              <WrapItem key={d[0]}>
                <HStack spacing={2}>
                  <Box
                    w="1.25rem"
                    h="1.25rem"
                    borderRadius="full"
                    style={{ background: d[1] }}
                  />
                  <Text as="span" fontSize="sm" fontWeight={500}>
                    {d[0]}
                  </Text>
                </HStack>
              </WrapItem>
            )
          })}
        </Wrap>

        <Box position="relative" userSelect="none">
          <svg ref={chartRef} viewBox={`0 0 ${width} ${height}`}>
            {regions.map((region) => {
              return (
                <g key={region.id}>
                  {region.markets.map(({ id, x, y, r, data, name }, i) => {
                    const showId = r > 8
                    const textValue = data[currentYear] || "N/A"
                    const fill = technologyColors[textValue] || "#FFFFFF"
                    const textFill = ["None", "N/A", "Gas", "Solar"].includes(
                      textValue
                    )
                      ? colors.gray[800]
                      : "#FFFFFF"
                    return (
                      <g key={id} transform={`translate(${x} ${y})`}>
                        <Tooltip
                          label={`${name} - ${textValue}`}
                          placement="top"
                          hasArrow
                        >
                          <g>
                            <motion.circle
                              stroke={
                                data[currentYear] ? "none" : colors.gray[200]
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
                                  ? id.toUpperCase()
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
        <Box h="2.75rem">
          {currentYear && (
            <CustomTimeSlider
              years={years}
              value={currentYear}
              onChange={handleChange}
              name="Power-generating technologies time slider"
            />
          )}
        </Box>
      </Stack>
    </Box>
  )
}
