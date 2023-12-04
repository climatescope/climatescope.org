import { useEffect, useState } from "react"
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

import CustomTimeSlider from "@components/CustomTimeSlider"

export default function TechnologiesCartogram() {
  const [regions, setRegions] = useState([])
  const [years, setYears] = useState([])
  const [currentYear, setCurrentYear] = useState("")
  const { colors } = useTheme()

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
        setYears(allYears)
        setCurrentYear(allYears.slice(-1)[0])
        setRegions(regions)
      })
  }, [])

  const handleChange = (year) => {
    setCurrentYear(year)
  }

  return (
    <Box>
      <Stack w="100%" spacing={6}>
        <Stack spacing={3}>
          <Heading variant="sectionTitle">
            {`Power-generating technologies`}
          </Heading>
          <Text variant="sectionSubtitle">
            {`Most popular power-generating technologies added in ${currentYear}`}
          </Text>
        </Stack>
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
          <svg viewBox="0 0 630 330">
            {regions.map((region) => {
              return (
                <g key={region.id}>
                  {region.markets.map(({ id, x, y, r, data, name }, i) => {
                    const showId = r > 8
                    const fill = technologyColors[data[currentYear]]
                    return (
                      <g key={id} transform={`translate(${x} ${y})`}>
                        <Tooltip
                          label={`${name} - ${data[currentYear] || "N/A"}`}
                          placement="top"
                          hasArrow
                        >
                          <g>
                            <motion.circle
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
                              <text
                                textAnchor="middle"
                                alignmentBaseline="central"
                                fontSize={6}
                                fontWeight={600}
                                fill="#FFF"
                              >
                                {name.length > Math.ceil(r) - 6
                                  ? id.toUpperCase()
                                  : name}
                              </text>
                            )}
                          </g>
                        </Tooltip>
                      </g>
                    )
                  })}
                </g>
              )
            })}
          </svg>
        </Box>
        <Box h="2.75rem">
          {currentYear && (
            <CustomTimeSlider
              years={years}
              value={currentYear}
              onChange={handleChange}
            />
          )}
        </Box>
      </Stack>
    </Box>
  )
}
