import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react"

import Newsletter from "@components/Newsletter"

const ComingSoonSection = () => {
  return (
    <SimpleGrid
      columns={8}
      gridRowGap={10}
      py={10}
      alignItems={["left", null, "center"]}
    >
      <Stack gridColumn={["1 / -1", null, null, " 3 / -3"]} spacing={10}>
        <Stack spacing={5}>
          <Stack spacing={2}>
            <Heading as="h3" fontSize={["3xl", null, null, "4xl"]}>
              {"New sectors coming soon"}
            </Heading>
          </Stack>

          <Text fontSize="lg">
            {
              "Sign up to get alerted when we launch the Buildings sector."
            }
          </Text>
          <Newsletter />
        </Stack>
      </Stack>
    </SimpleGrid>
  )
}

export default ComingSoonSection
