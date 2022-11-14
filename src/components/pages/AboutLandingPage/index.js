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
          <Stack spacing={5} gridColumn={["1 / -1", null, null, "2 / span 5"]}>
            <Heading as="h1" variant="pageTitle" maxW="50rem">
              {"About"}
            </Heading>
            <Text variant="subtitle" maxW="50rem">
              {
                "Climatescope is an online market assessment tool, report and index that evaluates the relative readiness of individual nations to put energy transition investment to work effectively. It provides snapshots of current clean energy policy and finance conditions that can lead to future capital deployment and project development."
              }
            </Text>
            <Text maxW="50rem">
              {
                "2022 marks the 11th year BloombergNEF has produced Climatescope. Over that time, the project has significantly evolved and now includes detailed information on 136 markets globally, including 107 emerging markets and 29 developed nations. While Climatescope has historically focused on just the power sector, in 2022 it has been expanded to include in-depth data on investment conditions for lower-carbon transportation and buildings."
              }
            </Text>
            <Text maxW="50rem">
              {
                "Climatescope encompasses nearly every nation in the world with over 2 million inhabitants. Developed markets are defined as OECD countries minus Chile, Colombia, Costa Rica, Mexico and Turkey. These five are part of the OECD but remain attractive emerging markets for clean energy development. Developing markets include all non-OECD nations, plus these five countries."
              }
            </Text>
            <Text maxW="50rem">
              {
                "This report summarizes the power-sector research undertaken by over 40 BNEF analysts compiling detailed data on Climatescope markets. It is the first of three Climatescope reports BNEF will produce with the next two focused on the transport and buildings sectors. Readers are encouraged to explore complete rankings, datasets, tools and country profiles on the Climatescope website to leverage fully this deep-dive into how the countries surveyed are driving the energy transition."
              }
            </Text>
            <SimpleGrid columns={3} py={5}>
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
            <Text maxW="50rem">
              <strong>{"Project Director"}</strong>
              <br />
              {"Ethan Zindler and Luiza Demôro"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Project Manager"}</strong>
              <br />
              {"Sofia Maia"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Lead Analysts"}</strong>
              <br />
              {"Ana Paula Teixeira, Laura Foroni and Maria Eugênia Mitri"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Lead Modeller"}</strong>
              <br />
              {"Ulimmeh Ezekiel"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Communications Manager"}</strong>
              <br />
              {"Veronika Henze"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Editors"}</strong>
              <br />
              {
                "Ben Vickers, Ethan Zindler, Hongyan Li, Iain Wilson, Nilushi Karunaratne, Vandana Gombar."
              }
            </Text>
            <Heading as="h2" variant="sectionTitle" maxW="50rem">
              {"Research & Data Gathering"}
            </Heading>
            <Text maxW="50rem">
              {
                "Ali Ashgar, Allan Ray Restauro, Amanda Welch, Antoine Vagneur-Jones, Caroline Chua, Miko Tan, Chasity McFadden, Chelsea Jean-Michel, Claudio Lubis, David Kang, David Lluis Madrid, Emma Champion, Enrique Gonzalez, Eva Marina Gonzalez Isla, Evelina Stoikou, Felicia Aminoff, Hanyang Wei, Ian Berryman, Isshu Kikuma, Jennifer Cogburn, Kesavarthiniy Savarimuthu, Komal Kareer, Leonard Quong, Michael Yip, Murilo Macedo, Natalia Rypl, Olympe Mattei, Pol Lezcano, Sunny Park, Tara Narayanan, Toshiya Shinagawa, Tushna Antia, Ulimmeh Ezekiel, Vinicius Nunes, Zelan Chen."
              }
            </Text>
            <Heading as="h2" variant="sectionTitle" maxW="50rem">
              {"Special thanks"}
            </Heading>
            <Text maxW="50rem">
              {
                "Albert Cheung, Aleksandra O'Donovan, Alessandro Borsatti, Ali Izadi-Najafabadi, Benjamin Kafri, Corey Cantor, Meredith Annex, James Batty, Victoria Cuming, David Hostert, Matthias Kimmel, Nell Mathews, Jon Moore, Tom Rowlands-Rees, Russell Smithers, Minky Lee, Alex Toft, Dario Traum, Andrew Turner, Olaf Veerman, Cristina Poiata, Richard Zimerman, Chuiling Yip, and the many energy sector stakeholders that shared country-level information with our analysts."
              }
            </Text>
          </Stack>
        </SimpleGrid>
        <BnefBanner />
      </Container>
    </>
  )
}

export default AboutLandingPage
