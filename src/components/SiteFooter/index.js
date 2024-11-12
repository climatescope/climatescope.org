import {
  Box,
  Container,
  HStack,
  Stack,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react"

import { Link } from "@/components/Link"
import Logo from "@/components/Logo"
import SectionHeader from "@/components/SectionHeader"
import PathfindersBanner from "@/components/PathfindersBanner"
import Newsletter from "@/components/Newsletter"

export default function SiteFooter() {
  return (
    <Stack spacing={[0, null, null, 20]} pt={20}>
      <PathfindersBanner />
      <Box as="footer" bg="black" color="white" pt={16} pb={10}>
        <Container>
          <SimpleGrid columns={8} gridGap={10}>
            <SectionHeader
              gridColumn={["1 / -1", null, null, "1 / span 4"]}
              dividerColor="gray.500"
            >
              <Heading textStyle="sectionHeading">
                {"Subscribe to our newsletter"}
              </Heading>
              <Text textStyle="sectionSubheading">
                {
                  "Subscribe to our monthly publication that presents best practices to decarbonize major emitting sectors of the global economy."
                }
              </Text>
            </SectionHeader>
            {/* <HStack spacing={5} gridColumn="1 / -1">
              <Box h={12} bg="gray.900" flex={1} borderRadius="sm" />
              <Box h={12} bg="gray.900" flex={1} borderRadius="sm" />
              <Button size="lg">{"Subscribe"}</Button>
            </HStack> */}
            <Newsletter gridColumn={["1 / -1", null, null, "span 4"]} />
            <Divider gridColumn="1 / -1" borderColor="gray.700" />
            <Stack spacing={5} gridColumn="span 4">
              <Link href="/results" fontSize="xl" fontWeight={600}>
                {"Results"}
              </Link>
              <Link href="/highlights" fontSize="xl" fontWeight={600}>
                {"Highlights"}
              </Link>
              <Link href="/tools" fontSize="xl" fontWeight={600}>
                {"Tools"}
              </Link>
            </Stack>
            <Stack spacing={5} gridColumn="span 4">
              <Link href="/reports" fontSize="xl" fontWeight={600}>
                {"Reports"}
              </Link>
              <Link href="/blog" fontSize="xl" fontWeight={600}>
                {"Blog"}
              </Link>
              <Link href="/about" fontSize="xl" fontWeight={600}>
                {"About"}
              </Link>
              <Link href="/about/contact" fontSize="xl" fontWeight={600}>
                {"Contact"}
              </Link>
            </Stack>
            <Divider gridColumn="1 / -1" borderColor="gray.700" />
            <HStack spacing={5} gridColumn="1 / -1">
              <HStack spacing={5} flex={1}>
                <Link
                  href="/privacy-policy"
                  fontSize="md"
                  fontWeight={600}
                  flex="none"
                >
                  {"Privacy policy"}
                </Link>
                <Link
                  href="/terms-of-use"
                  fontSize="md"
                  fontWeight={600}
                  flex="none"
                >
                  {"Terms of use"}
                </Link>
              </HStack>
              <Text fontSize="md" flex="none">
                {"© 2024 Bloomberg L.P. All Rights Reserved."}
              </Text>
              <Logo />
            </HStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Stack>
  )
}
