import { HStack, Box } from "@chakra-ui/layout"
import _sortBy from "lodash/sortBy"
import _groupBy from "lodash/groupBy"
import { useTheme } from "@chakra-ui/system"

import { useStore } from "@components/tools/RankOverTime/store"
import { missingNames } from "@components/tools/RankOverTime/utils"

export default function MarketLabel({ market }) {
  const { colors } = useTheme()
  const hoveredMarket = useStore((state) => state.hoveredMarket)
  const selectedMarket = useStore((state) => state.selectedMarket)
  const setSelectedMarket = useStore((state) => state.setSelectedMarket)
  const setHoveredMarket = useStore((state) => state.setHoveredMarket)

  const isSelected = selectedMarket === market.iso
  const isHovered = hoveredMarket === market.iso

  const handleMouseEnter = () => {
    setHoveredMarket(market.iso)
  }

  const handleMouseLeave = () => {
    setHoveredMarket("")
  }

  const handleClick = () => {
    setSelectedMarket(selectedMarket === market.iso ? "" : market.iso)
  }

  return (
    <HStack
      h="1rem"
      cursor="pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        color: isSelected
          ? colors.teal[700]
          : isHovered
          ? colors.gray[800]
          : colors.gray[500],
        background: isHovered ? colors.gray[100] : "white",
      }}
    >
      <Box fontSize="xs" textTransform="uppercase" fontWeight={600} flex="none">
        {market.rank}
      </Box>
      <Box
        fontSize="xs"
        textTransform="uppercase"
        fontWeight={600}
        flex={1}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {market.geography || missingNames[market.iso] || market.iso}
      </Box>
      <Box fontSize="xs" fontWeight={600} flex="none">
        {market.latestScoreValue.toLocaleString("en-us", {
          minimumFractionDigits: 2,
        })}
      </Box>
    </HStack>
  )
}
