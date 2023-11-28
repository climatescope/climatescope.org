import { MDXRemote } from "next-mdx-remote"
import {
  Container,
  Stack,
  Box,
  Text,
  Wrap,
  WrapItem,
  Heading,
} from "@chakra-ui/layout"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"

import SEO from "@components/SEO"
import components from "@components/MDXComponents/sectorComponents"
import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"

import Image from "@components/Image"
import SimpleGrid from "@components/SimpleGrid"
import ShareButton from "@components/ShareButton"
import {
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
  EnvelopeIcon,
} from "@components/Icon"

export default function SectorPage({ source }) {
  const { frontmatter } = source
  return (
    <>
      <SEO {...frontmatter} />
      <Container as="main">
        <Stack spacing={6} pb={40}>
          <SimpleGrid columns={8}>
            <Box gridColumn="1 / -1" gridRow="1">
              <Image
                src={frontmatter.cover}
                ratio={[16 / 9, null, null, 3 / 1]}
                type="cover"
              />
            </Box>
            <Box
              gridColumn={["1 / -1", null, "1 / span 4"]}
              gridRow={["2", null, null, "1"]}
              alignSelf="end"
              zIndex={1}
              bg="white"
              mx={[0, null, null, -8, -10]}
              mb={[0, null, null, -2]}
              px={[0, null, null, 8, 10]}
              pt={[0, null, null, 8, 10]}
            >
              <Heading
                as="h1"
                w="100%"
                fontSize={["3xl", null, "5xl"]}
                maxW="container.sm"
              >
                {frontmatter.title}
              </Heading>
            </Box>
          </SimpleGrid>

          <SimpleGrid columns={8}>
            <MDXRemote {...source} components={components} />
            <Box
              h={0}
              position="sticky"
              gridColumn={["1 / -1", null, null, "-4 / -1", "-3 / -1"]}
              gridRow="2"
              alignSelf="start"
              top={0}
              display={["none", null, null, "block"]}
            >
              <Stack
                py={8}
                spacing={10}
                position="absolute"
                top={0}
                left={0}
                right={0}
              >
                <Stack spacing={5}>
                  <Text variant="kicker">{"Share"}</Text>
                  <Wrap spacing={3}>
                    <WrapItem flex={["0", null, null, "1"]}>
                      <ShareButton platformName="twitter">
                        <VisuallyHidden>{"Share on Twitter"}</VisuallyHidden>
                        <TwitterIcon size={24} />
                      </ShareButton>
                    </WrapItem>
                    <WrapItem flex={["0", null, null, "1"]}>
                      <ShareButton platformName="linkedin">
                        <VisuallyHidden>{"Share on Linkedin"}</VisuallyHidden>
                        <LinkedinIcon size={24} />
                      </ShareButton>
                    </WrapItem>
                    <WrapItem flex={["0", null, null, "1"]}>
                      <ShareButton platformName="facebook">
                        <VisuallyHidden>{"Share on Facebook"}</VisuallyHidden>
                        <FacebookIcon size={24} />
                      </ShareButton>
                    </WrapItem>
                    <WrapItem flex={["0", null, null, "1"]}>
                      <ShareButton platformName="email">
                        <VisuallyHidden>{"Share via email"}</VisuallyHidden>
                        <EnvelopeIcon size={24} />
                      </ShareButton>
                    </WrapItem>
                  </Wrap>
                </Stack>
              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps({ params }) {
  const source = await getMDXPage("sectors", params.slug || "")
  return { props: { source } }
}

export async function getStaticPaths() {
  const slugs = await getAllMDXSlugs("sectors")
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
