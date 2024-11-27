import {
  Box,
  Container,
  Wrap,
  WrapItem,
  HStack,
  Text,
  useTheme,
} from "@chakra-ui/react"

import { useStore } from "./store"

export default function Legend() {
  const { colors } = useTheme()

  const grouping = useStore((state) => state.grouping)
  const allRegions = useStore((state) => state.allRegions)
  const allSectors = useStore((state) => state.allSectors)

  const sectors = useStore((state) => state.sectors)
  const regions = useStore((state) => state.regions)

  const items = (grouping === "sector" ? allSectors : allRegions).filter(
    (d) => d.label
  )

  if (!items?.length) return null

  return (
    <Container>
      <Box borderY="0.0625rem solid" borderColor="gray.200" py={5}>
        <Wrap spacingX={5} spacingY={3}>
          {items.map((item) => {
            const background = colors.indicators[item.key] || colors.gray[500]
            if (
              grouping === "sector" &&
              sectors.length &&
              !sectors.includes(item.key)
            )
              return null
            if (
              grouping === "region_id" &&
              regions.length &&
              !regions.includes(item.key)
            )
              return null
            return (
              <WrapItem key={item.key}>
                <HStack gap={2}>
                  <Box w={5} h={5} style={{ background }} />
                  <Text as="span">{item.label}</Text>
                </HStack>
              </WrapItem>
            )
          })}
        </Wrap>
      </Box>
    </Container>
  )
}
