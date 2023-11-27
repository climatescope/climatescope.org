import {
  Box,
  Stack,
  Heading,
  Text,
  Center,
  HStack,
  Tag,
} from "@chakra-ui/react"

import Image from "@components/Image"
import { Link, LinkBox, LinkOverlay, ButtonLink } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import { ChevronRight } from "@components/Icon"

const content = [
  {
    id: 1,
    order: [1, null, null, null, 2],
    // title: (indicatorCount) => `${indicatorCount} indicators across 3 sectors`,
    // description: (indicatorCount, marketCount) => [
    //   `As of 2022, Climatescope analyses data from ${marketCount} markets across 3 sectors with a total of ${indicatorCount} indicators.`,
    // ],
    title: () => `222 indicators across three sectors`,
    description: () => [
      `As of 2023, Climatescope analyzes data from 140 markets across three sectors with a total of 222 indicators.`,
    ],
    action: { text: "Explore sectors", href: "/sectors" },
  },
  {
    id: 2,
    order: [2, null, null, null, 1],
    title: "Power",
    sector: "power",
    img: "energy.jpg",
    alt: "Power sector",
    href: "/sectors/power",
    isNew: false,
    comingSoon: false,
  },
  {
    id: 3,
    order: 3,
    title: "Transport",
    sector: "transport",
    img: "transport.jpg",
    alt: "Transport sector",
    href: "/sectors/transport",
    isNew: true,
    comingSoon: false,
  },
  {
    id: 4,
    order: 4,
    title: "Buildings",
    sector: "buildings",
    img: "buildings.jpg",
    alt: "Buildings sector",
    href: "/sectors/buildings",
    isNew: true,
    comingSoon: false,
  },
]

const SummaryCard = ({ title, description, action, order, metaData }) => {
  return (
    <Box bg="brand.900" order={order}>
      <Center fontSize="3xl" fontWeight={700} w="4rem" h="4rem" bg="white">
        {"i"}
      </Center>
      <Center px={[0, null, 6]} py={[10]}>
        <Stack spacing={6} alignItems="flex-start" color="white">
          <Heading
            as="h2"
            fontSize={["xl", null, null, "2xl"]}
            lineHeight="shorter"
            maxW="15rem"
          >
            {title(metaData.indicatorCount)}
          </Heading>
          {description(
            metaData.indicatorCount,
            metaData.countryCounts.total
          ).map((d, i) => (
            <Text
              key={i}
              color="brand.100"
              lineHeight="short"
              display={["none", null, "block", "none", "block"]}
            >
              {d}
            </Text>
          ))}
          <ButtonLink
            href={action.href}
            size="lg"
            variant="outline"
            colorScheme="white"
          >
            {action.text}
          </ButtonLink>
        </Stack>
      </Center>
    </Box>
  )
}

const SectorCard = ({
  title,
  sector,
  img,
  alt,
  href,
  order,
  isNew,
  comingSoon,
  marketCounts,
}) => {
  return (
    <LinkBox as={Box} order={order}>
      <Stack spacing={3}>
        <Box>
          <Image
            src={img}
            alt={alt}
            type="sector"
            ratio={[1, 3 / 4, 1, 3 / 4]}
            opacity={comingSoon ? "0.5" : "1"}
          />
        </Box>
        <Stack spacing={1}>
          <Heading as="h2" fontSize="2xl">
            {comingSoon ? (
              title
            ) : (
              <LinkOverlay href={href}>{title}</LinkOverlay>
            )}
            {isNew ? (
              <Tag
                verticalAlign="middle"
                ml={2}
                size="sm"
                textTransform="uppercase"
                fontWeight={600}
              >
                {"New"}
              </Tag>
            ) : null}
            {comingSoon ? (
              <Tag
                verticalAlign="middle"
                ml={2}
                size="sm"
                textTransform="uppercase"
                fontWeight={600}
                colorScheme="gray"
              >
                {"Coming soon"}
              </Tag>
            ) : null}
          </Heading>
          <Text
            fontSize="sm"
            lineHeight="shorter"
            color="gray.500"
            fontWeight={600}
          >
            {comingSoon ? "" : `${marketCounts[sector]} markets`}
          </Text>
        </Stack>
      </Stack>
    </LinkBox>
  )
}

const Sectors = ({ metaData }) => {
  return (
    <SimpleGrid as="section" columns={[1, 2, null, 4]}>
      <HStack
        gridColumn="1 / -1"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Heading variant="sectionTitle">{"Sectors"}</Heading>
        <Link
          href="/sectors"
          variant="section"
          display={["none", null, "flex"]}
        >
          {"All sectors"}
          <ChevronRight size={20} strokeWidth={2} />
        </Link>
      </HStack>

      {content.map(({ id, ...item }) => {
        return item.action ? (
          <SummaryCard key={id} metaData={metaData} {...item} />
        ) : (
          <SectorCard
            key={id}
            marketCounts={metaData.countryCounts}
            {...item}
          />
        )
      })}
    </SimpleGrid>
  )
}

export default Sectors
