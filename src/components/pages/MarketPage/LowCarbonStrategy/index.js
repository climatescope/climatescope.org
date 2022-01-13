import { Box, Heading, Stack, HStack, Skeleton } from "@chakra-ui/react"

import { Link } from "@components/Link"
import { ArrowRight } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"
import SubSectionText from "@components/pages/MarketPage/SubSectionText"

const LowCarbonStrategySection = ({ title, subsections, similarMarkets }) => {
  return (
    <SimpleGrid columns={8} alignItems="start">
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <Heading as="h2" fontSize="4xl">
          {title}
        </Heading>
      </Box>

      <SimpleGrid columns={6} gridColumn={["span 8", null, null, "span 6"]}>
        {subsections.map((section) => {
          return (
            <SubSectionText
              key={section.key}
              title={section.title}
              paragraphs={section.text}
            />
          )
        })}
      </SimpleGrid>

      <Stack
        as="aside"
        spacing={5}
        gridColumn={["1 / -1", null, null, "-3 / -1"]}
        gridRow={["3", null, null, "1 / span 2"]}
        display={["none", null, null, "flex"]}
      >
        <Heading as="h2" fontSize="2xl">
          {"Suggested markets"}
        </Heading>
        <Stack spacing={3}>
          {!similarMarkets && (
            <>
              <Skeleton startColor="gray.25" endColor="gray.100" h="1.75rem" />
              <Skeleton startColor="gray.25" endColor="gray.100" h="1.75rem" />
              <Skeleton startColor="gray.25" endColor="gray.100" h="1.75rem" />
            </>
          )}
          {similarMarkets &&
            similarMarkets.slice(0, 6).map((similarMarket) => {
              const key = similarMarket.similarity.iso2 || similarMarket.iso
              return (
                <Link
                  key={key}
                  href={`/markets/${key.toLowerCase()}`}
                  fontWeight={600}
                >
                  <HStack spacing={2}>
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
