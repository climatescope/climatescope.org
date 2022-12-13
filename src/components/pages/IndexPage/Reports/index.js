import { Heading, Stack, Box, Text } from "@chakra-ui/react"

import { Link, ButtonLink } from "@components/Link"
import { DownloadIcon } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"
import Image from "@components/Image"

const report = {
  id: 1,
  title: "Energy Transition Factbooks",
  href: "/downloads/climatescope-2022-report-en.pdf",
  year: 2022,
  imgSrc: "climatescope-2022-power-report-en-cover.jpg",
}

const reports = [
  {
    id: 1,
    title: "Power Transition Factbook",
    href: "/downloads/climatescope-2022-report-en.pdf",
    year: 2022,
    imgSrc: "climatescope-2022-power-report-en-cover.jpg",
  },
  {
    id: 2,
    title: "Emerging Market's Electrified Transport Factbook",
    href: "/downloads/climatescope-2022-report-en.pdf",
    year: 2022,
    imgSrc: "climatescope-2022-transport-report-en-cover.jpg",
  },
  {
    id: 3,
    title: "Electrified Heating Factbook",
    href: "/downloads/climatescope-2022-report-en.pdf",
    year: 2022,
    imgSrc: "climatescope-2022-buildings-report-en-cover.jpg",
  },
]

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
        <SimpleGrid columns={6} gridRowGap={[10, null, 20]} py={24}>
          <Stack spacing={6} gridColumn={["span 6", null, null, "span 5"]}>
            <Heading as="h2" variant="sectionTitle" color="white">
              {report.title}
            </Heading>
            <Text variant="lead" color="brand.100">
              {
                "This marks the 11th anniversary of Climatescope, BNEF’s annual assessment of energy transition opportunities. The project has been expanded to include activity not just in clean power but in the decarbonization of the transportation and buildings sectors."
              }
            </Text>
          </Stack>
          {reports.map((r) => {
            return (
              <Stack
                key={r.id}
                spacing={5}
                gridColumn={["span 6", null, "span 3", " span 2"]}
              >
                <Box boxShadow="lg">
                  <Link href={r.href} target="_blank">
                    <Image
                      src={r.imgSrc}
                      ratio={1 / 1.28}
                      type="reportCover"
                      bg="transparent"
                      alt="Climatescope 2022 print report cover"
                    />
                  </Link>
                </Box>
                <Heading as="h3" fontSize="2xl">
                  {r.title}
                </Heading>
                <ButtonLink
                  href={r.href}
                  target="_blank"
                  colorScheme="white"
                  size="lg"
                  alignSelf="flex-start"
                  leftIcon={
                    <Box ml={2}>
                      <DownloadIcon size={20} strokeWidth={2} />
                    </Box>
                  }
                  spacing={6}
                >
                  {"Download factbook"}
                </ButtonLink>
              </Stack>
            )
          })}
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  )
}

export default Reports
