import {
  Stack,
  Center,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Divider,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

import { useGeographyComparisonStore } from "./store"
import EmptySlot from "./EmptySlot"
import fetchDataset from "@/utils/api/client/fetchDataset"
import CardTable from "@/components/CardTable"
import BooleanChart from "@/components/MDXComponents/BooleanChart"
import LineChart from "@/components/LineChart"
import AreaChart from "@/components/AreaChart"
import RadarChart from "@/components/ResultsList/RadarChart"

export default function ComparisonGeography({ slot = 1 }) {
  const selectedGeographies = useGeographyComparisonStore(
    (state) => state.selectedGeographies
  )
  const setSelectedGeographies = useGeographyComparisonStore(
    (state) => state.setSelectedGeographies
  )
  const geographies = useGeographyComparisonStore((state) => state.geographies)

  if (selectedGeographies?.length < slot) return <EmptySlot />

  return (
    <Stack spacing={5} bg="white" px={5}>
      <Menu matchWidth>
        <MenuButton
          as={Button}
          colorScheme="gray"
          textAlign="left"
          rightIcon={<ChevronDownIcon boxSize={6} />}
          pr={3}
        >
          {selectedGeographies[slot]?.label || "Select a geography"}
        </MenuButton>
        <MenuList
          motionProps={{
            variants: {
              enter: {
                visibility: "visible",
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                },
              },
              exit: {
                transitionEnd: {
                  visibility: "hidden",
                },
                y: 8,
                opacity: 0,
                scale: 1,
                transition: {
                  duration: 0.1,
                  easings: "easeOut",
                },
              },
            },
          }}
          maxH="20rem"
          overflowY="scroll"
        >
          <MenuOptionGroup
            type="radio"
            value={selectedGeographies[slot]?.val || ""}
            onChange={(val) => {
              const relevantGeography = geographies.find((s) => s.val === val)
              fetchDataset(`/data/markets/${val}.txt`).then((data) => {
                setSelectedGeographies({ ...data, ...relevantGeography }, slot)
              })
            }}
          >
            {geographies.map(({ val, label }) => {
              return (
                <MenuItemOption key={val} value={val}>
                  {label}
                </MenuItemOption>
              )
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Divider />
      <Box>
        {/* {!!selectedGeographies[slot]?.val && (
          <ComparisonGeographyContent slug={selectedGeographies[slot]?.val} />
        )} */}
        {selectedGeographies[slot] && (
          <ComparisonGeographyContent
            data={selectedGeographies[slot]}
            geographiesCount={geographies.length}
          />
        )}
      </Box>
    </Stack>
  )
}

function ComparisonGeographyContent({ data, geographiesCount }) {
  const {
    utilityPrivatisation,
    electricityPrices,
    capacity,
    generation,
    investment,
  } = data.chartData

  const relevantScores = data.relevantResults.score.find((s) => s.year === 2024)
  const powerData = relevantScores.sectors.find((s) => s.id === "power")

  return (
    <Stack spacing={5} divider={<Divider />}>
      <SimpleGrid columns={2} gridGap={5}>
        <Stack spacing={1}>
          <Text
            fontWeight={600}
            textTransform="uppercase"
            fontSize="xs"
            color="gray.500"
          >
            {"Power rank"}
          </Text>
          <Text fontWeight={700} fontSize="lg">
            {powerData.global.rank}
            <Text as="span" color="gray.500">
              {` / ${geographiesCount}`}
            </Text>
          </Text>
        </Stack>
        <Stack spacing={1}>
          <Text
            fontWeight={600}
            textTransform="uppercase"
            fontSize="xs"
            color="gray.500"
          >
            {"Power score"}
          </Text>
          <Text fontWeight={700} fontSize="lg">
            {powerData.global.value.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <Text as="span" color="gray.500">
              {" / 5"}
            </Text>
          </Text>
        </Stack>
      </SimpleGrid>
      <Center>
        <Box w="100%" maxW="16rem">
          {relevantScores && (
            <RadarChart
              data={relevantScores.topics
                .filter((d) => d.id.startsWith("power-"))
                .map((d) => ({ label: d.name, value: d.global.value }))}
            />
          )}
        </Box>
      </Center>
      {electricityPrices ? (
        <LineChart
          data={electricityPrices}
          domainX={electricityPrices.domainX}
          domainY={electricityPrices.domainY}
        />
      ) : (
        <EmptyChart title="Electricity prices" />
      )}
      {capacity ? (
        <AreaChart
          data={capacity}
          domainX={capacity.domainX}
          domainY={capacity.domainY}
        />
      ) : (
        <EmptyChart title="Installed capacity" />
      )}
      {generation ? (
        <AreaChart
          data={generation}
          domainX={generation.domainX}
          domainY={generation.domainY}
        />
      ) : (
        <EmptyChart title="Electricity generation" />
      )}
      {investment ? (
        <LineChart
          data={investment || []}
          domainX={investment?.domainX || []}
          domainY={investment?.domainY || []}
        />
      ) : (
        <EmptyChart title="Investment" />
      )}

      <Stack spacing={2}>
        <Heading as="h2" fontSize="xl">
          {"Utility privatization"}
        </Heading>
        <BooleanChart
          question={utilityPrivatisation.question}
          data={utilityPrivatisation}
          compact
        />
      </Stack>
      <CardTable data={data.policies} sector="power" compact />
    </Stack>
  )
}

function EmptyChart({ title }) {
  return (
    <Stack spacing={5}>
      <Heading fontSize="xl">{title}</Heading>
      <Center aspectRatio={16 / 9} bg="gray.50">
        <Box color="gray.500">{"N/A"}</Box>
      </Center>
    </Stack>
  )
}
