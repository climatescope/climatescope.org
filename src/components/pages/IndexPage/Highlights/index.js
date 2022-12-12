import { useEffect, useState } from "react"
import { csvParse } from "d3-dsv"
import { Heading, HStack } from "@chakra-ui/react"
import groupBy from "lodash/groupBy"
import sortBy from "lodash/sortBy"

import { Link } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import { ChevronRight } from "@components/Icon"
import Top10Ranking from "@components/pages/IndexPage/Highlights/Top10Ranking"

const Highlights = ({ miniRankingsPaths }) => {
  const [highlights, setHighlights] = useState([])

  useEffect(() => {
    if (highlights.length) return

    const pathsBySector = groupBy(
      sortBy(miniRankingsPaths, (o) => +o.split("__")[1]),
      (o) => o.split("__")[0]
    )

    const selectedPaths = [
      pathsBySector.transport[0],
      pathsBySector.buildings[0],
    ]

    Promise.all(
      selectedPaths.map(async (d) => {
        const dd = encodeURIComponent(d)
        return await fetch(`/data/mini-rankings/${dd}`).then((res) =>
          res.text()
        )
      })
    ).then((data) => {
      setHighlights(
        data.map((d, i) => {
          const [sector, index, name] = selectedPaths[i].split("__")
          return {
            name: name.split(".csv").join("").split("_").join(" "),
            data: csvParse(d),
            index,
            sector,
          }
        })
      )
    })
  }, miniRankingsPaths)

  console.log("Highlights: ", highlights)

  return (
    <SimpleGrid columns={[1, null, 2]}>
      <HStack
        gridColumn="1 / -1"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Heading variant="sectionTitle">{"Highlights"}</Heading>
        <Link
          href="/highlights"
          variant="section"
          display={["none", null, "flex"]}
        >
          {"All highlights"}
          <ChevronRight size={20} strokeWidth={2} />
        </Link>
      </HStack>
      {highlights.map((d) => {
        return <Top10Ranking key={d.name} data={d} barHeight={8} limit={5} />
      })}
    </SimpleGrid>
  )
}

export default Highlights
