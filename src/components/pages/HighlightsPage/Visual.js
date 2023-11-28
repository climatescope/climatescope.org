import { useMemo } from "react"
import { Center } from "@chakra-ui/react"
import { useElementSize } from "usehooks-ts"
import { scaleLinear } from "d3-scale"
import { motion } from "framer-motion"

import useHighlightsStore from "@utils/store/highlightsStore"

function XAxis({ ticks = [], xScale, yScale, domains = {} }) {
  return (
    <g>
      {ticks.map((tick) => {
        const y0 = yScale(domains.y[0])
        const y1 = yScale(domains.y[1])
        return (
          <g key={tick} transform={`translate(${xScale(tick)} 0)`}>
            <g className="x-grid">
              <line strokeWidth={1} stroke="#EEE" y1={y1} y2={y0} />
            </g>
            <line strokeWidth={2} stroke="#000" y1={y0 - 1} y2={y0 + 10} />
            <text
              textAnchor="middle"
              alignmentBaseline="hanging"
              y={y0 + 14}
              fontSize={14}
            >
              {tick}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function YAxis({ ticks = [], xScale, yScale, domains = {} }) {
  return (
    <g className="y-grid">
      {ticks.map((tick) => {
        const isAxis = !tick
        return (
          <g key={tick} transform={`translate(0 ${yScale(tick)})`}>
            <line
              strokeWidth={isAxis ? 2 : 1}
              stroke={isAxis ? "#000" : "#DDD"}
              x1={xScale(domains.x[0])}
              x2={xScale(domains.x[1])}
            />
            <text
              textAnchor="start"
              x={xScale(domains.x[0]) + 2}
              y={-5}
              fontSize={14}
            >
              {tick / 1000}
              {" Bn"}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export default function Visual() {
  const data = useHighlightsStore((state) => state.data)
  const currentSlide = useHighlightsStore((state) => state.currentSlide)

  const padding = useHighlightsStore((state) => state.padding)
  const domains = useHighlightsStore((state) => state.domains)

  const yScaleZoomFactor = useHighlightsStore((state) => state.yScaleZoomFactor)

  const [squareRef, dimensions] = useElementSize()

  const width = dimensions.width || 800
  const height = dimensions.height || 450

  console.log(yScaleZoomFactor)

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
    <Center
      ref={squareRef}
      w="100%"
      h="100vh"
      position="sticky"
      top={0}
      bg="gray.100"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "auto",
          background: "#FFF",
          borderTop: "0.0625rem solid #F05",
          borderBottom: "0.0625rem solid #F05",
          // fontFamily: "inherit",
        }}
      >
        <text x={width / 2} y={height / 2} textAnchor="middle">
          {`Slide ${currentSlide}`}
        </text>

        <YAxis
          ticks={yTicks}
          domains={{ x: xScale.domain(), y: yScale.domain() }}
          xScale={xScale}
          yScale={yScale}
        />

        <XAxis
          ticks={xTicks}
          domains={{ x: xScale.domain(), y: yScale.domain() }}
          xScale={xScale}
          yScale={yScale}
        />

        <Points data={data} xScale={xScale} yScale={yScale} />
      </svg>
    </Center>
  )
}

function Points({ data = [], xScale, yScale }) {
  const currentDataKey = useHighlightsStore((state) => state.currentDataKey)
  if (!data.length) return null
  return (
    <g>
      {data.map((d) => {
        const x = xScale(d.score)
        const y = yScale(d[currentDataKey]?.value)
        if (y === undefined) return null
        return (
          <motion.g
            key={d.iso}
            initial={{ x, y: yScale(0) }}
            animate={{ x, y }}
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0,
            }}
          >
            <circle r={8} fill={d.fill} stroke="#FFF" strokeWidth={1} />
          </motion.g>
        )
      })}
    </g>
  )
}
