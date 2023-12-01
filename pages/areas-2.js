import { useRef, useEffect, useState } from "react"
import { Box, Container, SimpleGrid } from "@chakra-ui/layout"

import BubbleMap from "@components/BubbleMap"

export default function BubblMapPage() {
  const svgRef = useRef(null)
  const [regions, setRegions] = useState([])

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    const $regions = Object.entries(
      svgRef.current.querySelectorAll(".region")
    ).map((region) => {
      const marketIds = region[1].querySelectorAll("text")
      const markets = Object.entries(region[1].querySelectorAll("path")).map(
        ([id, market]) => {
          const { x, y, width, height } = market.getBBox()
          return {
            id: marketIds[id].getAttribute("id"),
            x: x + width / 2,
            y: y + height / 2,
            r: width / 2,
          }
        }
      )
      return {
        id: region[1].getAttribute("id"),
        markets,
      }
    })

    setRegions($regions)
  }, [])

  return (
    <Box py={20}>
      <Container>
        <SimpleGrid columns={1} w="100%">
          <Box gridColumn="1 / -1" gridRow="1 / span 1">
            <BubbleMap ref={svgRef} />
          </Box>
          <Box gridColumn="1 / -1" gridRow="1 / span 1">
            <svg viewBox="0 0 630 330">
              {regions.map((region) => {
                return (
                  <g key={region.id}>
                    {region.markets.map(({ id, x, y, r }) => {
                      const showId = r > 8
                      return (
                        <g key={id} transform={`translate(${x} ${y})`}>
                          <circle r={r} />
                          {showId && (
                            <text
                              textAnchor="middle"
                              alignmentBaseline="central"
                              fontSize={6}
                              fontWeight={600}
                              fill="#FFF"
                            >
                              {id}
                            </text>
                          )}
                        </g>
                      )
                    })}
                  </g>
                )
              })}
            </svg>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
