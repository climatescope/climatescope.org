import { useRef } from "react"
import {
  Container,
  Stack,
  HStack,
  Box,
  Text,
  Wrap,
  WrapItem,
  VisuallyHidden,
} from "@chakra-ui/react"

import SEO from "@components/SEO"
import Image from "@components/Image"
import SimpleGrid from "@components/SimpleGrid"
import ShareButton from "@components/ShareButton"
import { TwitterIcon, LinkedinIcon, FacebookIcon, EnvelopeIcon } from "@components/Icon"

import extractKeyMDXParts from "@utils/extractKeyMDXParts"
import { useScroller, useScrollStore } from "@utils/useScrollama"

export default function ThemePage({ metaData, children, ...restProps }) {
  const { heading, sections } = extractKeyMDXParts(children, {
    subHeading: false,
  })

  const navigationHeadings = sections.map((d) => d[0].props.children)

  const container = useRef()
  useScroller({ container })

  const currentStep = useScrollStore((state) => state.currentStep)

  const handleClick = (i) => (e) => {
    e.preventDefault()
    const all = document.querySelectorAll(`[data-scroll-step="true"]`)
    const element = all[i]

    if (element.scrollIntoView) element.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <>
      <SEO {...metaData} />
      <Container as="main">
        <Stack spacing={6} pb={40}>
          <SimpleGrid columns={8}>
            <Box gridColumn="1 / -1" gridRow="1">
              <Image
                src={metaData.cover}
                ratio={[16 / 9, null, null, 3 / 1]}
                type="cover"
              />
            </Box>
            <Box
              gridColumn={["1 / -1", null, "1 / -4", null, "2 / -3"]}
              gridRow={["2", null, null, "1"]}
              alignSelf="end"
              zIndex={1}
              bg="white"
              mx={[0, null, null, -8, -10]}
              mb={[0, null, null, -2]}
              px={[0, null, null, 8, 10]}
              pt={[0, null, null, 8, 10]}
            >
              {heading}
            </Box>
          </SimpleGrid>

          <SimpleGrid columns={8}>
            <Box gridColumn={["1 / -1", null, null, "1 / -4", "2 / -3"]} pt={[0, null, null, 5]}>
              <Stack
                ref={container}
                spacing={10}
                pb={10}
                sx={{
                  ".remark-highlight": {
                    width: "100%",
                    maxWidth: "container.sm",
                    mx: "auto",
                  },
                }}
                {...restProps}
              >
                {sections.map((sectionContent, i) => {
                  return (
                    <Stack key={i} spacing={6} data-scroll-step="true">
                      {sectionContent}
                    </Stack>
                  )
                })}
              </Stack>
            </Box>

            <Stack
              gridColumn={["1 / -1", null, null, "-4 / -1", "-3 / -1"]}
              alignSelf="start"
              position="sticky"
              top={0}
              py={8}
              spacing={10}
            >
              <Stack spacing={5}>
                <Text
                  lineHeight="shorter"
                  fontWeight={700}
                  textTransform="uppercase"
                >
                  {"Share"}
                </Text>
                <Wrap spacing={3}>
                  <WrapItem flex={["0", null, null, "1"]}>
                    <ShareButton platformName="twitter">
                      <VisuallyHidden>{"Share this page on Twitter"}</VisuallyHidden>
                      <TwitterIcon size={20} />
                    </ShareButton>
                  </WrapItem>
                  <WrapItem flex={["0", null, null, "1"]}>
                    <ShareButton platformName="linkedin">
                      <VisuallyHidden>{"Share this page Linkedin"}</VisuallyHidden>
                      <LinkedinIcon size={20} />
                    </ShareButton>
                  </WrapItem>
                  <WrapItem flex={["0", null, null, "1"]}>
                    <ShareButton platformName="facebook">
                      <VisuallyHidden>{"Share this page Facebook"}</VisuallyHidden>
                      <FacebookIcon size={20} />
                    </ShareButton>
                  </WrapItem>
                  <WrapItem flex={["0", null, null, "1"]}>
                    <ShareButton platformName="email">
                      <VisuallyHidden>{"Share this page via email"}</VisuallyHidden>
                      <EnvelopeIcon size={20} />
                    </ShareButton>
                  </WrapItem>
                </Wrap>
              </Stack>

              <Stack spacing={5} display={["none", null, null, "flex"]}>
                <Text
                  lineHeight="shorter"
                  fontWeight={700}
                  textTransform="uppercase"
                  mt={1}
                >
                  {"On this page"}
                </Text>
                <Stack spacing={3}>
                  {navigationHeadings.map((navHeading, i) => {
                    return (
                      <HStack alignItems="stretch" key={i}>
                        <Box
                          w="0.25rem"
                          bg={currentStep === i ? "teal.700" : "gray.50"}
                          flex="none"
                        />
                        <Text
                          as="a"
                          href="#"
                          key={i}
                          lineHeight="shorter"
                          style={{ fontWeight: currentStep === i ? 600 : 400 }}
                          color={currentStep === i ? "teal.700" : "gray.500"}
                          cursor="pointer"
                          onClick={handleClick(i)}
                          flex="auto"
                        >
                          {navHeading}
                        </Text>
                      </HStack>
                    )
                  })}
                </Stack>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}
