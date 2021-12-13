import { Box, Stack, Heading, Text } from "@chakra-ui/react"

import Image from "@components/Image"
import SimpleGrid from "@components/SimpleGrid"
import { Link, ButtonLink } from "@components/Link"
import { ExternalIcon } from "@components/Icon"

const BnefBanner = () => {
  return (
    <SimpleGrid columns={8}>
      <Box gridColumn="1 / -1" gridRow="1">
        <Box
          w="100vw"
          h="100%"
          bg="gray.25"
          left="50%"
          position="relative"
          ml="-50vw"
        />
      </Box>
      <Box gridColumn="1 / -1" gridRow="1" position="relative">
        <SimpleGrid
          columns={8}
          gridRowGap={10}
          py={20}
          alignItems={["left", null, "center"]}
        >
          <Stack
            gridColumn={["span 8", null, "1 / span 5", "2 / span 4", "2 / span 3"]}
            spacing={5}
          >
            <Heading as="h3" fontSize={["3xl", null, null, "4xl"]}>
              {"Additional insights "} <br /> {"from BNEF"}
            </Heading>
            <Text fontSize="lg">
              {
                "Explore more detailed information on global commodity markets and the disruptive technologies driving the transition to a low-carbon economy."
              }
            </Text>
            <Box>
              <ButtonLink
                href="https://about.bnef.com/"
                variant="outline"
                rightIcon={<ExternalIcon size={20} />}
              >
                {"Read more"}
              </ButtonLink>
            </Box>
          </Stack>
          <Stack
            gridColumn={[
              "span 4",
              null,
              "6 / span 3",
              "6 / span 2",
              "5 / span 2",
            ]}
          >
            <Heading textTransform="uppercase" fontSize="sm" fontWeight={600}>
              {"Powered by"}
            </Heading>
            <Link href="https://about.bnef.com/">
              <Image
                src="bnef-logo.png"
                ratio={3.75 / 1}
                type="cover"
                bg="transparent"
              />
            </Link>
          </Stack>
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  )
}

export default BnefBanner
