import { Container, Stack } from "@chakra-ui/react"

import SEO from "@components/SEO"
import extractKeyMDXParts from "@utils/extractKeyMDXParts"

export default function Page({ metaData, children, ...restProps }) {
  const { heading, subHeading, textBody } = extractKeyMDXParts(children, {
    subHeading: true,
  })
  return (
    <>
      <SEO title={metaData.title} />
      <Container as="main">
        <Stack
          spacing={5}
          pt={10}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
        >
          {heading}
          {subHeading}
        </Stack>
        <Stack spacing={10} pt={10} pb={20} {...restProps}>
          {textBody}
        </Stack>
      </Container>
    </>
  )
}
