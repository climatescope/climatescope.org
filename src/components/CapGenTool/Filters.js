import { Box, HStack, Container } from "@chakra-ui/react"

import FiltersSidebar from "./FiltersSidebar"
import SelectedFilters from "./SelectedFilters"

export default function Filters() {
  return (
    <Box bg="gray.50">
      <Container>
        <HStack spacing={6} py={3}>
          <SelectedFilters />
          <FiltersSidebar />
        </HStack>
      </Container>
    </Box>
  )
}
