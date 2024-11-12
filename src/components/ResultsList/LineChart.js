import { useEffect, useRef } from "react"
import { useTheme } from "@chakra-ui/react"
import { scaleLinear } from "d3-scale"
import _sortBy from "lodash/sortBy"

import { useStore } from "./store"

export default function LineChartWithStateWrapper({
  data,
  marketCount,
  width = 96,
  height = 48,
}) {
  const year = useStore((state) => state.year)
  const region = useStore((state) => state.region)
  const sector = useStore((state) => state.sector)
  return (
    <LineChart
      year={year}
      region={region}
      sector={sector}
      data={data}
      marketCount={marketCount}
      width={width}
      height={height}
    />
  )
}

export function LineChart({
  year,
  region,
  sector,
  data,
  marketCount,
  width = 96,
  height = 48,
}) {
  const { colors } = useTheme()

  const canvasRef = useRef(null)

  const w = width * 2
  const h = height * 2

  const baseColor = colors.gray[800]
  const highlightColor = colors.brand[600]

  const timeSeries = _sortBy(data, (o) => o.year).map((d) => {
    const { year, sectors } = d
    if (sector) {
      const relevantSector = sectors.find((s) => s.id === sector)
      if (!relevantSector) return null
      return { ...relevantSector[region ? "region" : "global"], year }
    } else return { ...d[region ? "region" : "global"], year }
  })

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    if (!canvasRef.current) return undefined

    const circleRadius = 7
    const padding = 7

    const ctx = canvasRef.current.getContext("2d")

    ctx.clearRect(0, 0, w, h)

    const xScale = scaleLinear()
      .domain([2021, 2024])
      .range([padding, w - padding])

    const yScale = scaleLinear()
      .domain([1, marketCount])
      .range([padding, h - padding])

    // Draw line
    ctx.beginPath()
    timeSeries.map((d, i) => {
      if (!i) ctx.moveTo(xScale(d.year), yScale(d.rank))
      else ctx.lineTo(xScale(d.year), yScale(d.rank))
    })
    ctx.strokeStyle = baseColor
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw circles
    timeSeries.map((d, i) => {
      ctx.beginPath()
      drawCircle(ctx, xScale(d.year), yScale(d.rank), circleRadius)
      ctx.fillStyle = year === d.year ? highlightColor : baseColor
      ctx.fill()
      ctx.lineWidth = 3
      ctx.strokeStyle = "#FFF"
      ctx.stroke()
    })
  }, [marketCount, timeSeries, year, baseColor, highlightColor])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "auto" }}
      width={w}
      height={h}
    />
  )
}

function drawCircle(ctx, cx, cy, r) {
  ctx.arc(cx, cy, r, 0, 2 * Math.PI, false)
}
