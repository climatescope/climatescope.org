import { Container, Heading, Text, Stack, Divider, Box } from "@chakra-ui/react"

import { Link } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import Reports from "@components/pages/IndexPage/Reports"
import Newsletter from "@components/Newsletter"

const toExclude = ["/reports", "/tools", "/markets"]

const SiteFooter = ({ navigation }) => {
  return (
    <Box bg="gray.50">
      <Container>
        <Reports />
      </Container>

      <Container py={20}>
        <SimpleGrid columns={[1, null, 2]}>
          <Stack spacing={5}>
            <Heading variant="sectionTitle" maxW="60rem">
              {"Stay up to date"}
            </Heading>
            <Text variant="lead">
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
                <Box key={navItem.title}>
                  <Stack spacing="0.75rem" alignItems="flex-start">
                    <Link href={navItem.path} variant="mainNav">
                      {navItem.title}
                    </Link>
                    <Stack spacing="0.5rem" alignItems="flex-start">
                      {navItem.title === "Sectors" &&
                        navItem.links.map((d) => {
                          return (
                            <Link
                              key={d.title}
                              href={d.path}
                              variant="footerLink"
                            >
                              {d.title}
                            </Link>
                          )
                        })}
                      {navItem.title !== "Markets" &&
                        navItem.title !== "Sectors" &&
                        navItem.links.map((d) => {
                          return (
                            <Box key={d.title} lineHeight="short">
                              <Link
                                href={d.path}
                                variant="footerLink"
                                display="inline"
                              >
                                {d.title}
                              </Link>
                            </Box>
                          )
                        })}
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
          <Link href="/about/license" color="brand.800">
            {"View license"}
          </Link>
          {" and "}
          <Link
            href="https://about.bnef.com/bnef-privacy-policy/"
            color="brand.800"
          >
            {"Privacy policy"}
          </Link>
        </Text>
      </Container>
    </Box>
  )
}

export default SiteFooter
