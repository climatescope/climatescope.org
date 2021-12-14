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
            <Heading fontSize={["3xl", null, "5xl"]} maxW="45rem">
              {"About"}
            </Heading>
            <Text variant="subtitle" maxW="45rem">
              {
                "2021 marks the tenth year of Climatescope. The project has significantly evolved over a decade and expanded to new markets and sectors."
              }
            </Text>
            <Text fontSize={["md", null, "lg"]} maxW="45rem">
              {
                "Climatescope is a unique market assessment, interactive report and index that evaluates the conditions for energy transition investment globally and evaluates their ability to attract capital for low-carbon technologies while building a greener economy. It also provides a snapshot of where clean energy policy and finance stand today and a guide to what can happen in the future. This year, BNEF gathered detailed information on 136 markets globally, or 107 emerging markets and 29 developed nations. Climatescope 2021 also expanded from a power focus, to a wider energy transition scope, including power, transport and buildings."
              }
            </Text>
            <Text fontSize={["md", null, "lg"]} maxW="45rem">
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

            <Text fontSize={["md", null, "lg"]} maxW="45rem">
              {
                "Climatescope represents the collective effort of more than 40 BloombergNEF analysts who collected country-level data and conducted interviews with local stakeholders."
              }
            </Text>

            <Text fontSize={["md", null, "lg"]} maxW="45rem">
              <strong>{"Project Director"}</strong>
              <br />
              {"Ethan Zindler"}
              <br />
              <strong>{"Project Manager"}</strong>
              <br />
              {"Luiza Demôro"}
              <br />
              <strong>{"Lead Analyst"}</strong>
              <br />
              {"Sofia Maia"}
              <br />
              <strong>{"Lead Modeller"}</strong>
              <br />
              {"Ulimmeh Ezekiel"}
              <br />
              <strong>{"Project Coordinator"}</strong>
              <br />
              {"Misa Ichinose"}
              <br />
              <strong>{"Communications Manager"}</strong>
              <br />
              {"Veronika Henze"}
              <br />
              <strong>{"Editors"}</strong>
              <br />
              {
                "Bryony Collins, Vandana Gombar, Nilushi Karunaratne, Stephen Munro, Iain Wilson, Ben Vickers, Ethan Zindler"
              }
              <br />
            </Text>
            <Heading as="h2" fontSize="3xl" maxW="45rem">
              {"Research & Data Gathering"}
            </Heading>
            <Text fontSize={["md", null, "lg"]} maxW="45rem">
              {
                "Allan Ray Restauro, Allen Tom Abraham, Ana Paula Teixeira Fonseca, Andreas Gandolfo, Andrew Grant, Antoine Vagneur-Jones, Atin Jain, Bo Qin, Brianna Lazerwitz, Bryony Collins, Caroline Chua, Chasity McFadden, David Kang, David Lluis Madrid, Ej Gardiner, Emily Jackson, Emma Champion, Eva Marina Isla, Hanyang Wei, Felicia Aminoff, Ian Berryman, Imogen Brown, Isabelle Edwards, Isshu Kikuma, Jahn Olsen, James Ellis, Jennifer Cogburn, Jinghong Lyu, Jonathan Luan, Kesha Savarimuthu, Komal Kareer, Kwasi Ampofo, Kyle Harrison, Laura Foroni, Leonard Quong, Lujia Cao, Maria Eugênia Mitri, Matthias Kimel, Melina Bartels, Miho Kurosaki, Natalia Rypl, Olympe Mattei, Rohit Gadre, Sonia Klein, Takehiro Kawahara, Tara Narayanan, Ulimmeh Ezekiel, Will Edmonds"
              }
            </Text>
            <Heading as="h2" fontSize="3xl" maxW="45rem">
              {"Special thanks"}
            </Heading>
            <Text fontSize={["md", null, "lg"]} maxW="45rem">
              {
                "Dario Traum, Aleksandra O'Donovan, Corey Cantor, Meredith Annex, Emma Coker Alessandro Borsatti, James Batty, Tifenn Brandily, Albert Cheung, Angela Cowan, Victoria Cuming, Seb Henbest, David Hostert, Ali Izadi-Najafabadi , Roshni Jaura, Benjamin Kafri, Matthias Kimmel, Seth Mastin, Nell Mathews, Jon Moore, Tom Rowlands-Rees, Stephanie Saliba, Russell Smithers, Minky Lee, Mark Taylor, Alex Toft, Dario Traum, Andrew Turner, Olaf Veerman, Cristina Poiata, Richard Zimerman, Justin Wu, Chuiling Yip, and the many energy sector stakeholders that shared country-level information with our analysts."
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
