import {
  Heading,
  Text,
  Box,
  Stack,
  HStack,
} from "@chakra-ui/react"

import { Link, LinkBox, LinkOverlay } from "@components/Link"
import Image from "@components/Image"
import SimpleGrid from "@components/SimpleGrid"
import { ChevronRight } from "@components/Icon"

const toolsList = [
  {
    key: 1,
    title: "Geography comparison",
    description: "Pick up to three markets to compare",
    href: "/tools/geography-comparison",
    src: "geography-comparison.jpg",
  },
  {
    key: 2,
    title: "Capacity and generation",
    description: "Which emerging markets have the most clean energy?",
    href: "/tools/capacity-generation/",
    src: "capacity-generation.jpg",
  },
]

const Tools = () => {
  return (
    <SimpleGrid columns={2}>
      <HStack
        gridColumn="1 / -1"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Heading fontSize={["3xl", null, null, "4xl"]}>{"Tools"}</Heading>
        <Link href="/tools" variant="section" display={["none", null, "flex"]}>
          {"All tools"}
          <ChevronRight size={20} strokeWidth={2} />
        </Link>
      </HStack>

      {toolsList.map(({ key, src, title, href, description }) => {
        return (
          <Box key={key} gridColumn={["span 2", null, null, "span 1"]}>
            <LinkBox as={SimpleGrid} columns={4}>
              <Box gridColumn="1 / -1">
                <Image src={src} ratio={16 / 9} type="feature" />
              </Box>
              <Stack
                spacing={2}
                gridColumn="span 3"
                mt="-5.1875rem"
                pt={5}
                pr={10}
                bg="white"
                zIndex={1}
              >
                <Heading fontSize="2xl">
                  <LinkOverlay href={href}>{title}</LinkOverlay>
                </Heading>
                <Text lineHeight="shorter" fontWeight={600} color="gray.500">
                  {description}
                </Text>
              </Stack>
            </LinkBox>
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

export default Tools
