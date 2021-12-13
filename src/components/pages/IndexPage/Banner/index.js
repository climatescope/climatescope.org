import {
  Heading,
  Center,
  Text,
  Box,
  Stack,
  HStack,
} from "@chakra-ui/react"

import { LinkBox, LinkOverlay } from "@components/Link"
import Image from "@components/Image"
import SimpleGrid from "@components/SimpleGrid"
import { ArrowRight } from "@components/Icon"

const bannerActions = [
  {
    key: 1,
    title: "2021 Ranking",
    description: "Explore the latest ranking",
    href: "/results",
    color: "teal.800",
  },
  {
    key: 2,
    title: "2021 Key findings",
    description: "Read about the key findings",
    href: "/themes",
    color: "teal.800",
  },
  {
    key: 3,
    title: "2021 Full report",
    description: "Download the full report",
    href: "/climatescope-2021-report.pdf",
    color: "teal.800",
  },
]

const Banner = () => {
  return (
    <Stack spacing={12}>
      <SimpleGrid columns={8} gridRowGap={0}>
        <Box gridColumn="1 / -1" position="relative">
          <Center overflow="hidden" justifyContent="flex-end">
            <Box w="100%" minW="65rem">
              <Image src="cover.jpg" ratio={2.7 / 1} type="cover" />
            </Box>
          </Center>
          <Text
            color="gray.500"
            position="absolute"
            top="100%"
            left="100%"
            zIndex={99}
            transform="rotate(-90deg)"
            transformOrigin="top left"
            fontSize="xs"
            lineHeight="shorter"
            fontWeight={600}
            whiteSpace="nowrap"
            mt="-0.125rem"
            ml={1}
            textTransform="uppercase"
          >
            {"Photo © NASA Earth Observatory by Lauren Dauphin"}
          </Text>
        </Box>
        <Box
          gridColumn={["1 / -1", null, null, "1 / 6"]}
          mt={[0, null, null, "-4.875rem"]}
          pt={8}
          position="relative"
          bg="white"
          boxShadow="2.5rem 0 0 0 #FFF"
        >
          <Text
            fontWeight={600}
            position="absolute"
            bg="white"
            top="-2rem"
            left={0}
            pr={6}
            pt={3}
          >
            {"10 years of Climatescope"}
          </Text>
          <Heading
            fontSize={["3xl", null, "4xl", "5xl"]}
            mb="-0.5rem"
            letterSpacing="-0.0625rem"
          >
            {
              "Which market is the most attractive for energy transition investment?"
            }
          </Heading>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[16, null, 15, 16]}>
        {bannerActions.map(({ key, title, description, href }) => {
          return (
            <LinkBox key={key} gridColumn={key < 2 ? ["span 16", "span 8", "span 5"] : ["span 16", "span 8", "span 5"]}>
              <HStack
                spacing={5}
                py={6}
                borderY="0.0625rem solid"
                borderColor="gray.100"
                h="100%"
                alignItems="flex-start"
              >
                <Stack flex="1" spacing={2}>
                  <Heading fontSize={["md", "lg", "xl"]}>
                    <LinkOverlay href={href}>{title}</LinkOverlay>
                  </Heading>
                  <Text color="gray.500" lineHeight="shorter">{description}</Text>
                </Stack>
                <Box flex="none">
                  <ArrowRight size={24} />
                </Box>
              </HStack>
            </LinkBox>
          )
        })}
      </SimpleGrid>
    </Stack>
  )
}

export default Banner
