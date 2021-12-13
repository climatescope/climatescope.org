import { Stack, Text, Box } from "@chakra-ui/react"

import { ButtonLink } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"

const SectorPageBanner = ({ findings }) => {
  if (!findings) return null
  return (
    <SimpleGrid
      columns={4}
      pt={5}
      pb={10}
      borderTop={["0.0625rem solid", null, "none"]}
      borderBottom="0.125rem solid"
      borderColor="gray.100"
    >
      {findings.slice(0, 3).map((finding, i) => {
        return (
          <Stack
            key={i}
            spacing="xs"
            gridColumn={["span 4", null, "span 2", null, "span 1"]}
          >
            <Text fontSize="2xl" fontWeight={700}>
              {finding.title}
            </Text>
            <Text
              fontWeight={500}
              fontSize="lg"
              lineHeight="short"
              color="gray.500"
            >
              {finding.description}
            </Text>
          </Stack>
        )
      })}
      <Box gridColumn={["span 4", null, "span 2", null, "span 1"]}>
        <ButtonLink
          href="/Climatescope-2021-report.pdf"
          download="Climatescope-2021-report.pdf"
          target="_blank"
          h="6rem"
          borderRadius="none"
          justifyContent="left"
          whiteSpace="wrap"
          width="100%"
        >
          <Text
            fontWeight={600}
            fontSize="md"
            lineHeight="short"
            textTransform="none"
          >
            {"Download report to find out more about this sector"}
          </Text>
        </ButtonLink>
      </Box>
    </SimpleGrid>
  )
}

export default SectorPageBanner
