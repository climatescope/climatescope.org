import { Box, Heading, Text } from "@chakra-ui/react"

import GeographyComparison from "@components/tools/GeographyComparison"
import TableauWidget from "@components/TableauWidget"

const components = {
  GeographyComparison: (props) => {
    return (
      <Box w="100%">
        <GeographyComparison {...props} />
      </Box>
    )
  },
  TableauWidget: (props) => {
    return (
      <Box w="100%">
        <TableauWidget {...props} />
      </Box>
    )
  },
  h1: (props) => {
    return (
      <Heading
        as="h1"
        w="100%"
        fontSize={["3xl", null, "5xl"]}
        maxW="container.sm"
        sx={{
          "h1 + p": {
            fontSize: ["lg", null, "2xl"],
            lineHeight: "short",
            fontWeight: 500,
          },
        }}
        {...props}
      />
    )
  },
  p: (props) => {
    return (
      <Text
        as="p"
        w="100%"
        variant="subtitle"
        maxW="container.sm"
        sx={{
          "a": {
            color: "teal.700",
            _hover: { textDecoration: "underline" },
            _focus: { textDecoration: "underline" },
          },
        }}
        {...props}
      />
    )
  },
}

export default components
