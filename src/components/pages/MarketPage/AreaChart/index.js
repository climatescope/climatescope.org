import { memo, useRef, useEffect, useState, useCallback } from "react"
import {
  Box,
  Heading,
  Text,
  Stack,
  HStack,
  Divider,
  useTheme,
} from "@chakra-ui/react"
import { area } from "d3-shape"
import { range, extent, sum } from "d3-array"
import debounce from "lodash/debounce"
import sortBy from "lodash/sortBy"

import { useChart, useScale, useAxis } from "../LineChart/utils"
// import { colors } from "@utils/theme"

function computeArea(prev, cur, scaleX, scaleY) {
  const a = cur.data.map((d) => {
    const relevantPrevData = prev?.data?.find((s) => s.year === d.year) || {
      y1: scaleY(0),
    }
    return {
      ...d,
      x: scaleX(d.year),
      y0: relevantPrevData.y1,
      y1: relevantPrevData.y1 - (scaleY(0) - scaleY(d.value)),
    }
  })
  return a
}

const processSubindicatorData = (data) => {
  // TODO: Check if this works. The forced 0 could replace null values, which could be important
  // if there are cases where only one value in the series is a null value.
  const processedValues = data.map((d) => ({
    year: +d.year,
    value: parseFloat(d.value) || 0,
  }))
  const sumOfValues = processedValues.reduce((acc, cur) => acc + cur.value, 0)
  return sumOfValues ? processedValues : []
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

const AreaChart = ({
  width = 672,
  height = 378,
  data,
  compactTooltip,
  precision,
  ...restProps
}) => {
  const { colors } = useTheme()
  const chart = useChart({ width, height })
  const [tooltip, setTooltip] = useState({})
  const subindicators = data.subindicators || []
  const unit = subindicators[0]?.units || ""

  const areasUnordered = subindicators.reduce((acc, cur) => {
    const data = processSubindicatorData(cur.data)
    return data.length ? [...acc, { ...cur, data, isVisible: true }] : acc
  }, [])

  const areas = sortBy(areasUnordered, (o) => -sum(o.data, (d) => d.value))

  const domainX = restProps.domainX || extent(areas[0].data.map((d) => d.year))

  const domainY = restProps.domainY || [
    0,
    range(domainX[1] - domainX[0] + 1).reduce((acc, cur) => {
      const year = domainX[0] + cur
      const m = areas.reduce((acc2, cur2) => {
        const v = cur2.data.find((s) => s.year === year) || { value: 0 }
        return acc2 + v.value
      }, 0)
      return acc > m ? acc : m
    }, 0),
  ]

  // const domainY = [0, maxY]

  const scaleX = useScale({
    type: "linear",
    domain: domainX,
    range: [0, width],
    padding: [48, 20],
    // position: "left",
  })

  const scaleY = useScale({
    type: "linear",
    domain: [0, domainY[1]],
    range: [height, 0],
    padding: [40, 40],
    // position: "bottom",
  })

  const bandDomain = range(domainX[1] - domainX[0] + 1).map(
    (d) => domainX[0] + d
  )

  const scaleBand = useScale({
    type: "band",
    domain: bandDomain,
    range: [
      48 - (width - 68) / bandDomain.length / 2,
      width - 20 + (width - 68) / bandDomain.length / 2,
    ],
    padding: [0, 0],
  })

  const areaGenerator = area()
    .x((d) => d.x)
    .y0((d) => d.y0)
    .y1((d) => d.y1)

  const visualAreas = areas
    .map((d, i) => ({
      ...d,
      sortKey: d.subindicator === "Others" ? 0 : 1 + i,
    }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .reduce((acc, cur) => {
      if (cur.isVisible) {
        const prev = acc.slice(-1)[0]
        const data = computeArea(prev, cur, scaleX, scaleY)
        return [
          ...acc,
          {
            ...cur,
            data,
          },
        ]
      } else {
        return acc
      }
    }, [])

  const xAxis = useAxis({ scale: scaleX })
  const yAxis = useAxis({ scale: scaleY, ticks: 4 })

  const colorMap = {
    "Others": colors.gray[100],
    "Biomass & Waste": colors.green[700],
    "Geothermal": colors.purple[600],
    "Small Hydro": colors.blue[500],
    "Wind": colors.blue[200],
    "Solar PV": colors.yellow[400],
    ...colors.indicators,
  }

  const handleTooltipShow = useCallback(
    (data) => {
      const d = visualAreas.map((dd) => {
        const relevantData = dd.data.find((s) => s.year === data.year) || {}
        return {
          name: dd.subindicator,
          unit: dd.units,
          ...relevantData,
        }
      })
      const total = d.reduce((acc, cur) => (acc += cur.value), 0)
      setTooltip({
        ...data,
        data: d
          .map((dd) => ({
            ...dd,
            percentage: Math.round((100 / total) * dd.value * 100) / 100,
            // precentage:
            //   Math.round((100 / total) * dd.value * (1 / precision)) /
            //   (1 / precision),
          }))
          .reverse(),
      })
    },
    [visualAreas, precision]
  )

  const handleTooltipHide = useCallback(() => {
    setTooltip({})
  }, [])

  return (
    <Stack spacing={5}>
      <Heading fontSize="xl">{`${data.indicator} (in ${unit})`}</Heading>
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
              {`${data.indicator} ${tooltip.year}`}{" "}
              {compactTooltip &&
                `[${tooltip?.data?.length ? tooltip.data[0].unit : ""}]`}
            </Text>

            <Divider borderColor="gray.100" w="100%" />

            <Stack spacing={2} px={4}>
              {tooltip.data &&
                tooltip.data.length &&
                tooltip.data.map((d) => {
                  return (
                    <Stack key={d.name} spacing={0}>
                      <HStack
                        spacing={4}
                        alignItems="flex-start"
                        style={{ opacity: !d.value && !d.percentage ? 0.3 : 1 }}
                      >
                        <Box
                          w="1rem"
                          h="1rem"
                          mt="0.0625rem"
                          flex="none"
                          borderRadius="sm"
                          style={{
                            background: colorMap[d.name],
                            opacity: 0.75,
                          }}
                        />
                        <Stack spacing={0} flex="1">
                          <Text
                            fontSize="sm"
                            lineHeight="shorter"
                            fontWeight={600}
                          >
                            {d.name}
                          </Text>
                          {!compactTooltip && (
                            <Text fontSize="sm" lineHeight="shorter">
                              {`${d.value.toLocaleString("en-US", {
                                maximumFractionDigits:
                                  `${precision}`.split(".")[1]?.length || 1,
                              })} ${d.unit}`}
                            </Text>
                          )}
                        </Stack>
                        {compactTooltip ? (
                          <Text fontSize="xs" lineHeight="shorter">
                            {`${d.value.toLocaleString("en-US", {
                              maximumFractionDigits:
                                precision === 1
                                  ? 0
                                  : `${precision}`.split(".")[1]?.length || 1,
                            })}`}
                          </Text>
                        ) : (
                          <PercentageDisplay
                            percentage={d.percentage}
                            value={d.value}
                          />
                        )}
                      </HStack>
                    </Stack>
                  )
                })}
            </Stack>
          </Stack>
        </Box>
        <Box fontFamily="mono">
          <svg {...chart}>
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
                  x2={width - 20}
                  y1={tick.offset}
                  y2={tick.offset}
                  stroke={colors.gray[100]}
                  strokeDasharray={[3, 3]}
                />
                <text
                  x={0}
                  y={tick.offset - 5}
                  fontSize="14"
                  textAnchor="start"
                  fill={colors.gray[500]}
                >
                  {tick.value >= 1000000000
                    ? tick.value / 1000000000 + "B"
                    : tick.value >= 1000000
                    ? tick.value / 1000000 + "M"
                    : tick.value >= 1000
                    ? tick.value / 1000 + "K"
                    : tick.value}
                  {i === yAxis.length - 1
                    ? ` ${visualAreas[0].units || ""}`
                    : ""}
                </text>
              </g>
            ))}

            {visualAreas.map((props, i) => {
              return (
                <path
                  fill={colorMap[props.subindicator]}
                  className="path"
                  key={i}
                  d={areaGenerator(props.data)}
                  stroke="#FFF"
                  strokeWidth={2}
                  fillOpacity={0.75}
                  paintOrder="stroke fill"
                  onClick={() =>
                    console.log(data.indicator, props.subindicator, props.data)
                  }
                />
              )
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
      </Box>
    </Stack>
  )
}

const AreaChartWrapper = (props) => {
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

  const { data } = props
  const { subindicators } = data || {}

  return (
    <Box ref={boxRef}>
      {subindicators && subindicators.length ? (
        <AreaChart {...dimensions} {...props} />
      ) : null}
    </Box>
  )
}

function PercentageDisplay({ percentage, value }) {
  return (
    <Text fontSize="sm" lineHeight="shorter" fontWeight={600}>
      {value && percentage
        ? percentage.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + "%"
        : null}

      {value && !percentage ? "<0.01%" : null}
      {!value && !percentage ? "-" : null}
    </Text>
  )
}

export default memo(AreaChartWrapper)
