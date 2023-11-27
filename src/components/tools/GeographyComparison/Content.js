import { Box, Stack, Heading, Text, Center } from "@chakra-ui/react"
import groupBy from "lodash/groupBy"

import useGeographyComparisonStore from "@utils/store/geographyComparisonStore"
import SimpleGrid from "@components/SimpleGrid"
import RadarChart from "@components/RadarChart"
import AreaChart from "@components/pages/MarketPage/AreaChart"
import LineChart from "@components/pages/MarketPage/LineChart"
import CardTable from "@components/pages/MarketPage/CardTable"
import { formatRank, formatScore } from "@utils/numberFormat"
import ProfileDivider from "./ProfileDivider"
import ContentPlaceholder from "./ContentPlaceholder"

const Content = ({ market, allMarkets, slot = "reference" }) => {
  const domains = useGeographyComparisonStore((state) => state.domains)

  if (!market || !market.name) return <ContentPlaceholder slot={slot} />

  const marketIndicators = market.indicators || []

  const dataIndicators =
    groupBy(
      marketIndicators.filter(
        (d) => d.indicator && (d.subindicators || d.data)
      ),
      (o) => o.indicator.toLowerCase().split(" ").join("_")
    ) || {}

  const {
    electricity_prices,
    // electricity_generation,
    cumulative_generation,
    installed_capacity,
    investment_clean_energy,
  } = dataIndicators

  const electricity_generation = cumulative_generation

  const investmentData = investment_clean_energy
    ? {
        indicator: "Investment",
        subindicators: investment_clean_energy.map((d) => ({
          subindicator: d.indicator,
          units: "M USD",
          data: d.data,
        })),
      }
    : null

  const formattedScores = {
    // global: formatScore(market.score.data[0].value),
    power: formatScore(market.sectors[0].data[0].value),
    // transport: formatScore(market.sectors[1].data[0].value),
    // buildings: formatScore(market.sectors[2].data[0].value),

    global: "1.00",
    transport: "1.00",
    buildings: "1.00",
  }

  return (
    <>
      <ProfileDivider slot={slot} />

      <SimpleGrid columns={2} px={5}>
        <Stack spacing={1}>
          <Heading
            textTransform="uppercase"
            fontSize="xs"
            color="gray.500"
            isTruncated
          >
            {/* {"Global rank"} */}
            {"Power rank"}
          </Heading>
          <Text fontSize="xl" fontWeight={700} lineHeight="shorter">
            {/* {formatRank(market.score.data[0].rank)} */}
            {formatRank(market.sectors[0].data[0].rank)}
            <Text color="gray.500" as="span" lineHeight="inherit">
              {`/${allMarkets.length}`}
            </Text>
          </Text>
        </Stack>
        <Stack spacing={1}>
          <Heading
            textTransform="uppercase"
            fontSize="xs"
            color="gray.500"
            isTruncated
          >
            {/* {"Global score"} */}
            {"Power score"}
          </Heading>
          <Text fontSize="xl" fontWeight={700} lineHeight="shorter">
            {/* {formattedScores.global} */}
            {formattedScores.power}
            <Text color="gray.500" as="span" lineHeight="inherit">
              {`/5`}
            </Text>
          </Text>
        </Stack>
      </SimpleGrid>

      <ProfileDivider slot={slot} />

      {/* <Stack px={5} spacing={10}>
        <Text fontSize="4xl" fontWeight={700}>
          {formattedScores.global}
          <Text as="span" fontSize="md" ml={1} color="gray.500">
            {`/ 5`}
          </Text>
          <Text
            as="span"
            fontSize="sm"
            lineHeight="shorter"
            color="gray.500"
            fontWeight={600}
            maxW="8rem"
            display="block"
          >
            {"Global score across all sectors"}
          </Text>
        </Text>
        <Center color="brand.500">
          <RadarChart
            sector="all sectors"
            market={market}
            padding={40}
            maxWidth="14rem"
          />
        </Center>
      </Stack> */}

      <Stack px={5} spacing={10} alignItems="center">
        <Text fontSize="2xl" fontWeight={600} textAlign="center">
          {"Power"}
        </Text>
        <RadarChart
          sector="power"
          market={market}
          padding={40}
          maxWidth="14rem"
        />
        <Text
          fontSize="md"
          lineHeight="shorter"
          fontWeight={600}
          color="gray.500"
          textAlign="center"
        >
          {formattedScores.power && `${formattedScores.power}/5`}
        </Text>
      </Stack>

      <ProfileDivider slot={slot} />

      {/* <Stack px={5} spacing={10} alignItems="center">
        <Text fontSize="2xl" fontWeight={600} textAlign="center">
          {"Transport"}
        </Text>
        <RadarChart
          sector="transport"
          market={market}
          padding={40}
          maxWidth="14rem"
        />
        <Text
          fontSize="xs"
          lineHeight="shorter"
          fontWeight={600}
          color="gray.500"
          textAlign="center"
        >
          {formattedScores.transport && `${formattedScores.transport}/5`}
        </Text>
      </Stack> */}

      {/* <ProfileDivider slot={slot} /> */}

      {/* <Stack px={5} spacing={10} alignItems="center">
        <Text fontSize="2xl" fontWeight={600} textAlign="center">
          {"Buildings"}
        </Text>
        <RadarChart
          sector="buildings"
          market={market}
          padding={40}
          maxWidth="14rem"
        />
        <Text
          fontSize="xs"
          lineHeight="shorter"
          fontWeight={600}
          color="gray.500"
          textAlign="center"
        >
          {formattedScores.buildings && `${formattedScores.buildings}/5`}
        </Text>
      </Stack> */}

      {/* <SimpleGrid columns={[4, 3]}>
        <Box gridColumn={["span 2", "span 1"]}>
          <Text fontSize="sm" fontWeight={600} textAlign="center">
            {"Power"}
          </Text>
          <RadarChart
            sector="power"
            market={market}
            padding={40}
            maxWidth="14rem"
          />
          <Text
            fontSize="xs"
            lineHeight="shorter"
            fontWeight={600}
            color="gray.500"
            textAlign="center"
          >
            {formattedScores.power && `${formattedScores.power}/5`}
          </Text>
        </Box>
        <Box gridColumn={["span 2", "span 1"]}>
          <Text fontSize="sm" fontWeight={600} textAlign="center">
            {"Transport"}
          </Text>
          <RadarChart
            sector="transport"
            market={market}
            padding={40}
            maxWidth="14rem"
          />
          <Text
            fontSize="xs"
            lineHeight="shorter"
            fontWeight={600}
            color="gray.500"
            textAlign="center"
          >
            {formattedScores.transport && `${formattedScores.transport}/5`}
          </Text>
        </Box>
        <Box
          gridColumn={["2 / span 2", "span 1"]}
          style={{ opacity: market.sectors[2].data[0].value ? 1 : 0.5 }}
        >
          <Text fontSize="sm" fontWeight={600} textAlign="center">
            {"Buildings"}
          </Text>
          <RadarChart
            sector="buildings"
            market={market}
            padding={40}
            maxWidth="14rem"
          />
          <Text
            fontSize="xs"
            lineHeight="shorter"
            fontWeight={600}
            color="gray.500"
            textAlign="center"
          >
            {formattedScores.buildings && `${formattedScores.buildings}/5`}
          </Text>
        </Box>
      </SimpleGrid> */}

      {/* <ProfileDivider slot={slot} /> */}

      <Box>
        <CardTable data={market.policies} sector="Power" compact />
      </Box>

      <ProfileDivider slot={slot} />

      <Box>
        {electricity_prices && electricity_prices[0] ? (
          <LineChart
            data={electricity_prices ? electricity_prices[0] || null : null}
            domainX={domains[0].x}
            domainY={domains[0].y}
          />
        ) : (
          <ChartPlaceholder title="Electricity Prices" />
        )}
      </Box>

      <ProfileDivider slot={slot} />

      <Box>
        {installed_capacity && installed_capacity[0] ? (
          <AreaChart
            data={installed_capacity ? installed_capacity[0] || null : null}
            domainX={domains[1].x}
            domainY={domains[1].y}
          />
        ) : (
          <ChartPlaceholder title="Installed Capacity" />
        )}
      </Box>

      <ProfileDivider slot={slot} />

      <Box>
        {electricity_generation && electricity_generation[0] ? (
          <AreaChart
            data={
              electricity_generation ? electricity_generation[0] || null : null
            }
            domainX={domains[2].x}
            domainY={domains[2].y}
          />
        ) : (
          <ChartPlaceholder title="Electricity Generation" />
        )}
      </Box>

      <ProfileDivider slot={slot} />

      <Box>
        {investmentData ? (
          <LineChart
            data={investmentData}
            domainX={domains[3].x}
            domainY={domains[3].y}
          />
        ) : (
          <ChartPlaceholder title="Investment" />
        )}
      </Box>

      <ProfileDivider slot={slot} />

      <Box>
        <CardTable data={market.policies} sector="Transport" compact />
      </Box>

      {/* <ProfileDivider slot={slot} />

      <Box>
        <CardTable data={market.policies} sector="Buildings" compact />
      </Box> */}
    </>
  )
}

export default Content

function ChartPlaceholder({ title = "Chart placeholder" }) {
  return (
    <Stack spacing={5}>
      <Heading fontSize="xl" color="gray.200">
        {title}
      </Heading>
      <svg viewBox="0 0 16 9"></svg>
    </Stack>
  )
}
