import { useMemo } from "react"
import { Container, HStack, Stack, Grid, Text, Select } from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"
import _uniqBy from "lodash/uniqBy"
import { useIsClient } from "usehooks-ts"

import { Link } from "@/components/Link"
import BarChart from "./BarChart"
import RadarChart from "./RadarChart"
import LineChart from "./LineChart"
import { useStore } from "./store"

function formatScore(score) {
  return parseFloat(score).toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function ResultsList({ results }) {
  const year = useStore((state) => state.year)
  const region = useStore((state) => state.region)
  const sector = useStore((state) => state.sector)
  const setYear = useStore((state) => state.setYear)
  const setRegion = useStore((state) => state.setRegion)
  // const setSector = useStore((state) => state.setSector)

  const regions = _uniqBy(
    results.map((d) => d.region),
    (o) => o.id
  )

  const markets = useMemo(() => {
    const filteredByYear = results
      .map((d) => ({
        ...d,
        score: d.score.find((s) => s.year === year),
        timeSeries: d.score,
      }))
      .filter((d) => d.score)

    const filteredByRegion = region
      ? filteredByYear.filter((d) => d.region.id === region)
      : filteredByYear

    const filteredBySector = sector
      ? filteredByRegion.filter((d) =>
          d.score.sectors.find((s) => s.id === sector)
        )
      : filteredByRegion

    return _sortBy(filteredBySector, (o) => {
      const score = sector
        ? o.score.sectors.find((s) => s.id === sector)
        : o.score
      return score.global.rank
    })
  }, [year, region, sector])

  return (
    <Container>
      <HStack
        spacing={3}
        justifyContent="flex-start"
        mb={10}
        borderBottom="0.0625rem solid"
        borderColor="gray.200"
        pb={3}
      >
        <Text flex={1} fontSize="lg" color="gray.500" fontWeight={600}>
          {"Filters"}
        </Text>
        <Select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          w="auto"
          flex="none"
          variant="filled"
          borderRadius="sm"
          size="lg"
          focusBorderColor="brand.500"
          fontWeight={600}
        >
          <option value={2024}>{"2024"}</option>
          <option value={2023}>{"2023"}</option>
          <option value={2022}>{"2022"}</option>
          <option value={2021}>{"2021"}</option>
        </Select>
        <Select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          w="auto"
          flex="none"
          variant="filled"
          borderRadius="sm"
          size="lg"
          focusBorderColor="brand.500"
          fontWeight={600}
        >
          <option value="">{"All regions"}</option>
          {regions.map((region) => {
            return (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            )
          })}
        </Select>
        {/* <Select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          w="auto"
          flex={1}
          variant="filled"
          borderRadius="sm"
          size="lg"
          focusBorderColor="brand.500"
          fontWeight={600}
        >
          {year < 2023 ? <option value="">{"All sectors"}</option> : null}
          <option value="power">{"Power"}</option>
          {year < 2023 ? (
            <option value="transport">{"Transport"}</option>
          ) : null}
          {year < 2023 ? (
            <option value="buildings">{"Buildings"}</option>
          ) : null}
        </Select> */}
      </HStack>
      <Stack spacing={1} pb={20}>
        <Grid
          gridTemplateColumns={[
            "3rem 1.5fr 5rem 3rem",
            null,
            "3rem 1.5fr 5rem 2fr 3rem",
            "3rem 1.5fr 5rem 6rem 2fr 3rem",
            "3rem 1.5fr 1fr 5rem 6rem 2fr 3rem",
          ]}
          gridColumnGap={6}
          alignItems="center"
          py={3}
          borderBottom="0.0625rem solid"
          borderColor="gray.100"
          sx={{
            svg: { width: "100%", height: "auto" },
            "> *:nth-of-type(3)": {
              display: ["none", null, null, null, "block"],
            },
            "> *:nth-of-type(5)": { display: ["none", null, null, "block"] },
            "> *:nth-of-type(6)": { display: ["none", null, "block"] },
          }}
        >
          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontWeight={600}
            color="gray.500"
            textTransform="uppercase"
            fontSize="xs"
            letterSpacing="wider"
          >
            {"Rank"}
          </Text>
          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontWeight={600}
            color="gray.500"
            textTransform="uppercase"
            fontSize="xs"
            letterSpacing="wider"
          >
            {"Market"}
          </Text>
          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontWeight={600}
            color="gray.500"
            textTransform="uppercase"
            fontSize="xs"
            letterSpacing="wider"
          >
            {"Region"}
          </Text>
          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontWeight={600}
            color="gray.500"
            textTransform="uppercase"
            fontSize="xs"
            letterSpacing="wider"
          >
            {"Score"}
          </Text>
        </Grid>
        {markets.map((market) => {
          return (
            <ListItem
              key={market.iso}
              market={market}
              sector={sector}
              region={region}
              marketCount={markets.length}
            />
          )
        })}
      </Stack>
    </Container>
  )
}

function ListItem({ market, sector, region, marketCount }) {
  const isClient = useIsClient()

  const href = market.slug

  const barColors = {
    Fundamentals: "#f8ba01",
    Opportunities: "#06a0b1",
    Experience: "#9191ee",
  }

  const bars = market.score.topics
    .filter((d) => d.id.startsWith(sector || "all-sectors"))
    .map((d) => {
      return {
        id: d.id,
        label: d.name,
        value: d.global.value * (d.weight / 100),
        total: market.score.global.value,
        color: barColors[d.name],
        weight: d.weight,
      }
    })

  const radarData = market.score.topics
    .filter((d) => d.id.startsWith(sector || "all-sectors"))
    .map((d) => {
      return {
        id: d.id,
        label: d.name,
        value: d.global.value,
      }
    })

  return (
    <Grid
      key={market.iso}
      gridTemplateColumns={[
        "3rem 1.5fr 5rem 3rem",
        null,
        "3rem 1.5fr 5rem 2fr 3rem",
        "3rem 1.5fr 5rem 6rem 2fr 3rem",
        "3rem 1.5fr 1fr 5rem 6rem 2fr 3rem",
      ]}
      gridColumnGap={6}
      alignItems="center"
      py={3}
      borderBottom="0.0625rem solid"
      borderColor="gray.100"
      sx={{
        svg: { width: "100%", height: "auto" },
        "> *:nth-child(3)": { display: ["none", null, null, null, "block"] },
        "> *:nth-child(5)": { display: ["none", null, null, "block"] },
        "> *:nth-child(6)": { display: ["none", null, "block"] },
      }}
    >
      <Text
        fontWeight={700}
        h={12}
        bg="gray.100"
        textAlign="center"
        lineHeight="3rem"
        borderRadius="full"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {sector
          ? market.score.sectors.find((s) => s.id === sector)[
              region ? "region" : "global"
            ].rank
          : market.score[region ? "region" : "global"].rank}
      </Text>
      <Text
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        fontWeight={700}
      >
        <Link href={href}>{market.market}</Link>
      </Text>
      <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {market.region.name}
      </Text>
      <Text
        fontWeight={700}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >{`${formatScore(
        sector
          ? market.score.sectors.find((s) => s.id === sector).global.value
          : market.score.global.value
      )} / 5`}</Text>
      <LineChart data={market.timeSeries} marketCount={marketCount} />
      <BarChart total={5} bg="var(--chakra-colors-gray-100)" data={bars} />
      {isClient && <RadarChart data={radarData} simplified />}
    </Grid>
  )
}
