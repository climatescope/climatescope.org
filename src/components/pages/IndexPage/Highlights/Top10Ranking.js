import { useRef } from "react"
import { useTheme } from "@chakra-ui/system"
import { max as d3Max } from "d3-array"
import { Heading, Box, Stack, HStack } from "@chakra-ui/react"
import { useElementSize } from "usehooks-ts"

import DownloadChart from "@components/DownloadChart"

function getTitle(name = "") {
  const n = name.split(" ").slice(1).join(" ").trim()
  return (n.slice(0, 1).toUpperCase() || "") + (n.slice(1) || "")
}

export default function Top10Ranking({
  data = {},
  limit,
  headingFontSize = "lg",
  chartFontSize = "md",
  precision = 0.01,
  downloadable = true,
  padding = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}) {
  const chartRef = useRef(null)
  const [squareRef, dimensions] = useElementSize()
  const { colors, fontSizes } = useTheme()

  if (!data.name) return null

  const maxVal =
    data?.data[0]?.max_value ||
    d3Max(data?.data || [], (o) => parseFloat(o.value))

  const chartTitle = getTitle(data?.name || "")

  const parsedTitle = chartTitle
    .replace(" 2021", ", 2021")
    .replace(" 2022", ", 2022")
    .replace("climatescope", "Climatescope")

  const dataItems = data.data?.slice(0, limit || undefined)

  const fontSize = fontSizes[chartFontSize]?.split("rem").join("") * 16 || 16
  const textGap = 8
  const barHeight = 32
  const itemGap = 12

  const rowHeight = fontSize + textGap + barHeight + itemGap
  const w = dimensions.width
  const h = dataItems.length * rowHeight + padding.top + padding.bottom

  return (
    <Stack spacing={5}>
      <HStack spacing={3}>
        <Heading as="h3" fontSize={headingFontSize} flex={1}>
          {parsedTitle}
        </Heading>
        {downloadable && (
          <DownloadChart
            chartRef={chartRef}
            title={parsedTitle}
            padding={{ top: 64, left: 10, right: 10, bottom: 48 }}
          />
        )}
      </HStack>
      <Box ref={squareRef}>
        <svg viewBox={`0 0 ${w} ${h}`} ref={chartRef}>
          {dataItems.map((d, i) => {
            const barWidth = (w / maxVal) * parseFloat(d.value)
            const labelInside = barWidth >= w * 0.5
            return (
              <g key={d.iso} transform={`translate(0 ${i * rowHeight})`}>
                <text
                  alignmentBaseline="hanging"
                  fill={colors.gray[500]}
                  fontWeight={600}
                  fontSize={fontSizes[chartFontSize]}
                >
                  {`${d.rank}. ${d.country}`}
                </text>
                <rect
                  x={0}
                  y={fontSize + textGap}
                  height={32}
                  width={w}
                  fill={colors.gray[50]}
                />
                <rect
                  x={0}
                  y={fontSize + textGap}
                  height={barHeight}
                  width={barWidth}
                  fill={colors.teal[800]}
                />
                <text
                  x={barWidth + (labelInside ? -4 : 4)}
                  y={fontSize + textGap + barHeight / 2}
                  textAnchor={labelInside ? "end" : "start"}
                  alignmentBaseline="central"
                  fill={labelInside ? "#FFF" : colors.teal[800]}
                  fontSize={fontSize * 0.875}
                  fontWeight={600}
                >
                  {(
                    Math.round(parseFloat(d.value) * (1 / precision)) /
                    (1 / precision)
                  ).toLocaleString("en-US")}
                  {d?.unit !== "score"
                    ? ` ${d.unit}`
                    : d?.max_value
                    ? `/${d.max_value}`
                    : ""}
                </text>
              </g>
            )
          })}
        </svg>
      </Box>
    </Stack>
  )
}
