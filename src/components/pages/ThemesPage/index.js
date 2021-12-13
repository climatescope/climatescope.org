import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Divider,
  HStack,
} from "@chakra-ui/react"

import Image from "@components/Image"
import { Link, ButtonLink } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import { ArrowRight } from "@components/Icon"

const content = [
  {
    name: "Investment",
    title: "Investment",
    description: [
      "Global energy transition investment jumped, despite the pandemic but investors’ attention shifted to developed markets",
      "The energy transition investment gap is growing, despite COP26 pledges",
      "Renewable energy investment jumped 24% in rich nations, but plummeted 9% in emerging markets",
    ],
    action: "Read more on investment",
    path: "investment",
    image: "investment.jpg",
  },
  {
    name: "Policy",
    title: "Policy",
    description: [
      "89% of emissions are covered by a net-zero target in force or under discussion",
      "Renewable energy targets have been ineffective in influencing other policies",
      "Clean buildings policies are highly concentrated in developed nations",
    ],
    action: "Read more on policy",
    path: "policy",
    image: "policy.jpg",
  },
  {
    name: "Progress",
    title: "Progress",
    description: [
      "Lockdowns impacted OECD and non-OECD countries differently",
      "Wind and solar accounted for over two-thirds of net new capacity in 2020",
      "Global passenger electric vehicle sales have tripled in four years",
    ],
    action: "Read more on progress",
    path: "progress",
    image: "progress.jpg",
  },
]

export default function ThemesPage() {
  return (
    <>
      <Container as="main">
        <SimpleGrid columns={8} pt={10} pb={40}>
          <Stack spacing={10} gridColumn={["1 / -1", null, null, "2 / span 5"]}>
            <Heading fontSize="3rem">{"Themes"}</Heading>
            <Text variant="subtitle">
              {
                "This marks the 10th anniversary of Climatescope, BNEF’s annual assessment of energy transition opportunities. For the first time, the project has expanded its scope to include activity not just in clean power but in the decarbonization of the transportation and buildings sectors."
              }
            </Text>
          </Stack>
          <Box gridColumn={["1 / -1", null, null, "2 / -2"]}>
            {content.map(
              ({ name, description, action, image, caption, path }, i) => {
                const isOdd = i % 2
                return (
                  <Box key={name} fontSize="1.25rem" py={[5, null, null, 10]}>
                    <SimpleGrid columns={8} gridRowGap={0}>
                      <Box
                        gridColumn={["span 8", null, null, "span 4"]}
                        order={isOdd ? [2] : [1]}
                        display={["none", null, null, "block"]}
                      >
                        <Link href={`/themes/${path}`}>
                          <Image
                            src={image}
                            alt={caption}
                            type="thumbnail"
                            ratio={3 / 4}
                          />
                        </Link>
                      </Box>
                      <Box
                        gridColumn={["span 8", null, null, "span 4"]}
                        order={isOdd ? [1] : [2]}
                      >
                        <Stack spacing={10} alignItems="flex-start">
                          <Heading fontSize={["3xl", null, null, "4xl"]}>
                            {name}
                          </Heading>
                          <Stack
                            spacing={[5, null, null, 8]}
                            divider={<Divider />}
                          >
                            {description.map((d, i) => {
                              return (
                                <HStack
                                  alignItems="flex-start"
                                  spacing={5}
                                  key={i}
                                >
                                  <Box flex="none" mt={1} color="teal.700">
                                    <ArrowRight />
                                  </Box>
                                  <Text
                                    fontSize={["md", null, null, "lg"]}
                                    color="gray.600"
                                  >
                                    {d}
                                  </Text>
                                </HStack>
                              )
                            })}
                          </Stack>
                          <ButtonLink href={`/themes/${path}`} size="lg">
                            {action}
                          </ButtonLink>
                        </Stack>
                      </Box>
                    </SimpleGrid>
                  </Box>
                )
              }
            )}
          </Box>
        </SimpleGrid>
      </Container>
    </>
  )
}
