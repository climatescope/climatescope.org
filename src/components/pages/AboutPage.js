import { Container, Stack } from "@chakra-ui/react"

import SEO from "@components/SEO"
import SimpleGrid from "@components/SimpleGrid"

export default function AboutPage({ metaData, ...restProps }) {
  return (
    <>
      <SEO title={metaData.title} />
      <Container as="main">
        <SimpleGrid columns={8} pt={10} pb={40}>
          <Stack
            spacing={10}
            gridColumn={["1 / -1", null, null, "2 / span 5"]}
            {...restProps}
          />
        </SimpleGrid>
      </Container>
    </>
  )
}
