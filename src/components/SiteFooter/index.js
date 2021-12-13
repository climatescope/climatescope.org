import { Container, Stack, Divider, Box, Text } from "@chakra-ui/react"

import { Link } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import Reports from "@components/pages/IndexPage/Reports"

const toExclude = ["/reports", "/tools"]

const SiteFooter = ({ navigation }) => {
  return (
    <Box bg="gray.50">
      <Container>
        <Reports />
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
          <Link href="/about/license">{"View license"}</Link>
        </Text>
      </Container>
    </Box>
  )
}

export default SiteFooter
