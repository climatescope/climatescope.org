import { useState } from "react"
import { motion } from "framer-motion"
import { Grid, Box } from "@chakra-ui/react"

export function getBarGradient(data, defaultSum, bgColor = "#FFF") {
  const sum = defaultSum || data.reduce((acc, cur) => (acc += cur.value), 0)

  const steps = data.reduce((acc, cur, i) => {
    const percentage1 = !i ? i : acc.slice(-1)[0][1]
    const percentage2 = (100 / sum) * cur.value
    acc.push([cur.color, percentage1])
    acc.push([cur.color, percentage1 + percentage2])

    if (i === data.length - 1) {
      acc.push([bgColor, percentage1 + percentage2])
      acc.push([bgColor, 100])
    }

    return acc
  }, [])

  return `linear-gradient(90deg, ${steps
    .flatMap((d) => d.join(" ") + "%")
    .join(", ")})`
}

export default function BarChart({ data, total, bg }) {
  const background = getBarGradient(data, total, bg)
  const [xy, setXY] = useState(null)

  const handleMouseMove = (e) => {
    setXY([e.clientX, e.clientY])
  }

  const handleMouseLeave = (e) => {
    setXY(null)
  }

  return (
    <motion.div
      transition={{ duration: 0.3, bounce: 0, type: "spring" }}
      animate={{ background }}
      style={{
        height: "1.5rem",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {xy && (
        <div
          style={{
            position: "fixed",
            left: xy[0],
            top: xy[1],
            marginLeft: "0.5rem",
            marginTop: "0.5rem",
            background: "#000",
            color: "#FFF",
            padding: "1rem",
            zIndex: 999,
          }}
        >
          {data.map((d, i) => (
            <Grid
              key={i}
              gridTemplateColumns="1fr auto"
              gridColumnGap={3}
              gridRowGap={1}
            >
              <Box>{`${d.label} (${d.weight}%): `}</Box>
              <Box
                textAlign="right"
                fontWeight={600}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {d.value.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Box>
            </Grid>
          ))}
          <Grid
            gridTemplateColumns="1fr auto"
            gridColumnGap={3}
            gridRowGap={1}
            borderTop="0.0625rem solid"
            borderColor="gray.500"
            mt={1}
            pt={1}
          >
            <Box>{`Total: `}</Box>
            <Box
              textAlign="right"
              fontWeight={600}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {data[0].total.toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Box>
          </Grid>
        </div>
      )}
    </motion.div>
  )
}
