import { useMemo } from "react"
import { Center, Stack, Text } from "@chakra-ui/layout"
import { useTheme } from "@chakra-ui/system"
import { useElementSize } from "usehooks-ts"
import { scaleLinear } from "d3-scale"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip } from "@chakra-ui/tooltip"

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

function getFill(d, isHighlighted, coloredBy, highlightedMarkets, colors) {
  if (isHighlighted) {
    if (coloredBy === "marketType") return d.fill
    else return colors.teal[800]
  }
  if (highlightedMarkets.length) {
    return colors.gray[100]
  }
  return coloredBy === "marketType" ? d.fill : colors.teal[700]
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
            <Tooltip
              label={
                <Stack spacing={1} alignItems="center" p={3}>
                  <Text
                    fontSize="sm"
                    fontWeight={600}
                    lineHeight="shorter"
                    textAlign="center"
                  >
                    {d.geography}
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight={600}
                    lineHeight="shorter"
                    textAlign="center"
                  >
                    {currentSlide === "6" ? (
                      <span>
                        {Math.round(d.cumulative * 1000)}
                        {" $ Mn"}
                      </span>
                    ) : (
                      <span>
                        {d.cumulative < 0.1
                          ? Math.round(d.cumulative * 100) / 100
                          : Math.round(d.cumulative * 10) / 10}
                        {" $ Bn"}
                      </span>
                    )}
                  </Text>
                </Stack>
              }
              key={d.iso}
              placement="top"
              hasArrow
            >
              <motion.circle
                paintOrder="stroke fill"
                stroke="#FFF"
                strokeWidth={isHighlighted ? 4 : 3}
                style={{
                  cursor: "pointer",
                }}
                initial={{
                  cx,
                  cy,
                  r: 0,
                  opacity: 0,
                }}
                animate={{
                  cx,
                  cy,
                  r: isHighlighted ? 10 : 7,
                  opacity: 1,
                  fill: getFill(
                    d,
                    isHighlighted,
                    coloredBy,
                    highlightedMarkets,
                    colors
                  ),
                }}
                exit={{ r: 16, opacity: 0 }}
                transition={animationConfig}
                onClick={() => {
                  console.log(d)
                }}
              />
            </Tooltip>
          )
        })}
      </AnimatePresence>
    </g>
  )
}

function Bars({ width = 0, height = 0 }) {
  const currentSlide = useHighlightsStore((state) => state.currentSlide)
  const padding = useHighlightsStore((state) => state.padding)
  const visiblePolicies = useHighlightsStore((state) => state.visiblePolicies)

  const widthIncrement = width / 4
  const rectWidth = widthIncrement - 40
  const barWidth = rectWidth / 3

  const showVisual = parseInt(currentSlide) > 7

  const h = height - padding.top * 2 - padding.bottom

  const scale = scaleLinear()
    .domain([0, 100])
    .range([0, h - padding.top * 2])

  return (
    <g>
      <AnimatePresence>
        {showVisual &&
          visiblePolicies.map((policy, i) => {
            return (
              <BarGroup
                key={`${policy.policy}-wrapper`}
                barId={policy.policy}
                x={(i + 0.5) * widthIncrement}
                y={h}
                rectWidth={rectWidth}
                barWidth={barWidth}
                scale={scale}
                data={policy.data}
                policy={policy}
              />
            )
          })}
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
  policy,
}) {
  const { colors } = useTheme()
  const gap = 6
  return (
    <motion.g
      key={barId}
      transform={`translate(${x} ${y})`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={animationConfig}
    >
      <text
        textAnchor="middle"
        y={-scale(100) - 20}
        fontWeight={600}
        fill={colors.gray[800]}
      >
        {policy.policy}
      </text>

      {/* <circle r={10} /> */}
      {/* <rect x={-rectWidth / 2} width={rectWidth} height={10} fill="#000" /> */}
      <motion.line
        x1={-rectWidth / 2 + barWidth / 2}
        x2={-rectWidth / 2 + barWidth / 2}
        y1={0}
        y2={-scale(data[0].value)}
        stroke={colors.cyan[700]}
        strokeWidth={barWidth - gap}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ ...animationConfig, delay: 0 }}
      />
      <motion.text
        intial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        x={-rectWidth / 2 + barWidth / 2}
        y={-scale(data[0].value) - 10}
        textAnchor="middle"
        fontWeight={600}
        fill={colors.gray[800]}
      >
        {data[0].value}
        {"%"}
      </motion.text>
      <text
        x={-rectWidth / 2 + barWidth / 2}
        y={30}
        textAnchor="middle"
        fontWeight={600}
        fill={colors.gray[800]}
      >
        {data[0].year}
      </text>
      <motion.line
        y1={0}
        y2={-scale(data[1].value)}
        stroke={colors.purple[400]}
        strokeWidth={barWidth - gap}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ ...animationConfig, delay: 0.05 }}
      />
      <motion.text
        intial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        x={0}
        y={-scale(data[1].value) - 10}
        textAnchor="middle"
        fontWeight={600}
        fill={colors.gray[800]}
      >
        {data[1].value}
        {"%"}
      </motion.text>
      <text
        x={0}
        y={30}
        textAnchor="middle"
        fontWeight={600}
        fill={colors.gray[800]}
      >
        {data[1].year}
      </text>
      <motion.line
        x1={rectWidth / 2 - barWidth / 2}
        x2={rectWidth / 2 - barWidth / 2}
        y1={0}
        y2={-scale(data[2].value)}
        stroke={colors.teal[300]}
        strokeWidth={barWidth - gap}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ ...animationConfig, delay: 0.1 }}
      />
      <motion.text
        intial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        x={rectWidth / 2 - barWidth / 2}
        y={-scale(data[2].value) - 10}
        textAnchor="middle"
        fontWeight={600}
        fill={colors.gray[800]}
      >
        {data[2].value}
        {"%"}
      </motion.text>
      <text
        x={rectWidth / 2 - barWidth / 2}
        y={30}
        textAnchor="middle"
        fontWeight={600}
        fill={colors.gray[800]}
      >
        {data[2].year}
      </text>
    </motion.g>
  )
}
