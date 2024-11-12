import { HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react"

export default function SelectedFilters() {
  return (
    <HStack spacing={2} flex={1} overflow="hidden" py={1}>
      <Tag>
        <TagLabel>{"Filter with something longer"}</TagLabel>
        <TagCloseButton />
      </Tag>
      <Tag>
        <TagLabel>{"Filter that is short"}</TagLabel>
        <TagCloseButton />
      </Tag>
      <Tag>
        <TagLabel>{"Shortest"}</TagLabel>
        <TagCloseButton />
      </Tag>
    </HStack>
  )
}
