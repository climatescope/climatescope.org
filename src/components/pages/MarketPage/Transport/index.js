import { Box, Heading } from "@chakra-ui/react"

import SimpleGrid from "@components/SimpleGrid"
import SubSectionText from "@components/pages/MarketPage/SubSectionText"
import SubSectionChart from "@components/pages/MarketPage/SubSectionChart"

const TransportSection = ({ title, subsections, market }) => {
  return (
    <SimpleGrid columns={8}>
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <Heading as="h2" fontSize="4xl">
          {title}
        </Heading>
      </Box>

      {subsections.map((section) => {
        if (section.title === "Doing business and barriers") return null
        return (
          <SimpleGrid
            key={section.key}
            columns={8}
            gridRowGap={5}
            gridColumn="1 / -1"
          >
            <SubSectionText title={section.title} paragraphs={section.text} />
            <SubSectionChart
              section={3}
              subSection={section.key}
              market={market}
            />
          </SimpleGrid>
        )
      })}
    </SimpleGrid>
  )
}

export default TransportSection
