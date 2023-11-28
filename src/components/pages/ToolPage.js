import { Container, Stack, Text } from "@chakra-ui/react"

import SEO from "@components/SEO"
import extractKeyMDXParts from "@utils/extractKeyMDXParts"

export default function ToolPage({
  textAlign = "center",
  alignItems = "center",
  metaData,
  children,
  ...restProps
}) {
  // const { heading, subHeading, textBody } = extractKeyMDXParts(children, {
  //   subHeading: true,
  // })
  return (
    <>
      <SEO {...metaData} />
      <Container as="main">
        {/* <Stack
          spacing={5}
          pt={10}
          textAlign={textAlign}
          justifyContent="center"
          alignItems={alignItems}
        >
          {heading}
          {subHeading?.props?.children && (
            <Text variant="subtitle">{subHeading?.props?.children}</Text>
          )}
        </Stack>
        <Stack spacing={10} pt={10} pb={20} {...restProps}>
          {textBody}
        </Stack> */}
        {children}
      </Container>
    </>
  )
}
