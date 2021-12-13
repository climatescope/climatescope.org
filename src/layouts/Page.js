import { Container, Stack } from "@chakra-ui/react"

import SEO from "@components/SEO"

export default function Page({ metaData, ...restProps }) {
  return (
    <>
      <SEO title={metaData.title} />
      <Container as="main" maxW="container.md">
        <Stack spacing={10} py={20} {...restProps} />
      </Container>
    </>
  )
}
