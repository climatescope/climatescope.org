import { Heading, Stack, Box, Text } from "@chakra-ui/react"

import { Link, ButtonLink } from "@components/Link"
import { DownloadIcon } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"
import Image from "@components/Image"

const report = {
  id: 1,
  title: "Power Transition Factbook",
  href: "/downloads/climatescope-2023-report-en.pdf",
  year: 2023,
  imgSrc: "climatescope-2023-report-en-cover.jpg",
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
          gridRowGap={[10, null, 20]}
          py={24}
          alignItems="center"
        >
          <Stack gridColumn={["1 / -1", null, "span 4"]}>
            <Box boxShadow="lg" w={["100%", null, "75%"]} margin={["0", null, "0 auto"]}>
              <Link href={report.href} target="_blank" display="block">
                <Image
                  src={report.imgSrc}
                  ratio={1 / 1.42}
                  type="reportCover"
                  bg="transparent"
                  alt="Climatescope 2023 print report cover"
                />
              </Link>
            </Box>
          </Stack>
          <Stack spacing={6} gridColumn={["span 8", null, null, "span 4"]}>
            <Heading as="h2" variant="sectionTitle" color="white">
              {report.title}
            </Heading>
            <Text variant="lead" color="brand.100">
              {
                "This marks the 12th anniversary of Climatescope, BNEF’s annual assessment of energy transition opportunities. In recent years, the project has been expanded to include activity not just in clean power, but also in the decarbonization of transportation and buildings. "
              }
            </Text>
            <ButtonLink
              href={report.href}
              download={report.title}
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
              {"Download report"}
            </ButtonLink>
          </Stack>
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  )
}

export default Reports
