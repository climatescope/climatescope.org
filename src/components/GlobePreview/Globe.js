import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTheme, Tooltip } from "@chakra-ui/react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps"
import { motion, useSpring, useMotionTemplate } from "framer-motion"

import BackgroundSphere from "./BackgroundSphere"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json"

const Globe = ({ insights, currentInsight, setCurrentInsight }) => {
  const { colors } = useTheme()
  const { coordinates } = insights[currentInsight]
  const [xyState, setXYState] = useState([-coordinates[0], -coordinates[1]])

  const x = useSpring(coordinates[0], { stiffness: 500, damping: 55, mass: 2 })
  const y = useSpring(coordinates[1], { stiffness: 500, damping: 55, mass: 2 })
  const xy = useMotionTemplate`${x},${y}`

  useEffect(() => {
    xy.on("change", (v) => {
      const [lng, lat] = v.split(",")
      setXYState([-lng, -lat])
    })
  }, [])

  useEffect(() => {
    x.set(coordinates[0])
    y.set(coordinates[1])
  }, [coordinates])

  const router = useRouter()

  return (
    <ComposableMap
      projection="geoOrthographic"
      projectionConfig={{
        scale: 280,
        rotate: [xyState[0], xyState[1], 0],
        clipAngle: 90,
      }}
      width={600}
      height={600}
    >
      <BackgroundSphere />

      <Graticule stroke={colors.brand[800]} strokeOpacity={0.5} />

      <Geographies geography={geoUrl}>
        {({ geographies }) => {
          return (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colors.brand[700]}
                  stroke={colors.brand[900]}
                  strokeWidth={4}
                  paintOrder="stroke fill"
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))}
            </>
          )
        }}
      </Geographies>

      {insights.map((d) => {
        const xDist = Math.abs(d.coordinates[0] - coordinates[0])
        const yDist = Math.abs(d.coordinates[1] - coordinates[1])
        const tooFar = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)) > 90
        return (
          <Marker key={d.key} coordinates={d.coordinates}>
            {currentInsight === d.key - 1 ? (
              <motion.circle
                fill={colors.amber[500]}
                r={12}
                initial={{ r: 12, opacity: 1 }}
                animate={{ r: 30, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            ) : null}
            <Tooltip label={d.title} bg="brand.800">
              <motion.circle
                r={currentInsight === d.key - 1 ? 12 : 10}
                fill={colors.amber[500]}
                stroke={colors.brand[900]}
                strokeWidth={2}
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: tooFar ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  setCurrentInsight(d.key - 1)
                  router.push(d.href)
                }}
              />
            </Tooltip>
          </Marker>
        )
      })}
    </ComposableMap>
  )
}

export default Globe
