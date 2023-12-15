import { Center } from "@chakra-ui/layout"
import _sortBy from "lodash/sortBy"
import _groupBy from "lodash/groupBy"
import { useTheme } from "@chakra-ui/system"

import { useStore } from "@components/tools/RankOverTime/store"

export default function Market({ market }) {
  const { colors } = useTheme()
  const selectedMarket = useStore((state) => state.selectedMarket)
  const hoveredMarket = useStore((state) => state.hoveredMarket)

  const isSelected = selectedMarket === market.iso
  const isHovered = hoveredMarket === market.iso

  const setSelectedMarket = useStore((state) => state.setSelectedMarket)
  const setHoveredMarket = useStore((state) => state.setHoveredMarket)

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
    <Center
      h="1rem"
      style={{
        background: isSelected
          ? colors.teal[700]
          : isHovered
          ? colors.gray[300]
          : colors.gray[100],
        zIndex: isSelected ? 3 : isHovered ? 2 : 1,
      }}
      cursor="pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {(isSelected || isHovered) && (
        <Center
          w="2.5rem"
          h="2.5rem"
          bg="teal.700"
          color="white"
          borderRadius="full"
          fontWeight={600}
          style={{
            display: isSelected || isHovered ? "flex" : "none",
            background: isSelected ? colors.teal[700] : colors.gray[300],
          }}
        >
          {market.rank}
        </Center>
      )}
    </Center>
  )
}
