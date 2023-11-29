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

  if (!data.length || parseInt(currentSlide) > 8) return null

  return (
    <g>
      <AnimatePresence>
        {data.map((d) => {
          if (!d[currentDataKey] || !d.score) return null
          const cx = xScale(d.score)
          const cy = yScale(d[currentDataKey])
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
                  ? d.fill
                  : coloredBy === "marketType"
                  ? d.fill
                  : colors.gray[200],
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
  const padding = useHighlightsStore((state) => state.padding)

  const widthIncrement = width / 4
  const rectWidth = widthIncrement - 20
  const barWidth = rectWidth / 3

  const showVisual = parseInt(currentSlide) > 7

  const scale = scaleLinear()
    .domain([0, 100])
    .range([0, (height / 4) * 3 - padding.top])

  return (
    <g>
      <AnimatePresence>
        {showVisual && (
          <>
            <BarGroup
              key="bars-1-wrapper"
              barId="bars-1"
              x={0.5 * widthIncrement}
              y={(height / 4) * 3}
              rectWidth={rectWidth}
              barWidth={barWidth}
              scale={scale}
              data={[
                { key: 1, value: 56 },
                { key: 2, value: 72 },
                { key: 3, value: 83 },
              ]}
            />
            <BarGroup
              key="bars-2-wrapper"
              barId="bars-2"
              x={1.5 * widthIncrement}
              y={(height / 4) * 3}
              rectWidth={rectWidth}
              barWidth={barWidth}
              scale={scale}
              data={[
                { key: 1, value: 56 },
                { key: 2, value: 34 },
                { key: 3, value: 66 },
              ]}
            />
            <BarGroup
              key="bars-3-wrapper"
              barId="bars-3"
              x={2.5 * widthIncrement}
              y={(height / 4) * 3}
              rectWidth={rectWidth}
              barWidth={barWidth}
              scale={scale}
              data={[
                { key: 1, value: 12 },
                { key: 2, value: 45 },
                { key: 3, value: 92 },
              ]}
            />
            <BarGroup
              key="bars-4-wrapper"
              barId="bars-4"
              x={3.5 * widthIncrement}
              y={(height / 4) * 3}
              rectWidth={rectWidth}
              barWidth={barWidth}
              scale={scale}
              data={[
                { key: 1, value: 26 },
                { key: 2, value: 33 },
                { key: 3, value: 54 },
              ]}
            />
          </>
        )}
      </AnimatePresence>
    </g>
  )
}

function BarGroup({
  barId = "",
  x = 0,
  y = 0,
  rectWidth,
  barWidth,
  scale,
  data = [],
}) {
  const { colors } = useTheme()
  return (
    <motion.g
      key={barId}
      transform={`translate(${x} ${y})`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={animationConfig}
    >
      <circle r={10} />
      <rect x={-rectWidth / 2} width={rectWidth} height={10} fill="#000" />
      <motion.line
        x1={-rectWidth / 2 + barWidth / 2}
        x2={-rectWidth / 2 + barWidth / 2}
        y1={0}
        y2={-scale(data[0].value)}
        stroke={colors.yellow[500]}
        strokeWidth={barWidth - 2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={animationConfig}
      />
      <motion.line
        y1={0}
        y2={-scale(data[1].value)}
        stroke={colors.blue[500]}
        strokeWidth={barWidth - 2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={animationConfig}
      />
      <motion.line
        x1={rectWidth / 2 - barWidth / 2}
        x2={rectWidth / 2 - barWidth / 2}
        y1={0}
        y2={-scale(data[2].value)}
        stroke={colors.purple[500]}
        strokeWidth={barWidth - 2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={animationConfig}
      />
    </motion.g>
  )
}
