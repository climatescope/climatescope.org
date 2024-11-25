import { HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react"

import { useStore } from "./store"

export default function SelectedFilters() {
  const regions = useStore((state) => state.regions)
  const sectors = useStore((state) => state.sectors)

  const setPostFilters = useStore((state) => state.setPostFilters)

  return (
    <HStack spacing={2} flex={1} overflow="hidden" py={1}>
      {regions.map((region) => (
        <Tag key={region}>
          <TagLabel>{region}</TagLabel>
          <TagCloseButton
            onClick={() => {
              setPostFilters({
                regions: regions.filter((d) => d !== region),
              })
            }}
          />
        </Tag>
      ))}
      {sectors.map((sector) => (
        <Tag key={sector}>
          <TagLabel>{sector}</TagLabel>
          <TagCloseButton
            onClick={() => {
              setPostFilters({
                sectors: sectors.filter((d) => d !== sector),
              })
            }}
          />
        </Tag>
      ))}

      {/* <Tag>
        <TagLabel>{"Filter that is short"}</TagLabel>
        <TagCloseButton />
      </Tag>
      <Tag>
        <TagLabel>{"Shortest"}</TagLabel>
        <TagCloseButton />
      </Tag> */}
    </HStack>
  )
}
