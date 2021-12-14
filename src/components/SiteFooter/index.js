import {
  Container,
  Heading,
  Text,
  Stack,
  HStack,
  Divider,
  Box,
} from "@chakra-ui/react"

import { Link } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import Reports from "@components/pages/IndexPage/Reports"
import Newsletter from "@components/Newsletter"

const toExclude = ["/reports", "/tools"]

const SiteFooter = ({ navigation }) => {
  return (
    <Box bg="gray.50">
      <Container>
        <Reports />
      </Container>

      <Container maxW="container.lg" py={16}>
        <SimpleGrid columns={[1, null, 2]}>
          <Stack spacing={5}>
            <Heading fontSize="4xl" maxW="60rem">
              {"Stay up to date"}
            </Heading>
            <Text fontSize="xl">
              {
                "Subscribe to our mailing list to get the latest news about Climatescope directly in your inbox."
              }
            </Text>
          </Stack>
          <Box>
            <Newsletter />
          </Box>
        </SimpleGrid>
      </Container>

      <Divider borderColor="gray.100" />

      <Container as="footer" py={14}>
        <SimpleGrid columns={[1, 2, 3, 5]}>
          {navigation
            .filter((d) => !toExclude.includes(d.path))
            .map((navItem) => {
              return (
                <Box key={navItem.path}>
                  <Stack spacing="0.75rem">
                    <Link href={navItem.path} fontWeight={700}>
                      {navItem.title}
                    </Link>
                    <Stack spacing="0.5rem">
                      {navItem.title === "Markets" ? (
                        <>
                          <Link href="/markets/ca">{"Canada"}</Link>
                          <Link href="/markets/es">{"Spain"}</Link>
                          <Link href="/markets/ar">{"Argentina"}</Link>
                          <Link href="/markets/th">{"Thailand"}</Link>
                        </>
                      ) : (
                        navItem.links.map((d) => {
                          return (
                            <Link key={d.path} href={d.path}>
                              {d.title}
                            </Link>
                          )
                        })
                      )}
                    </Stack>
                  </Stack>
                </Box>
              )
            })}
        </SimpleGrid>
      </Container>

      <Divider borderColor="gray.100" />

      <Container py={5} color="gray.600">
        <Text>
          {`© ${new Date().getFullYear()} Climatescope. `}
          <Link href="/about/license" color="brand.800">{"View license"}</Link>
          {" and "}
          <Link href="https://about.bnef.com/bnef-privacy-policy/" color="brand.800">
            {"Privacy policy"}
          </Link>
        </Text>
      </Container>
    </Box>
  )
}

export default SiteFooter
