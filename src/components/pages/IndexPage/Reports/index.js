import { Heading, Stack, Box, Text } from "@chakra-ui/react"

import { Link, ButtonLink } from "@components/Link"
import { ViewIcon, ChevronRight } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"
import Image from "@components/Image"

const report = {
  id: 1,
  title: "Power Transition Factbook",
  href: "/downloads/climatescope-2021-report.pdf",
  year: 2022,
  imgSrc: "climatescope-2022-report-en-cover.jpg",
}

const Reports = () => {
  return (
    <SimpleGrid columns={8}>
      <Box gridColumn="1 / -1" gridRow="1" bg="teal.900">
        <Box
          w="100vw"
          h="100%"
          bg="teal.900"
          left="50%"
          position="relative"
          ml="-50vw"
          bgGradient="linear(to-br, teal.800 0%, teal.900 60%)"
        />
      </Box>
      <Box gridColumn="1 / -1" gridRow="1" position="relative" color="white">
        <SimpleGrid
          columns={8}
          gridRowGap={10}
          py={24}
          alignItems={["left", null, "center"]}
        >
          <Box
            boxShadow="lg"
            gridColumn={["span 8", "1 / span 5", null, " 2 / span 3"]}
          >
            <Link href={report.href} target="_blank">
              <Image
                src={report.imgSrc}
                ratio={1 / 1.28}
                type="reportCover"
                bg="transparent"
              />
            </Link>
          </Box>
          <Stack gridColumn={["span 8", null, null, "span 4"]} spacing={10}>
            <Stack spacing={2}>
              <Text variant="kicker" color="brand.300">
                {"Climatescope 2022"}
              </Text>
              <Heading variant="sectionTitle" color="white">
                {report.title}
              </Heading>
            </Stack>

            <Text variant="lead" color="brand.100">
              {
                "This marks the 11th anniversary of Climatescope, BNEF’s annual assessment of energy transition opportunities. The project has been expanded to include activity not just in clean power but in the decarbonization of the transportation and buildings sectors. The Power Transition Factbook is the first of three reports that composes BNEF's Energy Transition Factbook. The transport and buildings sectors reports are coming soon."
              }
            </Text>
            <Stack
              spacing={5}
              color="white"
              direction={["column", null, "row"]}
            >
              <ButtonLink
                href={report.href}
                alignSelf="flex-start"
                target="_blank"
                variant="outline"
                colorScheme="white"
                size="lg"
                rightIcon={
                  <Box ml={2}>
                    <ViewIcon size={20} strokeWidth={2} />
                  </Box>
                }
                spacing={6}
              >
                {"Read the report"}
              </ButtonLink>
              <ButtonLink
                href="/reports"
                alignSelf="flex-start"
                variant="ghost"
                colorScheme="white"
                size="lg"
                rightIcon={
                  <Box ml={2}>
                    <ChevronRight size={20} strokeWidth={2} />
                  </Box>
                }
              >
                {"See all reports"}
              </ButtonLink>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  )
}

export default Reports
