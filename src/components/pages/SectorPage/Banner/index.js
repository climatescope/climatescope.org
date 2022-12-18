import { Stack, HStack, Text, Heading, Box, Center } from "@chakra-ui/react"
import { DownloadIcon } from "@components/Icon"

import { ButtonLink } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"

const SectorPageBanner = ({ findings, sectorName, reportName }) => {
  if (!findings) return null

  const isComingSoon = sectorName === "Buildings"

  return (
    <SimpleGrid
      columns={4}
      pt={5}
      pb={10}
      borderTop={["0.0625rem solid", null, "none"]}
      borderBottom="0.0625rem solid"
      borderColor="gray.100"
    >
      {findings.slice(0, 3).map((finding, i) => {
        return (
          <Stack
            key={i}
            spacing="xs"
            gridColumn={["span 4", null, "span 2", null, "span 1"]}
          >
            <Heading variant="statisticTitle">{finding.title}</Heading>
            <Text variant="statisticText">{finding.description}</Text>
          </Stack>
        )
      })}
      <Box
        gridColumn={["span 4", null, "span 2", null, "span 1"]}
        alignContent="stretch"
      >
        <ButtonLink
          href={`/downloads/climatescope-2022-${sectorName.toLowerCase()}-report-en.pdf`}
          download={reportName}
          target="_blank"
          h="100%"
          justifyContent="left"
          whiteSpace="wrap"
          width="100%"
          borderRadius="lg"
          textTransform="none"
          variant="subtle"
          isDisabled={isComingSoon}
          pointerEvents={isComingSoon ? "none" : "all"}
          tabIndex={isComingSoon ? -1 : 0}
        >
          <HStack>
            <Center
              flex="none"
              w="3rem"
              h="3rem"
              bg="brand.300"
              color="brand.900"
              borderRadius="full"
            >
              <DownloadIcon />
            </Center>
            <Stack spacing={2} color="brand.900">
              <Heading variant="keyMessageTitle">
                {`Download ${sectorName} Factbook`}
              </Heading>
              {/* <Text variant="statisticText">{"Read more about power"}</Text> */}
            </Stack>
          </HStack>
        </ButtonLink>
      </Box>
    </SimpleGrid>
  )
}

export default SectorPageBanner
