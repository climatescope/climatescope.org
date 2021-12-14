import { Container, Stack } from "@chakra-ui/react"

import SEO from "@components/SEO"
import SimpleGrid from "@components/SimpleGrid"

export default function BlogPost({ metaData, ...restProps }) {
  return (
    <>
      <SEO {...metaData} />
      <Container as="main">
        <SimpleGrid columns={8} pt={10} pb={40}>
          <Stack
            spacing={10}
            gridColumn={["1 / -1", null, null, "2 / span 5"]}
            sx={{
              "h1 + p": { color: "gray.500", fontSize: ["lg", null, "xl"] },
            }}
            {...restProps}
          />
        </SimpleGrid>
      </Container>
    </>
  )
}
