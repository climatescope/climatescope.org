import { useMemo } from "react"
import { SimpleGrid, Center, Stack, HStack, Text, Box } from "@chakra-ui/layout"
import _sortBy from "lodash/sortBy"
import _groupBy from "lodash/groupBy"
import { Select } from "@chakra-ui/select"

import { useStore } from "@components/tools/RankOverTime/store"
import { marketGroups } from "@components/tools/RankOverTime/utils"
import Market from "@components/tools/RankOverTime/Market"
import MarketLabel from "@components/tools/RankOverTime/MarketLabel"

export default function RankingOverTime({ data, regions }) {
  const selectedRegion = useStore((state) => state.selectedRegion)
  const setSelectedRegion = useStore((state) => state.setSelectedRegion)

  const selectedMarketGroup = useStore((state) => state.selectedMarketGroup)
  const setSelectedMarketGroup = useStore(
    (state) => state.setSelectedMarketGroup
  )

  const { years, newMarkets } = useMemo(() => {
    const yearsData = [2021, 2022, 2023].map((year) => {
      const filteredMarkets = data
        .map((d) => ({ ...d, rank: d[year] || 0 }))
        .filter(
          (d) =>
            d.rank &&
            (selectedRegion ? d.regionName === selectedRegion : true) &&
            (selectedMarketGroup ? d.market === selectedMarketGroup : true)
        )
      const markets = _sortBy(filteredMarkets, (o) => o.rank).map((d, i) => ({
        ...d,
        rank: i + 1,
      }))
      return { year, markets }
    })
    const newMarkets = data.filter((d) => d.isNew)
    return { years: yearsData, newMarkets }
  }, [selectedRegion, selectedMarketGroup])

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value)
  }

  const handleMarketGroupChange = (e) => {
    setSelectedMarketGroup(e.target.value)
  }

  return (
    <Box>
      <HStack spacing={3} mb={3}>
        <Box color="gray.500" fontWeight={600}>
          {"Filter by"}
        </Box>
        <Box>
          <Select
            value={selectedRegion}
            onChange={handleRegionChange}
            variant="filled"
            colorScheme="gray"
          >
            {regions.map((region) => {
              return (
                <option key={region} value={region}>
                  {region || "All regions"}
                </option>
              )
            })}
          </Select>
        </Box>
        <Box>
          <Select
            value={selectedMarketGroup}
            onChange={handleMarketGroupChange}
            variant="filled"
            colorScheme="gray"
          >
            {marketGroups.map((marketGroup) => {
              return (
                <option key={marketGroup.key} value={marketGroup.key}>
                  {marketGroup.label}
                </option>
              )
            })}
          </Select>
        </Box>
      </HStack>

      <SimpleGrid
        columns={4}
        position="sticky"
        top={0}
        zIndex={10}
        bg="white"
        mb={3}
      >
        {years.map(({ year }) => (
          <Center
            key={year}
            h="3rem"
            fontWeight={600}
            borderBottom="0.125rem solid"
            borderColor="gray.200"
          >
            {year}
          </Center>
        ))}
        <HStack
          spacing={3}
          h="3rem"
          fontWeight={600}
          borderBottom="0.125rem solid"
          borderColor="gray.200"
          justifyContent="space-between"
        >
          <Box>{"2023 Rank"}</Box>
          <Box>{"2023 Score"}</Box>
        </HStack>
      </SimpleGrid>
      <SimpleGrid columns={4}>
        {years.map(({ year, markets }) => (
          <Stack key={year} spacing={1}>
            {markets.map((market) => (
              <Market key={market.iso} market={market} />
            ))}
          </Stack>
        ))}
        <Stack spacing={1}>
          {years.slice(-1)[0].markets.map((market) => (
            <MarketLabel key={market.iso} market={market} />
          ))}
        </Stack>
      </SimpleGrid>
      <Text mt={5} fontSize="sm" lineHeight="short" fontWeight={600} color="gray.500">
        {`*${newMarkets
          .map(
            (d, i) => (i === newMarkets.length - 1 ? " and " : "") + d.geography
          )
          .join(
            ", "
          )} were added to the Climatescope power ranking in 2023. They do not have scores and ranks for the previous years.`}
      </Text>
    </Box>
  )
}
