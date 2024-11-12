import {
  Container,
  SimpleGrid,
  Heading,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react"

import Image from "@/components/Image"
import SectionHeader from "@/components/SectionHeader"
import { LinkBox, LinkOverlay } from "@/components/Link"
import PathfindersLogo from "./Logo"

export default function PathfindersBanner() {
  return (
    <LinkBox>
      <Container
        bg="black"
        position="relative"
        bgImage="url(/images/pathfinders-cover-lg.jpg)"
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        py={20}
        _after={{
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient:
            "linear(to-b, blackAlpha.500, blackAlpha.700, blackAlpha.900, #000)",
        }}
      >
        <SimpleGrid
          columns={8}
          gridColumnGap={10}
          gridRowGap={5}
          alignItems="center"
        >
          <SectionHeader
            gridColumn={["1 / -1", null, null, "1 / span 6"]}
            gridRow="1 / span 1"
            zIndex={2}
            dividerColor="gray.500"
            color="white"
          >
            <Heading textStyle="sectionHeading">
              <LinkOverlay href="https://www.netzeropathfinders.com/">
                {"NetZero Pathfinders"}
              </LinkOverlay>
            </Heading>
            <Text textStyle="sectionSubheading">
              {
                "For more information on best practices and climate action, explore the NetZero Pathfinders project by BloombergNEF."
              }
            </Text>
          </SectionHeader>
          <Box gridColumn="1 / span 6" zIndex={2} color="white">
            <PathfindersLogo style={{ maxWidth: "8rem" }} />
          </Box>
        </SimpleGrid>
      </Container>
    </LinkBox>
  )
}
