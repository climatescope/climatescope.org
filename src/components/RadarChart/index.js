import { useMemo, useCallback, useEffect, useState, useRef } from "react"
import { lineRadial, pie, arc, curveLinearClosed } from "d3-shape"
import { scaleLinear } from "d3-scale"
import { Box, Text, Stack, Tooltip, useTheme } from "@chakra-ui/react"
import { motion } from "framer-motion"
import debounce from "lodash/debounce"

const topicNames = ["fundamentals", "opportunities", "experience"]

const RadarChart = ({
  market,
  sector = "power",
  max = 5,
  size = 300,
  strokeWidth = 1,
  colorScheme = "brand",
  dotSize,
  padding = 0,
  maxWidth = "12rem",
}) => {
  const { colors } = useTheme()
  const containerSize = size + padding

  const [tooltip, setTooltip] = useState({})

  const { topics } = market
  const steps = Math.floor(max)
  const fullCircle = Math.PI * 2

  const points = useMemo(() => {
    const defaultPoints =
      sector === "all"
        ? ["power", "transport", "buildings"]
            .map((d, i) => {
              return topicNames.map((dd, j) => ({
                id: `${d.split(" ").join("-")}-${dd}`,
                x: i * 3 + j,
                y: 0,
              }))
            })
            .flat()
        : topicNames.map((d, i) => ({
            id: `${sector.split(" ").join("-")}-${d}`,
            x: i,
            y: 0,
          }))

    return defaultPoints.map((d) => {
      const r = topics.find((s) => s.id === d.id)
      const x = (fullCircle / defaultPoints.length) * d.x
      return {
        id: d.id,
        name: r.name,
        sector: r.sector,
        x,
        y: r.data[0].value || 0,
      }
    })
  }, [topics, fullCircle, sector, size])

  const yScale = useCallback(
    scaleLinear()
      .domain([0, max])
      .range([0, size / 2]),
    [max, size]
  )

  const lineGenerator = useCallback(
    lineRadial()
      .angle((d) => d.x)
      .radius((d) => yScale(d.y))
      .curve(curveLinearClosed),
    [yScale]
  )

  const shape = useMemo(() => lineGenerator(points), [points])

  const dots = useMemo(() => {
    return points.map((d, i) => {
      const alpha = ((2 * Math.PI) / points.length) * i
      const cx = yScale(d.y) * Math.cos(alpha - Math.PI / 2)
      const alpha2 = ((2 * Math.PI) / points.length) * i
      const cy = yScale(d.y) * Math.sin(alpha2 - Math.PI / 2)
      return { ...d, cx, cy }
    })
  }, [yScale, points])

  const axisLines = useMemo(() => {
    return points.map((d, i) => {
      const max = steps
      const alpha = ((2 * Math.PI) / points.length) * i
      const x2 = yScale(max) * Math.cos(alpha - Math.PI / 2)
      const alpha2 = ((2 * Math.PI) / points.length) * i
      const y2 = yScale(max) * Math.sin(alpha2 - Math.PI / 2)
      return { key: i, x1: 0, y1: 0, x2, y2, label: d.name }
    })
  }, [yScale, points, steps])

  const circles = useMemo(() => {
    return Array(steps)
      .fill(1)
      .map((d, i) => ({ key: i + d, r: yScale(i + d) }))
  }, [yScale, steps])

  const arcs = useMemo(() => {
    const arcGenerator = arc()
      .innerRadius(0)
      .outerRadius(size / 2)
    const pieData = points.map((d) => ({
      value: 1,
      label: d.name,
      sector: d.sector,
      originalValue: d.y,
    }))
    return pie()
      .startAngle(-45)
      .value((d) => d.value)(pieData)
      .map((d, key) => ({
        key,
        label: d.data.label,
        sector: d.data.sector,
        originalValue: d.data.originalValue,
        d: arcGenerator({ startAngle: d.startAngle, endAngle: d.endAngle }),
      }))
  }, [points])

  const handleTooltipShow =
    ({ label, sector, originalValue }) =>
    () => {
      if (!originalValue) return
      setTooltip({ label, label, sector, originalValue })
    }

  const handleTooltipHide = () => {
    setTooltip({})
  }

  return (
    <Box w="100%" maxW={maxWidth} height="auto" position="relative">
      <svg
        style={{
          color: colors[colorScheme][800],
          userSelect: "none",
          width: "100%",
          height: "auto",
        }}
        viewBox={`0 0 ${containerSize} ${containerSize}`}
      >
        {circles.map((d) => {
          const sm = size < 140
          return (
            <g key={d.key}>
              <circle
                cx={containerSize / 2}
                cy={containerSize / 2}
                r={d.r}
                stroke={colors.gray[100]}
                strokeWidth={strokeWidth}
                fill="none"
                vectorEffect="non-scaling-stroke"
                strokeDasharray={sm ? [] : [3, 3]}
              />
              {!sm ? (
                <text
                  x={containerSize / 2}
                  y={containerSize / 2 + d.r + 4}
                  fontSize="12"
                  fontWeight={600}
                  textAnchor="middle"
                  stroke="#FFF"
                  strokeWidth={5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  paintOrder="stroke fill"
                  fill={colors.gray[300]}
                >
                  {d.key}
                </text>
              ) : null}
            </g>
          )
        })}
        <g transform={`translate(${containerSize / 2} ${containerSize / 2})`}>
          {axisLines.map(({ key, x1, x2, y1, y2 }) => {
            return (
              <line
                key={key}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FFF"
                strokeWidth={strokeWidth * 6}
                strokeLinecap="square"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
          {axisLines.map(({ key, x1, x2, y1, y2 }) => {
            return (
              <line
                key={key}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.gray[100]}
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
          {axisLines.map(({ key, x2, y2, label }) => {
            const sm = size < 140
            const anchorMap = ["middle", "end", "start"]
            const xOffsetMap = sm ? [0, 12, -12] : [0, 24, -24]
            const yOffsetMap = [-6, 14, 14]
            return (
              <g key={key} transform={`translate(${x2} ${y2})`}>
                <text
                  x={xOffsetMap[key]}
                  y={yOffsetMap[key]}
                  fontSize={10}
                  fontWeight={600}
                  textAnchor={anchorMap[key]}
                  fill={
                    label === tooltip.label
                      ? colors.brand[800]
                      : colors.gray[500]
                  }
                  stroke="#FFF"
                  strokeWidth={4}
                  paintOrder="stroke fill"
                >
                  {sm
                    ? label.slice(0, !key ? 4 : 3).toUpperCase() + "."
                    : label.toUpperCase()}
                </text>
              </g>
            )
          })}
          <path
            d={shape}
            fill="currentcolor"
            fillOpacity={0.1}
            stroke="currentcolor"
            strokeWidth={strokeWidth * 2}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
          {dotSize !== 0 &&
            dots.map((d, i) =>
              d.y ? (
                <motion.circle
                  key={i}
                  animate={{ cx: d.cx, cy: d.cy }}
                  r={
                    dotSize ||
                    (size / 60) *
                      strokeWidth *
                      (d.name === tooltip.label ? 2 : 1)
                  }
                  fill="currentcolor"
                  stroke="#FFF"
                  strokeWidth={strokeWidth * 2}
                  vectorEffect="non-scaling-stroke"
                  paintOrder="stroke fill"
                />
              ) : null
            )}
          {arcs.map(({ key, d, label, sector, originalValue }) => {
            return (
              <Tooltip
                key={key}
                bg="white"
                borderRadius="md"
                border="0.0625rem solid"
                borderColor="gray.25"
                boxShadow="lg"
                label={
                  originalValue ? (
                    <Stack spacing={0} textAlign="center" py={1} px={2}>
                      <Text
                        fontSize="0.625rem"
                        lineHeight="shorter"
                        color="gray.500"
                        textTransform="uppercase"
                        fontWeight={600}
                      >
                        {sector}
                      </Text>
                      <Text
                        fontWeight={600}
                        lineHeight="shorter"
                        color="gray.900"
                      >
                        {label}
                      </Text>
                      <Text
                        fontFamily="mono"
                        fontSize="xs"
                        lineHeight="shorter"
                        fontWeight={600}
                        color="gray.500"
                      >
                        {originalValue < 0.01
                          ? "<0.01"
                          : originalValue.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })}
                        {"/5"}
                      </Text>
                    </Stack>
                  ) : null
                }
                gutter={-8}
                placement={!key ? "top" : "bottom"}
              >
                <path
                  d={d}
                  fill={colors.brand[800]}
                  fillOpacity={label === tooltip.label ? 0.05 : 0}
                  onMouseEnter={handleTooltipShow({
                    label,
                    sector,
                    originalValue,
                  })}
                  onMouseLeave={handleTooltipHide}
                />
              </Tooltip>
            )
          })}
        </g>
      </svg>
    </Box>
  )
}

/**
 *
 * Only render the radar charts on the client side and
 * avoid bloated initial pages. Radar charts add no SEO value
 * to the page
 *
 */

const RadarChartWrapper = ({
  market,
  sector = "power",
  max = 5,
  size = 300,
  strokeWidth = 1,
  colorScheme = "brand",
  dotSize,
  padding = 0,
  maxWidth = "12rem",
  isVisible = true,
}) => {
  const boxRef = useRef()
  const [loaded, setLoaded] = useState(false)
  const [dimensions, setDimensions] = useState()

  useEffect(() => {
    if (typeof window === "undefined") return
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded || !boxRef.current) return
    const handleResize = () => {
      const width = boxRef.current.getBoundingClientRect().width
      setDimensions(width)
    }
    const wrappedHandler = debounce(() => handleResize(), 500)
    handleResize()
    window.removeEventListener("resize", wrappedHandler)
    window.addEventListener("resize", wrappedHandler)
    return () => {
      window.removeEventListener("resize", wrappedHandler)
    }
  }, [loaded, isVisible])

  return loaded ? (
    <div ref={boxRef}>
      <RadarChart
        market={market}
        sector={sector}
        max={max}
        size={dimensions}
        strokeWidth={strokeWidth}
        colorScheme={colorScheme}
        dotSize={dotSize}
        padding={padding}
        maxWidth={maxWidth}
      />
    </div>
  ) : (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ width: "100%", maxWidth, height: "auto" }}
    />
  )
}

export default RadarChartWrapper
