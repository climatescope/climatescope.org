import { SimpleGrid as ChakraSimpleGrid } from "@chakra-ui/layout"

const SimpleGrid = ChakraSimpleGrid

SimpleGrid.defaultProps = {
  gridColumnGap: [6, null, 8, null, 10],
  gridRowGap: [6, null, 8, null, 10],
}

export default SimpleGrid
