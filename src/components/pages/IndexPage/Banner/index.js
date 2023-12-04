import { Heading, Center, Text, Box, Stack, HStack } from "@chakra-ui/layout"
import getConfig from "next/config"

import { LinkBox, LinkOverlay } from "@components/Link"
import Image from "@components/Image"
import SimpleGrid from "@components/SimpleGrid"
import {
  ChevronRight,
  StarIcon,
  // ChartIcon,
  ReportIcon,
  DownloadIcon,
} from "@components/Icon"

const { publicRuntimeConfig } = getConfig()
const year = publicRuntimeConfig.year

const bannerActions = [
  {
    key: 1,
    title: `${year} Ranking`,
    description: "Explore the latest ranking",
    href: "/results",
    color: "teal.800",
    icon: "StarIcon",
  },
  // {
  //   key: 2,
  //   title: `${year} Highlights`,
  //   description: "See this year's highlights",
  //   href: "/highlights",
  //   color: "teal.800",
  //   icon: "ChartIcon",
  // },
  {
    key: 2,
    title: `Highlights`,
    description: `Climatescope ${year} key findings`,
    href: "highlights",
    color: "teal.800",
    icon: "ReportIcon",
  },
  {
    key: 3,
    title: `Power Transition Factbook`,
    description: `Download the ${year} report`,
    href: "/downloads/climatescope-2023-report-en.pdf",
    color: "teal.800",
    icon: "DownloadIcon",
  },
]

export default function Banner() {
  return (
    <Stack spacing={12}>
      <SimpleGrid columns={8} gridRowGap={0}>
        <Box gridColumn="1 / -1" position="relative">
          <Center overflow="hidden" justifyContent="flex-end">
            <Box w="100%" minW="65rem">
              <Image
                src="cover.jpg"
                alt="Climatescope 2023 cover image"
                ratio={2.7 / 1}
                type="cover"
              />
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
            {"Photo © NASA Earth Observatory"}
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
          <Heading
            as="h1"
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
      <SimpleGrid columns={16}>
        {bannerActions.map(({ key, title, description, href, icon }) => {
          return (
            <LinkBox
              key={key}
              gridColumn={["span 16", null, "span 8", "span 5"]}
            >
              <HStack
                spacing={5}
                py={[3, null, 6]}
                borderY="0.0625rem solid"
                borderColor={["white", null, "gray.100"]}
                h="100%"
                alignItems="flex-start"
              >
                <Center
                  flex="none"
                  w="3rem"
                  h="3rem"
                  bg="gray.50"
                  borderRadius="full"
                >
                  {/* {icon === "StarIcon" ? (
                    <StarIcon />
                  ) : icon === "ChartIcon" ? (
                    <ChartIcon />
                  ) : (
                    <ReportIcon />
                  )} */}
                  {icon === "StarIcon" ? (
                    <StarIcon />
                  ) : icon === "ReportIcon" ? (
                    <ReportIcon />
                  ) : (
                    <DownloadIcon />
                  )}
                </Center>
                <Stack flex="1" spacing={2}>
                  <Heading as="h3" variant="keyMessageTitle">
                    <HStack as="span" justifyContent="space-between">
                      <LinkOverlay
                        href={href}
                        sx={{ "+ .icn": { opacity: 0 } }}
                        _hover={{
                          "+ .icn": {
                            transform: "translateX(0.5rem)",
                            opacity: 1,
                          },
                        }}
                        _focusVisible={{
                          "+ .icn": {
                            transform: "translateX(0.5rem)",
                            opacity: 1,
                          },
                        }}
                      >
                        {title}
                      </LinkOverlay>
                      <Box
                        flex="none"
                        transition="all 0.5s ease"
                        className="icn"
                        aria-hidden={true}
                      >
                        <ChevronRight size={24} />
                      </Box>
                    </HStack>
                  </Heading>
                  <Text variant="keyMessageText">{description}</Text>
                </Stack>
              </HStack>
            </LinkBox>
          )
        })}
      </SimpleGrid>
    </Stack>
  )
}
