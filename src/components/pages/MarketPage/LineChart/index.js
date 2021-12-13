import { memo, useRef, useState, useEffect, useCallback } from "react"
import {
  Box,
  Heading,
  Text,
  useTheme,
  // Wrap,
  // WrapItem,
  Skeleton,
  AspectRatio,
  Stack,
  Divider,
} from "@chakra-ui/react"
import debounce from "lodash/debounce"
import sortBy from "lodash/sortBy"
import { range } from "d3-array"

import { useChart, useScale, useExtent, useAxis } from "./utils"
import Line from "./Line"

/**
 *
 * Split lines into multiple lines if there are null
 * points within the series
 *
 * @param {array} data
 * @returns {array}
 *
 */
function splitData(data) {
  return data.reduce((acc, cur, i) => {
    if (!acc.length) {
      return cur.value || cur.value === 0 ? [[cur]] : acc
    }
    if (cur.value || cur.value === 0) {
      const firstSet = acc.slice(0, -1)
      const lastSet = acc.slice(-1)[0] || []
      return [...firstSet, [...lastSet, cur]]
    } else {
      const lastSet = acc.slice(-1)[0]
      const isLast = data.length - 1 === i
      return isLast
        ? !lastSet.length
          ? acc.slice(0, -1)
          : acc
        : !lastSet.length
        ? acc
        : [...acc, []]
    }
  }, [])
}

/**
 *
 * Prepare the line data and split lines into multiple
 * lines if there is null data
 *
 * @param {array} series
 * @returns {array}
 *
 */
function prepareLines(series) {
  return series.reduce((acc, cur) => {
    const data = splitData(
      cur.data.map((d) => ({
        year: +d.year,
        value: parseFloat(d.value) || null,
      }))
    )
    return !data.length ? acc : [...acc, { ...cur, data }]
  }, [])
}

const Band = ({
  data,
  x,
  x2,
  tooltip,
  onTooltipShow,
  onTooltipHide,
  w,
  height,
}) => {
  const { colors } = useTheme()
  const handleEnter = () => {
    onTooltipShow({ year: data, x: x2 })
  }

  const handleLeave = () => {
    onTooltipHide()
  }

  const strokeWidth = 2

  return (
    <g>
      <rect
        fill={tooltip.year === data ? colors.teal[800] : "transparent"}
        fillOpacity={0.05}
        x={x}
        y={0}
        width={w}
        height={height - 40}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      />
      <rect
        x={x2 - strokeWidth / 2}
        y={0}
        width={strokeWidth}
        height={height - 30}
        fill={tooltip.year === data ? colors.teal[900] : "transparent"}
        style={{ pointerEvents: "none" }}
      />
    </g>
  )
}

const LineChart = ({
  title,
  chart,
  width,
  height,
  scaleX,
  scaleY,
  scaleBand,
  preparedLines,
}) => {
  const { colors } = useTheme()
  const [tooltip, setTooltip] = useState({})
  const visible = preparedLines.map(d => ({ ...d, isVisible: true }))

  const xAxis = useAxis({ scale: scaleX })
  const yAxis = useAxis({ scale: scaleY })

  const handleTooltipShow = useCallback((data) => {
    const d = visible.map((dd) => {
      const relevantData =
        dd.data.flat().find((s) => s.year === data.year) || {}
      return {
        name: dd.subindicator,
        unit: dd.units,
        ...relevantData,
      }
    })
    const hasData = d.reduce((acc, cur) => acc || cur.year || cur.value, false)
    if (!hasData) return
    setTooltip({ ...data, data: sortBy(d, (o) => -o.value) })
  }, [visible])

  const handleTooltipHide = useCallback(() => {
    setTooltip({})
  }, [])

  return (
    <Stack spacing={5}>
      <Heading fontSize="xl">{title}</Heading>
      <Box position="relative">
        <Box
          position="absolute"
          top={0}
          zIndex={2}
          p={4}
          style={{
            display: tooltip.year ? "block" : "none",
            left: tooltip.x - (tooltip.x > width / 2 ? 280 : 0) || 0,
            width: 280,
            pointerEvents: "none",
          }}
        >
          <Stack
            py={3}
            bg="white"
            boxShadow="lg"
            borderRadius="md"
            border="0.0625rem solid"
            borderColor="gray.25"
            spacing={2}
          >
            <Text fontWeight={600} lineHeight="short" px={4}>
              {`${title} ${tooltip.year}`}
            </Text>

            <Divider borderColor="gray.100" w="100%" />

            <Stack spacing={2} px={4}>
              {tooltip.data &&
                tooltip.data.length &&
                tooltip.data.map((d) => {
                  return (
                    <Stack key={d.name} spacing={0}>
                      <Text fontSize="sm" lineHeight="shorter" fontWeight={600}>
                        {d.name}
                      </Text>
                      <Text fontSize="sm" lineHeight="shorter">
                        {`${d.value?.toLocaleString("en-US") || ""} ${d.unit}`}
                      </Text>
                    </Stack>
                  )
                })}
            </Stack>
          </Stack>
        </Box>

        <svg {...chart} style={{ display: "block" }}>
          {xAxis.map((tick) => (
            <g key={tick.value} transform={`translate(0, ${height - 40})`}>
              <line
                x1={tick.offset}
                x2={tick.offset}
                y1={0}
                y2={10}
                stroke={colors.gray[100]}
              />
              <text
                x={tick.offset}
                y={24}
                fontSize="14"
                textAnchor="middle"
                fill={colors.gray[500]}
              >
                {tick.value}
              </text>
            </g>
          ))}

          {yAxis.map((tick, i) => (
            <g key={tick.value} transform="translate(0, 0)">
              {/* <line
                x1={0}
                x2={-10}
                y1={tick.offset}
                y2={tick.offset}
                stroke="#000"
              /> */}
              <line
                x1={0}
                x2={width}
                y1={tick.offset}
                y2={tick.offset}
                stroke={colors.gray[100]}
                strokeDasharray={!tick.value ? [] : [3, 3]}
              />
              <text
                x={0}
                y={tick.offset - 5}
                fontSize="14"
                textAnchor="start"
                fill={colors.gray[500]}
              >
                {i === yAxis.length - 1
                  ? ` ${getUnit(tick.value, preparedLines[0].units)}`
                  : tick.value.toLocaleString("en-US")}
              </text>
            </g>
          ))}

          {visible.map(({ data, subindicator, isVisible }) => {
            const points = data.flat()
            return isVisible ? (
              <g key={subindicator}>
                {data.map((l, j) => (
                  <Line key={j} data={l} scaleX={scaleX} scaleY={scaleY} />
                ))}
                {points.map((d) => {
                  return (
                    <circle
                      key={d.year}
                      cx={scaleX(d.year)}
                      cy={scaleY(d.value)}
                      r={5}
                      fill={colors.teal[800]}
                      stroke="#FFF"
                      strokeWidth={2}
                    />
                  )
                })}
              </g>
            ) : null
          })}

          {scaleBand.domain().map((d) => {
            const x = scaleBand(d)
            const x2 = scaleX(d)
            const w = scaleBand.bandwidth()
            return (
              <Band
                key={d}
                data={d}
                x={x}
                x2={x2}
                w={w}
                height={height}
                tooltip={tooltip}
                onTooltipShow={handleTooltipShow}
                onTooltipHide={handleTooltipHide}
              />
            )
          })}
        </svg>
      </Box>

      {/* <Wrap spacing={2}>
        {visible.map(({ subindicator, isVisible }) => {
          return (
            <WrapItem key={subindicator}>
              <Box
                style={{
                  background: isVisible ? colors.teal[600] : colors.gray[50],
                  color: isVisible ? colors.white : colors.gray[500],
                  cursor: "pointer",
                  userSelect: "none",
                }}
                px={2}
                borderRadius="md"
                fontSize="sm"
                fontWeight={600}
                color="gray.500"
                onClick={() => {
                  setVisible(
                    visible.reduce((acc, cur) => {
                      return cur.subindicator === subindicator
                        ? [...acc, { ...cur, isVisible: !cur.isVisible }]
                        : [...acc, cur]
                    }, [])
                  )
                }}
              >
                {subindicator}
              </Box>
            </WrapItem>
          )
        })}
      </Wrap> */}
    </Stack>
  )
}

function getUnit(val, unit) {
  const v = val.toLocaleString("en-US")
  const unitMap = {
    "M USD": `${v} M USD`,
    "USD/MWh": `${v} USD/MWh`,
  }
  return unitMap[unit] || v || ""
}

const LineChartWrapper = ({ width = 672, height = 378, data }) => {
  const [preparedLines, setPreparedLines] = useState([])
  const name = data?.indicator
  const series = data?.subindicators || []

  const domainData = series
    .reduce((acc, cur) => [...acc, ...cur.data], [])
    .map((d) => ({ year: +d.year, value: parseFloat(d.value) }))

  const chart = useChart({ width, height })

  const domainX = useExtent(domainData, "year")
  const domainY = useExtent(domainData, "value")

  const scaleX = useScale({
    type: "linear",
    domain: domainX,
    range: [0, width],
    padding: [40, 40],
  })

  const scaleY = useScale({
    type: "linear",
    domain: [0, domainY[1]],
    range: [height, 0],
    padding: [40, 20],
  })

  const bandDomain = range(domainX[1] - domainX[0] + 1).map(
    (d) => domainX[0] + d
  )

  const scaleBand = useScale({
    type: "band",
    domain: bandDomain,
    // range: [0, width],
    // padding: [
    //   -(width - 80) / bandDomain.length / 4,
    //   -(width - 80) / bandDomain.length / 4,
    // ],
    range: [
      40 - (width - 80) / bandDomain.length / 2,
      width - 40 + (width - 80) / bandDomain.length / 2,
    ],
    padding: [0, 0],
  })

  useEffect(() => {
    if (!name || !series) return
    setPreparedLines(prepareLines(series))
  }, [name, series])

  if (!preparedLines.length) {
    return (
      <Box position="relative">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
        >
          <Skeleton
            startColor="gray.25"
            endColor="gray.100"
            h="100%"
            borderRadius="md"
          />
        </Box>
        <Box position="relative" zIndex={2}>
          <AspectRatio ratio={16 / 9}>
            <Box color="gray.500">{"Loading..."}</Box>
          </AspectRatio>
        </Box>
      </Box>
    )
  }

  return (
    <LineChart
      title={name}
      chart={chart}
      width={width}
      height={height}
      scaleX={scaleX}
      scaleY={scaleY}
      scaleBand={scaleBand}
      preparedLines={preparedLines}
    />
  )
}

const LineChartContainer = (props) => {
  const boxRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 672, height: 378 })

  useEffect(() => {
    const handleResize = debounce(() => {
      const width = boxRef.current.getBoundingClientRect().width
      setDimensions({ width, height: (width / 16) * 9 })
    }, 500)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Box ref={boxRef}>
      <LineChartWrapper {...dimensions} {...props} />
    </Box>
  )
}

// export default memo(LineChartContainer)
export default LineChartContainer
