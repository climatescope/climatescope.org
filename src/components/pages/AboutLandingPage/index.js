import { HStack, Container, Heading, Stack, Text } from "@chakra-ui/react"

import { Link } from "@components/Link"
import { ContactIcon, LicenseIcon, MethodologyIcon } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"
import BnefBanner from "@components/pages/IndexPage/BnefBanner"

const AboutLandingPage = ({ allPages }) => {
  return (
    <>
      <Container as="main">
        <SimpleGrid columns={8} pt={10} pb={40}>
          <Stack spacing={10} gridColumn={["1 / -1", null, null, "2 / span 5"]}>
            <Heading fontSize={["3xl", null, "5xl"]}>{"About"}</Heading>
            <Text variant="subtitle">
              {
                "2021 marks the tenth year of Climatescope. The project has significantly evolved over a decade and expanded to new markets and sectors."
              }
            </Text>
            <Text fontSize={["md", null, "lg"]}>
              {
                "Climatescope is a unique market assessment, interactive report and index that evaluates the conditions for energy transition investment globally and evaluates their ability to attract capital for low-carbon technologies while building a greener economy. It also provides a snapshot of where clean energy policy and finance stand today and a guide to what can happen in the future. This year, BNEF gathered detailed information on 136 markets globally, or 107 emerging markets and 29 developed nations. Climatescope 2021 also expanded from a power focus, to a wider energy transition scope, including power, transport and buildings."
              }
            </Text>
            <Text fontSize={["md", null, "lg"]}>
              {
                "Climatescope encompasses nearly every nation in the world with over 2 million inhabitants. Developed markets are defined as OECD countries minus Chile, Colombia, Costa Rica, Mexico and Turkey. These five are part of the OECD, but remain attractive emerging markets for clean energy development. Developing markets include all non-OECD nations, plus these five countries."
              }
            </Text>
            <SimpleGrid columns={3}>
              {allPages.map((page) => {
                return (
                  <Link
                    href={`/about/${page.slug}`}
                    key={page.title}
                    bg="gray.50"
                    fontSize="lg"
                    p={5}
                    borderRadius="md"
                    gridColumn={["span 3", null, "span 1"]}
                    _hover={{ textDecoration: "none", bg: "gray.100" }}
                    _active={{ bg: "gray.100" }}
                    _focus={{ bg: "gray.100" }}
                  >
                    <HStack>
                      {page.title === "Contact" ? <ContactIcon /> : null}
                      {page.title === "License" ? <LicenseIcon /> : null}
                      {page.title === "Methodology" ? (
                        <MethodologyIcon />
                      ) : null}
                      <Text>{page.title}</Text>
                    </HStack>
                  </Link>
                )
              })}
            </SimpleGrid>
          </Stack>
        </SimpleGrid>
        <BnefBanner />
      </Container>
    </>
  )
}

export default AboutLandingPage
