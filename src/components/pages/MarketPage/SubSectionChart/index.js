import { Box, Stack } from "@chakra-ui/react"
import groupBy from "lodash/groupBy"

import SimpleGrid from "@components/SimpleGrid"
import Indicator from "@components/pages/MarketPage/Indicator"
import CardTable from "@components/pages/MarketPage/CardTable"
import LineChart from "@components/pages/MarketPage/LineChart"
import AreaChart from "@components/pages/MarketPage/AreaChart"

const SubSectionWidget = ({ section, subSection, market }) => {
  const widget = `_${section}_${subSection}`

  const marketIndicators = market.indicators || []

  const groupedIndicators =
    groupBy(
      marketIndicators.filter((d) => d.section && d.subsection),
      (o) => `_${o.section}_${o.subsection}`
    ) || {}

  const dataIndicators =
    groupBy(
      marketIndicators.filter(
        (d) => d.indicator && (d.subindicators || d.data)
      ),
      (o) => o.indicator.toLowerCase().split(" ").join("_")
    ) || {}

  const {
    electricity_prices,
    electricity_generation,
    installed_capacity,
    investment_clean_energy,
  } = dataIndicators

  const investmentData = investment_clean_energy
    ? {
        indicator: "Investment",
        subindicators: investment_clean_energy.map((d) => ({
          subindicator: d.indicator,
          units: "M USD",
          data: d.data,
        })),
      }
    : null

  switch (widget) {
    case "_2_1":
      return (
        <Box gridColumn={["1 / -1", null, null, "2 / -2"]} py={5}>
          <CardTable data={market.policies} sector="Power" />
        </Box>
      )
    case "_2_2":
      return (
        <Box gridColumn={["1 / -1", null, null, "2 / -2"]} py={5}>
          <LineChart
            data={electricity_prices ? electricity_prices[0] || null : null}
          />
        </Box>
      )
    case "_2_3":
      return (
        <Box gridColumn="1 / -1" py={5}>
          <SimpleGrid columns={8}>
            <Box gridColumn={["span 8", null, null, "span 4"]}>
              <AreaChart
                data={installed_capacity ? installed_capacity[0] || null : null}
              />
            </Box>
            <Box gridColumn={["span 8", null, null, "span 4"]}>
              <AreaChart
                data={
                  electricity_generation
                    ? electricity_generation[0] || null
                    : null
                }
              />
            </Box>
            <Box gridColumn={["1 / -1", null, null, "2 / -2"]} py={5}>
              <LineChart data={investmentData} />
            </Box>
            {groupedIndicators["_2_3"] &&
              groupedIndicators["_2_3"].map((d, i) => {
                const key = `_${d.section}_${d.subsection}_${i}`
                return (
                  <Box key={key} gridColumn={["1 / -1", null, null, "2 / -2"]}>
                    <Indicator data={d} />
                  </Box>
                )
              })}
          </SimpleGrid>
        </Box>
      )
    case "_2_4":
      return (
        <Box gridColumn={["1 / -1", null, null, "2 / -2"]} py={5}>
          <Stack spacing={10}>
            {groupedIndicators["_2_4"] &&
              groupedIndicators["_2_4"].map((d, i) => {
                const key = `_${d.section}_${d.subsection}_${i}`
                return <Indicator key={key} data={d} />
              })}
          </Stack>
        </Box>
      )

    case "_3_1":
      return null
    // return (
    //   <Box gridColumn={["1 / -1", null, null, "2 / -2"]} py={5}>
    //     <LineChart />
    //   </Box>
    // )
    case "_3_2":
      return (
        <Box gridColumn="1 / -1" py={5}>
          <SimpleGrid columns={8}>
            <Box gridColumn={["1 / -1", null, null, "2 / -2"]}>
              <CardTable data={market.policies} sector="Transport" />
            </Box>
            {groupedIndicators["_3_2"] &&
              groupedIndicators["_3_2"].map((d, i) => {
                const key = `_${d.section}_${d.subsection}_${i}`
                return (
                  <Box key={key} gridColumn={["1 / -1", null, null, "2 / -2"]}>
                    <Indicator data={d} />
                  </Box>
                )
              })}
          </SimpleGrid>
        </Box>
      )
    case "_3_3":
      return (
        <Box gridColumn={["1 / -1", null, null, "1 / -1"]} py={5}>
          <SimpleGrid columns={8}>
            {groupedIndicators["_3_3"] &&
              groupedIndicators["_3_3"].map((d, i) => {
                const key = `_${d.section}_${d.subsection}_${i}`
                return (
                  <Box key={key} gridColumn={["span 8", null, null, "span 4"]}>
                    <Indicator data={d} />
                  </Box>
                )
              })}
          </SimpleGrid>
        </Box>
      )

    case "_4_1":
      return (
        <Box gridColumn="1 / -1" py={5}>
          <SimpleGrid columns={8}>
            {groupedIndicators["_4_1"] &&
              groupedIndicators["_4_1"].map((d, i) => {
                const key = `_${d.section}_${d.subsection}_${i}`
                return (
                  <Box key={key} gridColumn={["span 8", null, null, "span 4"]}>
                    <Indicator data={d} />
                  </Box>
                )
              })}
          </SimpleGrid>
        </Box>
      )
    case "_4_2":
      return (
        <Box gridColumn={["1 / -1", null, null, "2 / -2"]} py={5}>
          <CardTable data={market.policies} sector="Buildings" />
        </Box>
      )
    case "_4_3":
      return groupedIndicators["_4_3"] ? (
        <Box gridColumn={["1 / -1", null, null, "2 / -2"]} py={5}>
          <Indicator data={groupedIndicators["_4_3"]} />
        </Box>
      ) : null
    default:
      return null
  }
}

export default SubSectionWidget
