import { create } from "zustand"
import { memo } from "react"
import {
  SimpleGrid,
  Container,
  Center,
  HStack,
  Stack,
  Box,
  useTheme,
  Divider,
} from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"

const useRankOverTimeStore = create((set, get) => ({
  highlightedMarket: "",
  selectedMarket: "",
  setHighlightedMarket: (highlightedMarket) => {
    set({ highlightedMarket })
  },
  setSelectedMarket: (selectedMarket) => {
    set({ selectedMarket })
  },
}))

const years = [2021, 2022, 2023, 2024]

export default function RankOverTimeTool({ data }) {
  const rankings = years.map((year) => {
    const items = _sortBy(
      data.reduce((acc, cur) => {
        const relevantData = cur.score?.find(
          (s) => parseInt(s.year) === parseInt(year)
        )
        if (relevantData) acc.push({ ...cur, relevantData })
        return acc
      }, []),
      (o) => parseFloat(o.relevantData.global.rank) || 0
    )
    return { year, items }
  })

  return (
    <Container>
      <SimpleGrid
        columns={4}
        gridGap={10}
        pb={20}
        borderTop="0.0625rem solid"
        borderColor="gray.200"
      >
        {rankings.map((ranking) => {
          return (
            <Stack spacing={3} key={ranking.year} pt={3}>
              <Center fontWeight={600}>{ranking.year}</Center>
              <Divider />
              {ranking.items.map((item) => {
                return <Item key={item.iso} item={item} />
              })}
            </Stack>
          )
        })}
      </SimpleGrid>
    </Container>
  )
}

const Item = memo(({ item }) => {
  const highlightedMarket = useRankOverTimeStore(
    (state) => state.highlightedMarket
  )
  const selectedMarket = useRankOverTimeStore((state) => state.selectedMarket)
  const setHighlightedMarket = useRankOverTimeStore(
    (state) => state.setHighlightedMarket
  )
  const setSelectedMarket = useRankOverTimeStore(
    (state) => state.setSelectedMarket
  )

  const { colors } = useTheme()

  const handleMouseEnter = () => {
    setHighlightedMarket(item.iso)
  }

  const handleMouseLeave = () => {
    setHighlightedMarket("")
  }

  const handleClick = () => {
    setSelectedMarket(item.iso)
  }

  const isHighlighted = highlightedMarket === item.iso
  const isSelected = selectedMarket === item.iso

  return (
    <HStack
      fontSize="sm"
      fontWeight={600}
      pr={2}
      spacing={2}
      h={8}
      cursor="pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      userSelect="none"
      style={{
        background: isSelected
          ? colors.brand[500]
          : isHighlighted
          ? colors.gray[200]
          : colors.gray[100],
      }}
    >
      <Center w={8} h={8} borderRight="0.0625rem solid" borderColor="white">
        {item.relevantData.global.rank}
      </Center>
      <Box>{item.market}</Box>
    </HStack>
  )
})
