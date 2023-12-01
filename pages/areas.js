import { useEffect, useState } from "react"
import { Box, Container } from "@chakra-ui/layout"
import getConfig from "next/config"
import { scaleSqrt, scaleThreshold } from "d3-scale"
import _sortBy from "lodash/sortBy"
import _groupBy from "lodash/groupBy"
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force"
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  useMapContext,
} from "react-simple-maps"

import { useClientData } from "@utils/api/client"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

const geoUrl = `${basePath}/data/world-sans-antarctica.json`
const dataUrl = `${basePath}/data/areas-by-geography.json`

function CircleCartogram({
  features,
  domain = [1, 1500000000],
  range = [4, 50],
}) {
  const ctx = useMapContext()
  const [points, setPoints] = useState([])

  const sizeScale = scaleSqrt().domain(domain).range(range)

  const regionOffsets = {
    "Asia-Pacific": [15, -10],
    "Northern America": [0, -5],
    "Africa": [-5, 5],
    "Latin America": [10, 0],
    "Europe": [0, -15],
    "Middle East": [0, 0],
  }

  useEffect(() => {
    if (!features?.length) return undefined
    if (points?.length) return undefined

    // 1. Configure simulation
    const simulation = forceSimulation([...features])
      .force(
        "x",
        forceX((d) => {
          const offset = regionOffsets[d.properties.regionName][0]
          return Math.round(ctx.projection(d.geometry.coordinates)[0]) + offset
        })
      )
      .force(
        "y",
        forceY((d) => {
          const offset = regionOffsets[d.properties.regionName][1]
          return Math.round(ctx.projection(d.geometry.coordinates)[1]) + offset
        })
      )
      .force(
        "collide",
        forceCollide((d) => Math.round(sizeScale(d.properties.value)) + 0.5)
      )
      .stop()

    // 2. Run simulation
    for (let i = 0; i < 200; i++) simulation.tick()

    // 3. Set new points
    setPoints(simulation.nodes())
  }, [features])

  const fontSizeScale = scaleThreshold()
    .domain([range[0], range[0] * 2, range[0] * 10, range[1]])
    .range([0, 4, 6, 9])

  const fontWeightScale = scaleThreshold()
    .domain([range[0], range[0] * 2, range[0] * 10, range[1]])
    .range([0, 700, 600, 500])

  const grouped = Object.entries(
    _groupBy(points, (o) => o.properties.regionName)
  ).map(([region, items]) => {
    return { region, items }
  })

  const regionColors = {
    "Asia-Pacific": "#000",
    "Northern America": "#222",
    "Africa": "#444",
    "Latin America": "#666",
    "Europe": "#888",
    "Middle East": "#AAA",
  }

  return (
    <g>
      {grouped.map((region) => {
        const key = region.region.split(" ").join("_").toLowerCase().trim()
        return (
          <g key={key} className={key}>
            {region.items.map((point) => {
              const r = sizeScale(point.properties.value)
              return (
                <g
                  key={point.properties.iso}
                  transform={`translate(${point.x} ${point.y})`}
                >
                  <circle
                    r={r}
                    onClick={() => console.log(point)}
                    fill={regionColors[region.region]}
                  />
                  <text
                    textAnchor="middle"
                    y={fontSizeScale(r) / 2}
                    fill="white"
                    fontSize={fontSizeScale(r)}
                    fontWeight={fontWeightScale(r)}
                  >
                    {point.properties.iso.toUpperCase()}
                  </text>
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}

export default function AreasByGeography() {
  const { data, error } = useClientData(dataUrl)

  const width = 800
  const height = 500

  const features =
    _sortBy(
      data?.map(({ lon, lat, ...properties }) => {
        return {
          type: "Feature",
          geometry: { type: "Point", coordinates: [lon, lat] },
          properties: {
            ...properties,
            value: properties.popValue,
          },
        }
      }),
      (o) => -o.properties.value
    ) || []

  if (error) return <div>{"No data"}</div>
  if (!data) return <div>{"Loading data..."}</div>

  return (
    <Container pb={24}>
      <Box bg="gray.50" w="100%">
        <ComposableMap
          width={width}
          height={height}
          projection="geoMercator"
          projectionConfig={{ rotate: [-10, 0, 0], center: [25, 10] }}
        >
          <Sphere />
          <Geographies geography={geoUrl}>
            {({ borders, outline }) => {
              return (
                <>
                  <Geography
                    key="outline"
                    geography={outline}
                    fill="none"
                    stroke="#999"
                    strokeWidth={0.5}
                  />
                  <Geography
                    key="borders"
                    geography={borders}
                    fill="none"
                    stroke="#999"
                    strokeWidth={0.5}
                  />
                </>
              )
            }}
          </Geographies>
          <CircleCartogram features={features} />
        </ComposableMap>
      </Box>
    </Container>
  )
}
