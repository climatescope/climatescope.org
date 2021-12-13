import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Stack,
  Tab,
  IconButton,
  Divider,
} from "@chakra-ui/react"
import dayjs from "dayjs"

import { Link } from "@components/Link"
import SEO from "@components/SEO"
import { ChevronRight } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"

const BlogTab = ({ tabName }) => {
  return (
    <Tab
      px={4}
      color="gray.300"
      fontWeight={600}
      borderBottomWidth="0.1875rem"
      borderColor="brand.900"
      _focus={{ bg: "brand.900", boxShadow: "outline" }}
      _active={{ bg: "brand.900" }}
      _selected={{ color: "white", borderColor: "white" }}
    >
      {tabName}
    </Tab>
  )
}

const BlogBanner = () => {
  return (
    <Container py={20}>
      <Stack spacing={5}>
        <Heading fontSize="3rem">{"Blog"}</Heading>
        <Text variant="subtitle" color="white">
          {"Visit "}
          <Link
            href="https://2020.global-climatescope.org/library/insights"
            textDecoration="underline"
          >
            {"Climatescope 2020"}
          </Link>
          {" to read older blog posts."}
        </Text>
      </Stack>
    </Container>
  )
}

const BlogLandingPage = ({ allPosts }) => {
  return (
    <>
      <SEO title="Climatescope 2021 | Blog" />
      <Box bg="brand.900" color="white">
        <BlogBanner />
      </Box>
      <Container as="main" py={20}>
        <Stack>
          {allPosts.map((post) => {
            const date = dayjs(post.date).format("MMMM D, YYYY")
            return (
              <Box key={post.title}>
                <SimpleGrid columns={8} py={10}>
                  <Box gridColumn={["1 / -1", null, null, "1 / 3"]}>
                    <Text
                      fontSize="md"
                      lineHeight="short"
                      fontWeight={600}
                      color="gray.600"
                    >
                      {date}
                    </Text>
                  </Box>

                  <Stack
                    gridColumn={["1 / -1", null, null, "3 / -1", "3 / 7"]}
                    spacing={6}
                  >
                    <Stack spacing={3}>
                      <Link href={`/blog/${post.slug}`}>
                        <Heading fontSize="2xl">{post.title}</Heading>
                      </Link>
                      <Text color="gray.600">{post.description}</Text>
                    </Stack>
                  </Stack>

                  <Flex
                    display={["none", null, null, null, "flex"]}
                    gridColumn="7 / -1"
                    justifyContent="flex-end"
                  >
                    <Link href={`/blog/${post.slug}`} mr={2}>
                      <IconButton
                        icon={<ChevronRight size={20} strokeWidth={2} />}
                        borderRadius="full"
                        colorScheme="gray"
                        variant="ghost"
                      />
                    </Link>
                  </Flex>
                </SimpleGrid>
                <Divider />
              </Box>
            )
          })}
        </Stack>
      </Container>
    </>
  )
}

export default BlogLandingPage
