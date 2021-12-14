import {
  Heading,
  Stack,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react"

import { Link, ButtonLink } from "@components/Link"
import { ViewIcon, ChevronRight } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"
import Image from "@components/Image"

const report = {
  id: 1,
  title: "Energy Transition Factbook",
  href: "/downloads/climatescope-2021-report.pdf",
  year: 2021,
  imgSrc: "climatescope-2021-report-en-cover.jpg",
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
        />
      </Box>
      <Box gridColumn="1 / -1" gridRow="1" position="relative" color="white">
        <SimpleGrid
          columns={8}
          gridRowGap={10}
          py={24}
          alignItems={["left", null, "center"]}
        >
          <Link
            gridColumn={["span 8", null, null, "span 4"]}
            href={report.href}
            target="_blank"
          >
            <Image src={report.imgSrc} ratio={16 / 9} type="reportCover" />
          </Link>
          <Stack gridColumn={["span 8", null, null, "span 4"]} spacing={10}>
            <Stack spacing={5}>
              <Stack spacing={2}>
                <Heading
                  as="h2"
                  fontWeight={600}
                  color="brand.100"
                  lineHeight="short"
                  fontSize="xl"
                >
                  {"Climatescope 2021"}
                </Heading>
                <Heading
                  as="h3"
                  fontSize={["3xl", null, null, "4xl"]}
                  color="white"
                >
                  {report.title}
                </Heading>
              </Stack>

              <Text fontSize="lg" color="brand.100">
                {
                  "This marks the 10th anniversary of Climatescope, BNEF’s annual assessment of energy transition opportunities. For the first time, the project has expanded its scope to include activity not just in clean power but in the decarbonization of the transportation and buildings sectors."
                }
              </Text>
            </Stack>
            <HStack spacing={10} color="white">
              <ButtonLink
                href={report.href}
                target="_blank"
                variant="outline"
                colorScheme="white"
                size="lg"
                leftIcon={
                  <Box mr={2}>
                    <ViewIcon size={20} strokeWidth={2} />
                  </Box>
                }
                spacing={6}
              >
                {"Read the report"}
              </ButtonLink>
              <ButtonLink
                href="/reports"
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
            </HStack>
          </Stack>
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  )
}

export default Reports
