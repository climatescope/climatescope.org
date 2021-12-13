import { Box, Stack, HStack, Heading, Skeleton } from "@chakra-ui/react"

import SimpleGrid from "@components/SimpleGrid"
import { Link } from "@components/Link"
import SubSectionText from "@components/pages/MarketPage/SubSectionText"
import { ArrowRight } from "@components/Icon"

const LowCarbonStrategySection = ({ title, subsections, similarMarkets }) => {
  return (
    <SimpleGrid columns={8}>
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]} gridRow={["2", null, null, "1"]}>
        <Heading as="h2" fontSize="4xl">
          {title}
        </Heading>
      </Box>

      {subsections.map((section) => {
        return (
          <SubSectionText
            key={section.key}
            title={section.title}
            paragraphs={section.text}
          />
        )
      })}

      <Stack
        as="aside"
        spacing={5}
        gridColumn={["1 / -1", null, null, "-3 / -1"]}
        gridRow={["1", null, null, "1 / span 2"]}
      >
        <Heading as="h2" fontSize="2xl">
          {"Similar markets"}
        </Heading>
        <Stack spacing={3}>
          {!similarMarkets && (
            <>
              <Skeleton startColor="gray.25" endColor="gray.100" h="1.75rem" />
              <Skeleton startColor="gray.25" endColor="gray.100" h="1.75rem" />
              <Skeleton startColor="gray.25" endColor="gray.100" h="1.75rem" />
            </>
          )}
          {similarMarkets && similarMarkets.slice(0, 6).map((similarMarket) => {
            const key = similarMarket.similarity.iso2 || similarMarket.iso
            return (
              <Link
                key={key}
                href={`/markets/${key.toLowerCase()}`}
                fontWeight={600}
              >
                <HStack spacing={1}>
                  <ArrowRight size="20" strokeWidth={2} />
                  <span>{similarMarket.name}</span>
                </HStack>
              </Link>
            )
          })}
        </Stack>
      </Stack>
    </SimpleGrid>
  )
}

export default LowCarbonStrategySection
