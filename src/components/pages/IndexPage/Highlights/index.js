import { useEffect, useState } from "react"
import { csvParse } from "d3-dsv"
import { Heading, HStack } from "@chakra-ui/react"

import { Link } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import { ChevronRight } from "@components/Icon"
import Top10Ranking from "@components/pages/IndexPage/Highlights/Top10Ranking"

const Highlights = ({ miniRankingsPaths }) => {
  const [highlights, setHighlights] = useState([])

  useEffect(() => {
    if (highlights.length) return
    Promise.all(
      miniRankingsPaths.slice(1, 3).map((d) => {
        return fetch(`/data/mini-rankings/${d}`).then((res) => res.text())
      })
    ).then((data) => {
      setHighlights(
        data.map((d, i) => ({
          name: miniRankingsPaths[i]
            .split(".csv")
            .join("")
            .split("_")
            .join(" "),
          data: csvParse(d),
        }))
      )
    })
  }, miniRankingsPaths)

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
