import { useMemo } from "react"
import { Center } from "@chakra-ui/react"
import { useTheme } from "@chakra-ui/system"
import { useElementSize } from "usehooks-ts"
import { scaleLinear } from "d3-scale"
import { motion, AnimatePresence } from "framer-motion"

import useHighlightsStore from "@utils/store/highlightsStore"
import XAxis from "./XAxis"
import YAxis from "./YAxis"
import animationConfig from "./animationConfig"

export default function Visual() {
  const data = useHighlightsStore((state) => state.data)

  const padding = useHighlightsStore((state) => state.padding)
  const domains = useHighlightsStore((state) => state.domains)

  const yScaleZoomFactor = useHighlightsStore((state) => state.yScaleZoomFactor)

  const [squareRef, dimensions] = useElementSize()

  const width = dimensions.width || 800
  const height = dimensions.height || 450

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain(domains.x)
      .range([padding.left, width - padding.right])
  }, [width, domains, padding])

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([domains.y[0], domains.y[1] / yScaleZoomFactor])
      .range([height - padding.bottom, padding.top])
  }, [height, domains, padding, yScaleZoomFactor])

  const xTicks = useMemo(
    () => xScale.ticks(5),
    [width, domains, yScaleZoomFactor]
  )

  const yTicks = useMemo(
    () => yScale.ticks(),
    [height, domains, yScaleZoomFactor]
  )

  return (
    <Center ref={squareRef} w="100%" h="100vh" position="sticky" top={0}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      >
        <YAxis
          ticks={yTicks}
          xTicks={xTicks}
          yTicks={yTicks}
          domains={{ x: xScale.domain(), y: yScale.domain() }}
          xScale={xScale}
          yScale={yScale}
        />

        <XAxis
          ticks={xTicks}
          xTicks={xTicks}
          yTicks={yTicks}
          domains={{ x: xScale.domain(), y: yScale.domain() }}
          xScale={xScale}
          yScale={yScale}
        />

        <Points data={data} xScale={xScale} yScale={yScale} />

        <Bars width={width} height={height} />
      </svg>
    </Center>
  )
}

function Points({ data = [], xScale, yScale }) {
  const { colors } = useTheme()
  const currentSlide = useHighlightsStore((state) => state.currentSlide)
  const currentDataKey = useHighlightsStore((state) => state.currentDataKey)
  const coloredBy = useHighlightsStore((state) => state.coloredBy)
  const highlightedMarkets = useHighlightsStore(
    (state) => state.highlightedMarkets
  )

  if (!data.length || parseInt(currentSlide) > 9) return null

  return (
    <g>
      <AnimatePresence>
        {data.map((d) => {
          if (!d[currentDataKey]?.hasValue || !d.score) return null
          const cx = xScale(d.score)
          const cy = yScale(d[currentDataKey]?.value)
          const isHighlighted = highlightedMarkets.includes(d.iso.toLowerCase())
          return (
            <motion.circle
              key={d.iso}
              paintOrder="stroke fill"
              stroke="#FFF"
              strokeWidth={1}
              style={{
                cursor: "pointer",
              }}
              initial={{
                cx,
                cy,
                r: 0,
                fill: colors.gray[500],
                opacity: 0,
              }}
              animate={{
                cx,
                cy,
                r: isHighlighted ? 12 : 8,
                opacity: 1,
                fill: isHighlighted
                  ? colors.red[500]
                  : coloredBy === "marketType"
                  ? d.fill
                  : colors.gray[300],
              }}
              exit={{ r: 16, opacity: 0 }}
              transition={animationConfig}
              onClick={() => {
                console.log(d)
              }}
            />
          )
        })}
      </AnimatePresence>
    </g>
  )
}

function Bars({ width = 0, height = 0 }) {
  const currentSlide = useHighlightsStore((state) => state.currentSlide)

  const widthIncrement = width / 5
  const rectWidth = widthIncrement * 0.9
  const barWidth = rectWidth / 3

  if (parseInt(currentSlide) < 9) return null

  return (
    <g>
      <BarGroup
        x={widthIncrement * 1}
        y={(height / 4) * 3}
        rectWidth={rectWidth}
        barWidth={barWidth}
      />
      <BarGroup
        x={widthIncrement * 2}
        y={(height / 4) * 3}
        rectWidth={rectWidth}
        barWidth={barWidth}
      />
      <BarGroup
        x={widthIncrement * 3}
        y={(height / 4) * 3}
        rectWidth={rectWidth}
        barWidth={barWidth}
      />
      <BarGroup
        x={widthIncrement * 4}
        y={(height / 4) * 3}
        rectWidth={rectWidth}
        barWidth={barWidth}
      />

      {/* <g transform={`translate(${widthIncrement * 2} ${(height / 4) * 3})`}>
        <circle r={10} />
        <rect x={-rectWidth / 2} width={rectWidth} height={10} fill="#000" />
      </g>
      <g transform={`translate(${widthIncrement * 3} ${(height / 4) * 3})`}>
        <circle r={10} />
        <rect x={-rectWidth / 2} width={rectWidth} height={10} fill="#000" />
      </g>
      <g transform={`translate(${widthIncrement * 4} ${(height / 4) * 3})`}>
        <circle r={10} />
        <rect x={-rectWidth / 2} width={rectWidth} height={10} fill="#000" />
      </g> */}
    </g>
  )
}

function BarGroup({ x = 0, y = 0, rectWidth, barWidth }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={10} />
      <rect x={-rectWidth / 2} width={rectWidth} height={10} fill="#000" />
      <line
        x1={-rectWidth / 2 + barWidth / 2}
        x2={-rectWidth / 2 + barWidth / 2}
        y1={0}
        y2={-20}
        stroke="#000"
        strokeWidth={barWidth - 2}
        opacity={0.5}
      />
      <line
        y1={0}
        y2={-120}
        stroke="#000"
        strokeWidth={barWidth - 2}
        opacity={0.5}
      />
      <line
        x1={rectWidth / 2 - barWidth / 2}
        x2={rectWidth / 2 - barWidth / 2}
        y1={0}
        y2={-20}
        stroke="#000"
        strokeWidth={barWidth - 2}
        opacity={0.5}
      />
    </g>
  )
}
