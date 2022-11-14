import { Box, Container, Heading } from "@chakra-ui/react"

import SimpleGrid from "@components/SimpleGrid"
import ToolCard from "@components/ToolCard"

export default function ToolsLandingPage({ allTools }) {
  return (
    <Container>
      <SimpleGrid columns={2} pt={10} pb={40}>
        <Box gridColumn="1 / -1">
          <Heading as="h1" variant="pageTitle">{"Tools"}</Heading>
        </Box>
        {allTools
          .sort((a, b) => a.order - b.order)
          .map(({ title, description, slug, src }) => {
            return (
              <ToolCard
                key={slug}
                title={title}
                description={description}
                slug={slug}
                src={src}
              />
            )
          })}
      </SimpleGrid>
    </Container>
  )
}
