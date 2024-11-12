import { SimpleGrid, Heading, Stack, Text, Box } from "@chakra-ui/react"
import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"
import _sumBy from "lodash/sumBy"
import _maxBy from "lodash/maxBy"
import _minBy from "lodash/minBy"
import { basename } from "path"

import { useMarketContext } from "@/utils/MarketContext"
import CardTable from "@/components/CardTable"
import { Link } from "@/components/Link"
import BooleanChart from "./BooleanChart"
import MultiItemChart from "./MultiItemChart"
import getCapacityContent from "@/utils/content/getCapacityContent"
import LineChart from "@/components/LineChart"
import AreaChart from "@/components/AreaChart"
import RegionalComparisonChart from "@/components/RegionalComparisonChart"
import Image from "@/components/Image"
import { prefixMarket } from "@/utils/marketsWithThe"

function formatScore(score) {
  return score.toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const baseComponents = {
  h1: (props) => (
    <Heading
      as="h1"
      fontSize="2xl"
      gridColumn={["1 / -1", null, null, "2 / -2"]}
      {...props}
    />
  ),
  h2: (props) => (
    <Heading
      as="h2"
      textStyle="sectionHeading"
      gridColumn={["1 / -1", null, null, "2 / -2"]}
      {...props}
    />
  ),
  h3: (props) => (
    <Heading
      as="h3"
      fontSize="2xl"
      gridColumn={["1 / -1", null, null, "2 / -2"]}
      {...props}
    />
  ),
  h4: (props) => (
    <Heading
      as="h4"
      fontSize="2xl"
      gridColumn={["1 / -1", null, null, "2 / -2"]}
      {...props}
    />
  ),
  h5: (props) => (
    <Heading
      as="h5"
      fontSize="2xl"
      gridColumn={["1 / -1", null, null, "2 / -2"]}
      {...props}
    />
  ),
  h6: (props) => (
    <Heading
      as="h6"
      fontSize="2xl"
      gridColumn={["1 / -1", null, null, "2 / -2"]}
      {...props}
    />
  ),
  p: (props) => (
    <Text
      textStyle="articleBody"
      gridColumn={["1 / -1", null, null, "2 / -3"]}
      {...props}
    />
  ),
  ul: (props) => (
    <Stack
      as="ul"
      gridColumn={["1 / -1", null, null, "2 / -3"]}
      spacing={5}
      {...props}
    />
  ),
  li: (props) => (
    <Text
      as="li"
      gridColumn={["1 / -1", null, null, "2 / -3"]}
      textStyle="articleBody"
      ml={5}
      {...props}
    />
  ),
  a: (props) => (
    <Link
      color="brand.600"
      _hover={{ color: "brand.700", textDecoration: "underline" }}
      _focusVisible={{
        color: "brand.600",
        outline: "0.125rem solid currentcolor",
        outlineOffset: "0.125rem",
      }}
      {...props}
    />
  ),
  img: (props) => {
    const src = basename(props.src)
    return <Image src={src} alt={props.alt} />
  },
}

export const marketComponents = {
  GeneratedOverviewText: (props) => {
    const { frontmatter } = useMarketContext()
    return (
      <Text
        gridColumn={["1 / -1", null, null, "2 / -2"]}
        {...props}
      >{`This is a generated overview for ${frontmatter.title}.`}</Text>
    )
  },
  GeneratedPowerText: (props) => {
    const { frontmatter } = useMarketContext()
    return (
      <Text
        gridColumn={["1 / -1", null, null, "2 / -2"]}
        {...props}
      >{`This is generated power text for ${frontmatter.title}.`}</Text>
    )
  },
  GeneratedTransportText: (props) => {
    const { frontmatter } = useMarketContext()
    return (
      <Text
        gridColumn={["1 / -1", null, null, "2 / -2"]}
        {...props}
      >{`This is generated transport text for ${frontmatter.title}.`}</Text>
    )
  },
  MarketHeader: (props) => {
    return (
      <Box gridColumn={["1 / -1", null, null, "2 / -2"]}>{"Market Header"}</Box>
    )
  },
  CustomChart: (props) => {
    const { frontmatter } = useMarketContext()
    return (
      <Box
        bg="brand.50"
        border="0.0625rem solid"
        borderColor="brand.600"
        color="brand.600"
        p={10}
        gridColumn={["1 / -1", null, null, "2 / -2"]}
        fontSize="xl"
        {...props}
      >
        {`Custom chart for ${frontmatter.title}!`}
      </Box>
    )
  },

  GeneratedContentOverview: (props) => {
    const { frontmatter, data } = useMarketContext()
    const { iso, market, tradebloc } = frontmatter

    const latestScores = data.score.find((s) => s.year === 2024)
    const prevScores = data.score.find((s) => s.year === 2023)
    const powerScore = latestScores.sectors.find((s) => s.id === "power")
    const prevPowerScore = prevScores.sectors.find((s) => s.id === "power")
    const scoreChange =
      powerScore.tradebloc.value - prevPowerScore.tradebloc.value
    const rankChange = prevPowerScore.tradebloc.rank - powerScore.tradebloc.rank

    const marketName = prefixMarket(iso, market)

    const paragraph1 = [
      `${
        marketName[0].toUpperCase() + marketName.slice(1)
      } has a power score of ${formatScore(powerScore.global.value)}`,
      `, which puts it at rank ${powerScore.tradebloc.rank} in the ${tradebloc.name} power ranking.`,
      rankChange
        ? ` In comparison to 2023, ${marketName} has ${
            rankChange > 0 ? "improved" : "dropped"
          } in the power rankings by ${Math.abs(rankChange)} place${
            Math.abs(rankChange) === 1 ? "" : "s"
          }, from rank ${prevPowerScore.tradebloc.rank}, to rank ${
            powerScore.tradebloc.rank
          }.`
        : ``,
    ].join("")

    const regionalData = data.regionalPowerScoreData

    if (!regionalData)
      return (
        <Stack gridColumn={["1 / -1", null, null, "2 / span 5"]} spacing={5}>
          <Text textStyle="articleBody">{paragraph1}</Text>
        </Stack>
      )

    const regionalAverageScore =
      Math.round(
        (regionalData.reduce(
          (acc, cur) => acc + (cur.regionalPowerScore || 0),
          0
        ) /
          regionalData.length) *
          100
      ) / 100

    const word =
      powerScore.global.value > regionalAverageScore
        ? "better than"
        : powerScore.global.value === regionalAverageScore
        ? "the same as"
        : "worse than"

    const paragraph2 = [
      `At ${formatScore(
        powerScore.global.value
      )}, the power score of ${marketName} is ${word} than the regional average of ${regionalAverageScore} in the ${
        frontmatter.region.name
      } region and puts it at rank ${powerScore.region.rank} in the region.`,
    ].join("")

    return (
      <Stack gridColumn={["1 / -1", null, null, "2 / span 5"]} spacing={5}>
        <Text textStyle="articleBody">{paragraph1}</Text>
        <Text textStyle="articleBody">{paragraph2}</Text>
      </Stack>
    )
  },
  PowerScoreComparison: (props) => {
    const { frontmatter, data } = useMarketContext()
    const regionalData = data.regionalPowerScoreData
    if (!regionalData) return null

    const preparedData = {
      score: {
        average:
          regionalData.reduce(
            (acc, cur) => acc + (cur.regionalPowerScore || 0),
            0
          ) / regionalData.length,
      },
      items: regionalData.map((d) => ({
        iso: d.iso,
        name: d.market,
        score: d.regionalPowerScore,
      })),
    }

    return (
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <RegionalComparisonChart
          title="Regional comparison chart"
          data={preparedData}
          market={frontmatter}
        />
      </Box>
    )
  },
  GeneratedContentPowerPolicy: (props) => {
    const { frontmatter, data } = useMarketContext()
    const { iso, market } = frontmatter

    const policiesGroupedByAnswer = _groupBy(data.policies, (o) => o.answer)
    const totalCount = data.policies.length
    // const totalCount = 9

    const policiesList =
      policiesGroupedByAnswer["Available"]?.map((d) => d.policy) || []

    const policiesListJoined = policiesList.length
      ? `, including ${policiesList.slice(0, -1).join(", ")}, and ${
          policiesList.slice(-1)[0]
        }`
      : ""

    const marketName = prefixMarket(iso, market)

    return (
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <Text textStyle="articleBody">{`${
          marketName[0].toUpperCase() + marketName.slice(1)
        } implements policies in ${
          policiesGroupedByAnswer["Available"]?.length || 0
        }/${totalCount} power policy categories tracked by Climatescope${policiesListJoined}.`}</Text>
      </Box>
    )
  },
  PowerPolicies: (props) => {
    const { data } = useMarketContext()
    return (
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <CardTable data={data.policies} sector="power" />
      </Box>
    )
  },
  GeneratedContentPowerPricesAndCosts: (props) => {
    const { frontmatter, data } = useMarketContext()
    const { iso, market } = frontmatter

    const prices = data.electricityPrices

    if (!prices.length) return null

    const averagePrice = prices.find(
      (s) => s.subindicator === "Average Electricity Price in USD"
    )

    const lastPrice = averagePrice.data.slice(-1)[0]
    const prevPrice = averagePrice.data.slice(-2, -1)[0]
    const yearRange = [averagePrice.data[0].x_val, lastPrice.x_val]

    const priceRange = _sortBy(averagePrice.data, (o) => o.y_val)
    const minPrice = priceRange[0]
    const maxPrice = priceRange.slice(-1)[0]

    const marketName = prefixMarket(iso, market)

    const change = lastPrice.y_val - prevPrice.y_val
    const changeText = change
      ? change > 0
        ? `has increased from ${formatNumber(prevPrice.y_val)} ${
            averagePrice.units
          } in ${prevPrice.x_val} to ${formatNumber(lastPrice.y_val)} ${
            averagePrice.units
          } in ${lastPrice.x_val}`
        : `has dropped from ${formatNumber(prevPrice.y_val)} ${
            averagePrice.units
          } in ${prevPrice.x_val} to ${formatNumber(lastPrice.y_val)} ${
            averagePrice.units
          } in ${lastPrice.x_val}`
      : `has remained the same since ${prevPrice.x_val}`

    return (
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <Text textStyle="articleBody">
          {`The average electricity price in ${marketName} ${changeText}. Since ${
            yearRange[0]
          }, the average electricity price in ${marketName} has fluctuated between ${formatNumber(
            minPrice.y_val
          )} ${averagePrice.units} (${minPrice.x_val}) and ${formatNumber(
            maxPrice.y_val
          )} ${averagePrice.units} (${maxPrice.x_val}).`}
        </Text>
      </Box>
    )
  },
  ElectricityPricesChart: (props) => {
    const { frontmatter, data } = useMarketContext()
    const { market } = frontmatter
    const prices = data.electricityPrices

    if (!prices?.length) return null

    const preparedData = {
      indicator: `Electricity prices for ${market}`,
      subindicators: prices.map((d) => {
        return {
          ...d,
          data: d.data.map((dd) => ({ year: dd.x_val, value: dd.y_val })),
        }
      }),
    }

    return (
      <Box
        gridColumn={["1 / -1", null, null, "2 / span 5"]}
        aspectRatio={16 / 9}
      >
        <LineChart data={preparedData} />
      </Box>
    )
  },
  GeneratedContentCapacity: (props) => {
    const { frontmatter, data } = useMarketContext()
    const capacityData = data.capGen.filter(
      (d) => d.measure === "installed capacity"
    )
    const c = getCapacityContent({
      data: { data: capacityData },
      objective: { default: prefixMarket(frontmatter.iso, frontmatter.market) },
    })

    return (
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        {c.text.map((t, i) => (
          <Text key={i} textStyle="articleBody">
            {t}
          </Text>
        ))}
      </Box>
    )
  },
  CapGenCharts: (props) => {
    const { data } = useMarketContext()
    const { capGen } = data

    if (!capGen?.length) return null

    const capacityData = capGen
      .filter((d) => d.measure === "installed capacity")
      .map((d) => ({
        subindicator: d.subsector,
        units: d.units,
        data: d.data.map((dd) => ({ year: dd.x_val, value: dd.y_val })),
      }))

    const generationData = capGen
      .filter((d) => d.measure === "electricity generation")
      .map((d) => ({
        subindicator: d.subsector,
        units: d.units,
        data: d.data.map((dd) => ({ year: dd.x_val, value: dd.y_val })),
      }))

    return (
      <SimpleGrid gridColumn="1 / -1" columns={2} gridGap={10}>
        <Box>
          <AreaChart
            data={{
              indicator: "Installed capacity",
              subindicators: capacityData,
            }}
          />
        </Box>
        <Box>
          <AreaChart
            data={{
              indicator: "Electricity generation",
              subindicators: generationData,
            }}
          />
        </Box>
      </SimpleGrid>
    )
  },

  GeneratedContentElectricityGeneration: (props) => {
    const { frontmatter, data } = useMarketContext()
    const capacityData = data.capGen.filter(
      (d) => d.measure === "electricity generation"
    )
    const c = getCapacityContent({
      data: { data: capacityData },
      objective: { default: prefixMarket(frontmatter.iso, frontmatter.market) },
      measure: "electricity generated",
    })

    return (
      <Box gridColumn={["1 / -1", null, null, "2 /span 5"]}>
        {c.text.map((t, i) => (
          <Text key={i} textStyle="articleBody">
            {t}
          </Text>
        ))}
      </Box>
    )
  },

  InvestmentChart: (props) => {
    const { data, frontmatter } = useMarketContext()
    const { market } = frontmatter

    if (!data.investment) return null

    const preparedData = {
      indicator: `Investment for ${market}`,
      subindicators: [
        {
          subindicator: data.investment.deal_type,
          units: data.investment.unit,
          data: data.investment.data.map((d) => ({
            year: d.x_val,
            value: d.y_val,
          })),
        },
      ],
    }

    return (
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <LineChart data={preparedData} />
      </Box>
    )
  },
  GeneratedContentInvestment: (props) => {
    const { frontmatter, data } = useMarketContext()
    const { iso, market } = frontmatter

    if (!data.investment) return null

    const investmentData = data.investment.data
    const latestData = investmentData.slice(-1)[0]
    const prevData = investmentData.slice(-2, -1)[0]

    const change = latestData.y_val - prevData.y_val
    const changeText = change > 0 ? `an increase` : "a decrease"

    const changePercentage =
      Math.round((100 / prevData.y_val) * Math.abs(change) * 100) / 100

    const yearRange = [
      investmentData[0].x_val,
      investmentData.slice(-1)[0].x_val,
    ]

    const investmentWithValues = investmentData.filter((d) => d.y_val)

    if (investmentWithValues?.length < 2) return null

    const maxInvestment = _maxBy(investmentWithValues, (o) => o.y_val)
    const minInvestment = _minBy(investmentWithValues, (o) => o.y_val)

    const marketName = prefixMarket(iso, market)

    const content = [
      `Investment in clean energy in ${marketName} was around $${latestData.y_val.toLocaleString(
        "en-us",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )} million in ${latestData.x_val}, `,
      `${changeText} of ${changePercentage}% from ${
        prevData.x_val
      } ($${prevData.y_val.toLocaleString("en-us", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} million). `,
      `Between ${yearRange[0]} and ${
        yearRange[1]
      }, the highest investment in clean energy was in ${
        maxInvestment.x_val
      } at $${maxInvestment.y_val.toLocaleString("en-us", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} million, `,
      `while the lowest was in ${
        minInvestment.x_val
      } with $${minInvestment.y_val.toLocaleString("en-us", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} million.`,
    ].join("")

    return (
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <Text textStyle="articleBody">{content}</Text>
      </Box>
    )
  },
  UtilityPrivatisationChart: (props) => {
    const { data } = useMarketContext()
    const indicator = data.indicators.find(
      (d) => d.indicator === "Utility privatisation"
    )
    return (
      <Box gridColumn={["1 / -1", null, null, "2 / span 5"]}>
        <BooleanChart question={indicator.question} data={indicator} />
      </Box>
    )
  },
  DoingBusinessAndBarriersChart: (props) => {
    const { data } = useMarketContext()
    const indicators = data.indicators.filter(
      (d) => d.sector === "power" && d.section === "Doing business and barriers"
    )
    return (
      <Stack gridColumn={["1 / -1", null, null, "2 / span 5"]} spacing={5}>
        {indicators.map(({ indicator, question, a1 }) => {
          return (
            <MultiItemChart
              key={indicator}
              title={indicator}
              question={question}
              a1={a1 === "yes"}
            />
          )
        })}
      </Stack>
    )
  },
}

export default {
  ...baseComponents,
  ...marketComponents,
}

function formatNumber(n) {
  return n.toLocaleString("en-ud", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
