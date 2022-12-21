import { useState, useEffect } from "react"
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react"
import { csv } from "d3-fetch"
import groupBy from "lodash/groupBy"

import SimpleGrid from "@components/SimpleGrid"
import Top10Ranking from "@components/pages/IndexPage/Highlights/Top10Ranking"

function MiniChart({ src }) {
  const [data, setData] = useState()

  useEffect(() => {
    if (typeof window === "undefined") return
    const [sector, index, fullName] = src.split("__")
    const src2 = encodeURIComponent(src)
    csv(`/data/mini-rankings/${src2}`).then((d) => {
      const name = index + " " + fullName.split(".csv")[0].split("_").join(" ")
      setData({
        name: name,
        data: d,
        sector,
        index,
      })
    })
  }, [])

  return (
    <Box>
      <Top10Ranking
        data={data}
        barHeight={8}
        headingFontSize={["xl", null, null, "2xl"]}
        chartFontSize="md"
      />
    </Box>
  )
}

const HighlightsPage = ({ miniRankingsPaths }) => {
  const grouped = groupBy(miniRankingsPaths, (o) => o.split("__")[0])

  return (
    <Container>
      <SimpleGrid
        columns={[1, null, 2]}
        pt={10}
        pb={40}
        gridRowGap={[10, null, 20]}
        gridColumnGap={20}
      >
        <Box gridColumn="1 / -1" maxW="50rem">
          <Stack spacing={5}>
            <Heading as="h1" variant="pageTitle">
              {"Highlights"}
            </Heading>
            <Text variant="subtitle">
              {
                "Climatescope is BNEF's annual assessment of energy transition opportunities, covering the power, transport and buildings sectors across 136 countries. The project's 11th edition adds a new element by highlighting the top 10 markets for investment, capacity additions and policies."
              }
            </Text>
          </Stack>
        </Box>

        <Stack spacing={[4, null, 6]} gridColumn="1 / -1">
          <Heading as="h2" variant="sectionTitle">
            {"Buildings"}
          </Heading>
          <SimpleGrid
            columns={[1, null, 2]}
            gridRowGap={[10, null, 20]}
            gridColumnGap={20}
          >
            {grouped.buildings.map((n) => {
              return <MiniChart key={n} src={n} />
            })}
          </SimpleGrid>
        </Stack>

        <Stack spacing={[4, null, 6]} gridColumn="1 / -1">
          <Heading as="h2" variant="sectionTitle">
            {"Transport"}
          </Heading>
          <SimpleGrid
            columns={[1, null, 2]}
            gridRowGap={[10, null, 20]}
            gridColumnGap={20}
          >
            {grouped.transport.map((n) => {
              return <MiniChart key={n} src={n} />
            })}
          </SimpleGrid>
        </Stack>

        <Stack spacing={[4, null, 6]} gridColumn="1 / -1">
          <Heading as="h2" variant="sectionTitle">
            {"Power"}
          </Heading>
          <SimpleGrid
            columns={[1, null, 2]}
            gridRowGap={[10, null, 20]}
            gridColumnGap={20}
          >
            {grouped.power.map((n) => {
              return <MiniChart key={n} src={n} />
            })}
          </SimpleGrid>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}

export default HighlightsPage
