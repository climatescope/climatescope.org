import { useEffect, useState } from "react"
import { Box, Container, SimpleGrid } from "@chakra-ui/layout"
import getConfig from "next/config"
import { scaleSqrt, scaleThreshold } from "d3-scale"
// import * as projies from "d3-geo-projection"
// import { geoMercator, geoEqualEarthRaw } from "d3-geo"
import * as d3Geo from "d3-geo"
const { geoMercator, geoEqualEarth } = d3Geo
import _sortBy from "lodash/sortBy"
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force"
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps"

import { useClientData } from "@utils/api/client"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

const geoUrl = `${basePath}/data/world-sans-antarctica.json`
const dataUrl = `${basePath}/data/areas-by-geography.json`

export default function AreasByGeography() {
  const { data, error } = useClientData(dataUrl)
  const [points, setPoints] = useState([])

  const sizeDomain = [1, 175000000]
  const sizeRange = [3, 180]
  const sizeScale = scaleSqrt().domain(sizeDomain).range(sizeRange)

  const width = 800
  const height = 500

  const features =
    _sortBy(
      data?.map(({ lon, lat, ...properties }) => {
        return {
          type: "Feature",
          geometry: { type: "Point", coordinates: [lon, lat] },
          properties,
        }
      }),
      (o) => -o.properties.area
    ) || []

  const padding = sizeRange[1] / 4


  const proj = geoEqualEarth()
    // .fitSize([width - padding * 2, height - padding * 2], { type: "Sphere" })
    // .translate([width / 2, height / 2])
    // .rotate([-10, 0, 0])
    .fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      {
        type: "FeatureCollection",
        features: [
          // {
          //   type: "Feature",
          //   geometry: { type: "Point", coordinates: [180, 0] },
          // },
          // {
          //   type: "Feature",
          //   geometry: { type: "Point", coordinates: [-180, 0] },
          // },
          ...features,
        ],
      }
    )
    .translate([width / 2, height / 2])
    .rotate([-25, 0, 0])
    .center([0, 15])

  useEffect(() => {
    if (!features?.length) return undefined
    if (points?.length) return undefined

    // 1. Configure simulation
    const simulation = forceSimulation([...features])
      .force(
        "x",
        forceX((d) => Math.round(proj(d.geometry.coordinates)[0]))
      )
      .force(
        "y",
        forceY((d) => Math.round(proj(d.geometry.coordinates)[1]))
      )
      .force(
        "collide",
        forceCollide((d) => Math.round(sizeScale(d.properties.area)) + 0.5)
      )
      .stop()

    // 2. Run simulation
    for (let i = 0; i < 200; i++) simulation.tick()

    // 3. Set new points
    setPoints(simulation.nodes())
  }, [features])

  if (error) return <div>{"No data"}</div>
  if (!data) return <div>{"Loading data..."}</div>

  const fontSizeScale = scaleThreshold()
    .domain([sizeRange[0], sizeRange[0] * 2, sizeRange[0] * 10, sizeRange[1]])
    .range([0, 4, 6, 9])
  const fontWeightScale = scaleThreshold()
    .domain([sizeRange[0], sizeRange[0] * 2, sizeRange[0] * 10, sizeRange[1]])
    .range([0, 700, 600, 500])

  return (
    <Container pb={24}>
      <SimpleGrid bg="gray.50" w="100%" columns={1} gridGap={0}>
        <Box gridColumn="1 / -1" gridRow="1 / span 1">
          <ComposableMap width={width} height={height} projection={proj}>
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
          </ComposableMap>
        </Box>
        <Box gridColumn="1 / -1" gridRow="1 / span 1">
          <svg viewBox={`0 0 ${width} ${height}`}>
            {points.map((point) => {
              const r = sizeScale(point.properties.area)
              return (
                <g
                  key={point.properties.iso}
                  transform={`translate(${point.x} ${point.y})`}
                >
                  <circle r={r} />
                  <text
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="white"
                    fontSize={fontSizeScale(r)}
                    fontWeight={fontWeightScale(r)}
                  >
                    {point.properties.iso.toUpperCase()}
                  </text>
                </g>
              )
            })}
          </svg>
        </Box>
      </SimpleGrid>
    </Container>
  )
}
