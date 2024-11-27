import { Box, HStack, Container } from "@chakra-ui/react"

import FiltersSidebar from "./FiltersSidebar"
import SelectedFilters from "./SelectedFilters"

export default function Filters() {
  return (
    <Box>
      <Container>
        <HStack
          spacing={6}
          py={3}
          borderY="0.0625rem solid"
          borderColor="gray.200"
        >
          <SelectedFilters />
          <FiltersSidebar />
        </HStack>
      </Container>
    </Box>
  )
}
