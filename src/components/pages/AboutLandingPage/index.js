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
              {"About Climatescope"}
            </Heading>
            <Text variant="subtitle" maxW="50rem">
              {
                "Climatescope comprises an online market assessment tool, report and index that together evaluate the readiness of individual economies to put energy transition investment to work. By conducting a deep dive into how surveyed markets are driving the transition, it provides snapshots of current clean energy policy and finance conditions that can lead to future capital deployment and project development."
              }
            </Text>
            <Text maxW="50rem">
              {
                "This is the 12th edition of Climatescope, which has evolved significantly since its launch more than a decade ago. It now includes detailed information on 140 markets, split across 110 emerging economies and 30 developed ones. This year, four new markets have been added to the coverage: Bahrain, Iceland, Montenegro and Venezuela. Climatescope’s sectoral coverage has also expanded over the years. While early editions of the report focused on just the power sector, in 2021 we began including in-depth investment condition data for lower-carbon transportation and buildings."
              }
            </Text>
            <Text maxW="50rem">
              {
                "Climatescope now encompasses nearly every market in the world. Developed economies are defined as OECD markets minus Chile, Colombia, Costa Rica, Mexico and Turkey. These five are part of the OECD but remain attractive emerging markets for clean energy development. Developing economies include all non-OECD markets, plus these five."
              }
            </Text>
            <Text maxW="50rem">
              {
                "This report summarizes research undertaken by over 50 BloombergNEF analysts compiling detailed data on Climatescope markets."
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
              {"Luiza Demôro"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Project Manager"}</strong>
              <br />
              {"Sofia Maia"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Lead Analyst"}</strong>
              <br />
              {"Maria Eugênia Mitri"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Regional Transition Analysts"}</strong>
              <br />
              {"Ana Paula Teixeira and Laura Foroni"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Lead Modeller"}</strong>
              <br />
              {"Ulimmeh Ezekiel"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Communications Manager"}</strong>
              <br />
              {"Oktavia Catsaros"}
            </Text>
            <Text maxW="50rem">
              <strong>{"Editors"}</strong>
              <br />
              {
                "Ben Vickers, Emma Champion, Kamala Schelling and Nilushi Karunaratne."
              }
            </Text>
            <Heading as="h2" variant="sectionTitle" maxW="50rem">
              {"Research and Data Gathering Analysts"}
            </Heading>
            <Text maxW="50rem">
              {
                "Adriana Martins, Allen Tom Abraham, Amanda Welch, Analeigh Suh, Antoine Vagneur-Jones, Arhnue Tan, Brenna Casey, Brynne Mary, Caroline Chua, Chasity McFadden, Claudio Lubis, Cristian Dinca, Derrick Flakoll, Ellie Gomes-Callus, Emma Champion, Enrique Gonzalez, Eva Gonzalez Isla, Evelina Stoikou, Felicia Aminoff, Isshu Kikuma, James Ellis, Javier Rico, Kesha Savarimuthu, Komal Kareer, Kostas Pegios, Laura Rockefeller, Leonard Quong, Luisa Amorim, Maynie Yun Ling Yang, Murilo Macedo, Natalia Rypl, Omolade Fasusi, Philip Geurts, Rodrigo Quintero, Sabrina Lin, Sahaj Sood, Sophia F Liu, Stephanie Muro, Sunny Park, Tara Narayanan, Tianyi Zhao, Toshiya Shinagawa, Trina White, Tushna Antia, Ulimmeh Ezekiel, Vicky Adijanto, Vinicius Nunes, Yiran Bian, Youru Tan."
              }
            </Text>
            <Heading as="h2" variant="sectionTitle" maxW="50rem">
              {"Special thanks"}
            </Heading>
            <Text maxW="50rem">
              {
                "Albert Cheung, Aleksandra O'Donovan, Alessandro Borsatti, Ali Izadi-Najafabadi, Benjamin Kafri, Corey Cantor, Meredith Annex, James Batty, Victoria Cuming, David Hostert, Matthias Kimmel, Nell Mathews, Jon Moore, Tom Rowlands-Rees, Russell Smithers, Minky Lee, Alex Toft, Dario Traum, Andrew Turner, Olaf Veerman, Cristina Poiata, Richard Zimerman, Chuiling Yip, and the many energy sector stakeholders that shared market-level information with our analysts."
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
