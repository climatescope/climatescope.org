import { useState } from "react"
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  Stack,
  HStack,
  Divider,
  Center,
  Container,
} from "@chakra-ui/react"

import Image from "@components/Image"
import SimpleGrid from "@components/SimpleGrid"
import { ButtonLink } from "@components/Link"
import { InvestmentIcon, PolicyIcon, ProgressIcon, ArrowRight } from "@components/Icon"

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
    path: "/themes/investment",
    image: "investment.jpg",
    icon: <InvestmentIcon size="32" strokeWidth={1.5} />,
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
    path: "/themes/policy",
    image: "policy.jpg",
    icon: <PolicyIcon size="32" strokeWidth={1.5} />,
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
    path: "/themes/progress",
    image: "progress.jpg",
    icon: <ProgressIcon size={"32"} strokeWidth={1.5} />,
  },
]


const Insights = () => {
  const [val, setVal] = useState(0)
  const handleChange = (val) => setVal(val)

  const names = ["Investment", "Policy", "Progress", "Results"]
  const images = [ "investment.jpg", "policy.jpg", "progress.jpg" ]
  const links = ["https://unsplash.com/photos/kr_RUzFy2SY", "https://unsplash.com/photos/0LUqdizULdY", "https://unsplash.com/photos/MakDBejr9kI"]
  const captions = ["photo of Sunrise colours in Frankfurt am Main with the ​skyline by Paul Fiedler via Unsplash", "photo of Law Courts of Brussels by Adrien Delforge via Unsplash", "photo of people climbing Cat Bells Summit by Matthew Waring via Unsplash"]

  return (
    <Box bg="gray.25" left="50%" position="relative" w="100vw" transform="translateX(-50%)" py={[10, null, null, 24]}>
      <Container>
        <SimpleGrid columns={8}>
          <Box gridColumn={["1 / -1", null, null, "1 / 5"]} gridRow={1} pl={20} display={["none", null, null, "block"]}>
            <Box position="relative">
              <Image
                src={images[val]}
                alt={captions[val]}
                type="thumbnail"
                ratio={3 / 4}
              />
              <SimpleGrid
                columns={4}
                position="absolute"
                bottom={0}
                left={-20}
                right={0}
              >
                <Stack
                  gridColumn="span 2"
                  bg="gray.25"
                  h="14rem"
                  justifyContent="flex-end"
                >
                  <Box color="gray.500" fontFamily="heading" fontWeight={700}>
                    {`${val + 1} — ${names[val]}`}
                  </Box>
                </Stack>
              </SimpleGrid>
            </Box>
          </Box>
          <Box gridColumn={["1 / -1", null, null, "5 / -1"]} gridRow={1} pr={[0, null, null, 20]}>
            <Tabs isFitted size="lg" onChange={handleChange}>
              <TabList>
                {content.map(({ name, icon }) => {
                  return (
                    <Tab
                      key={name}
                      fontSize="lg"
                      borderBottomWidth="0.25rem"
                      color="gray.500"
                      w="33.33%"
                      fontWeight={600}
                      _selected={{
                        color: "teal.800",
                        borderColor: "teal.800",
                        fontWeight: 700,
                      }}
                    >
                      <Stack alignItems="center" spacing={2} textAlign="center">
                        <Center
                          w={["2.5rem", null ,null, "3.5rem"]}
                          h={["2.5rem", null ,null, "3.5rem"]}
                        >
                          {icon}
                        </Center>
                        <Box>{name}</Box>
                      </Stack>
                    </Tab>
                  )
                })}
              </TabList>
              <TabPanels>
                {content.map(({ name, title, description, action, path }) => {
                  return (
                    <TabPanel key={name}>
                      <Stack spacing={10} alignItems="flex-start">
                        <Heading fontSize={["3xl", null, null, "4xl"]}>{title}</Heading>
                        <Stack spacing={[5, null, null, 8]} divider={<Divider />}>
                          {description.map((d, i) => {
                            return (
                              <HStack alignItems="flex-start" spacing={5} key={i}>
                                <Box flex="none" mt={1} color="teal.700">
                                  <ArrowRight />
                                </Box>
                                <Text fontSize={["md", null, null, "lg"]} color="gray.600">
                                  {d}
                                </Text>
                              </HStack>
                            )
                          })}
                        </Stack>
                        <ButtonLink href={path} size="lg">
                          {action}
                        </ButtonLink>
                      </Stack>
                    </TabPanel>
                  )
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Insights
