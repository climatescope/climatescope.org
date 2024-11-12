import { scaleLinear } from "d3-scale"
import { arc as d3arc } from "d3-shape"
import { useState } from "react"
import { Tooltip, useTheme } from "@chakra-ui/react"

function createCirclePath({ r, startAngle = 0, endAngle = 2 * Math.PI }) {
  // return `M ${cx} ${cy} m ${r}, 0 a ${r},${r} 0 1,0 -${
  //   r * 2
  // },0 a ${r},${r} 0 1,0 ${r * 2},0`
  return d3arc()({
    innerRadius: 0,
    outerRadius: r,
    startAngle,
    endAngle,
  })
}

export default function RadarChart({ data, simplified = false, ...props }) {
  const { colors } = useTheme()
  const width = 20
  const height = width

  const strokeWidth = 0.25

  const maxRadius = Math.min(width, height) / 2 - 1

  const [highlightedSegment, setHighlightedSegment] = useState(null)

  const rScale = scaleLinear().domain([0, 5]).range([0, maxRadius])

  const circlePaths = [
    createCirclePath({ r: Math.round(rScale(5) * 10000) / 10000 }),
    createCirclePath({ r: Math.round(rScale(3) * 10000) / 10000 }),
    createCirclePath({ r: Math.round(rScale(1) * 10000) / 10000 }),
  ].join(" ")

  const linePaths = [
    `M${width / 2},${height / 2}L${getPointOnCircle(0, rScale(5), [
      width / 2,
      height / 2,
    ]).join(",")}`,
    `M${width / 2},${height / 2}L${getPointOnCircle(120, rScale(5), [
      width / 2,
      height / 2,
    ]).join(",")}`,
    `M${width / 2},${height / 2}L${getPointOnCircle(240, rScale(5), [
      width / 2,
      height / 2,
    ]).join(",")}`,
  ].join(" ")

  const d2 = [
    data.find((s) => s.label === "Fundamentals"),
    data.find((s) => s.label === "Opportunities"),
    data.find((s) => s.label === "Experience"),
  ]

  const trianglePath =
    "M" +
    [
      getPointOnCircle(0, rScale(d2[0].value), [width / 2, height / 2]),
      getPointOnCircle(120, rScale(d2[1].value), [width / 2, height / 2]),
      getPointOnCircle(240, rScale(d2[2].value), [width / 2, height / 2]),
    ].join("L") +
    "Z"

  const oneThird = (2 * Math.PI) / 3

  const tooltipSegments = [
    {
      data: d2[0],
      path: createCirclePath({
        r: Math.round(rScale(5) * 10000) / 10000,
        startAngle: -oneThird / 2,
        endAngle: -oneThird / 2 + oneThird,
      }),
    },
    {
      data: d2[1],
      path: createCirclePath({
        r: Math.round(rScale(5) * 10000) / 10000,
        startAngle: -oneThird / 2 + oneThird,
        endAngle: -oneThird / 2 + oneThird * 2,
      }),
    },
    {
      data: d2[2],
      path: createCirclePath({
        r: Math.round(rScale(5) * 10000) / 10000,
        startAngle: -oneThird / 2 + oneThird * 2,
        endAngle: -oneThird / 2 + oneThird * 3,
      }),
    },
  ]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      stroke="var(--chakra-colors-gray-400)"
      strokeWidth={strokeWidth}
      {...props}
    >
      <path
        d={circlePaths}
        vectorEffect="non-scaling-stroke"
        transform={`translate(${width / 2} ${height / 2})`}
      />

      <path
        d={linePaths}
        strokeWidth={strokeWidth * 8}
        stroke="#FFF"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
      <path d={linePaths} vectorEffect="non-scaling-stroke" />

      {!simplified && (
        <g>
          {[1, 3, 5].map((tick) => {
            const [x, y] = getPointOnCircle(0, rScale(tick), [
              width / 2,
              height / 2,
            ])
            return (
              <text
                key={tick}
                x={x - 0.0625}
                y={y}
                stroke="#FFF"
                strokeWidth={8}
                fontSize={1}
                fontWeight={600}
                fill={colors.gray[300]}
                alignmentBaseline="central"
                textAnchor="middle"
                paintOrder="stroke fill"
                vectorEffect="non-scaling-stroke"
              >
                {tick}
              </text>
            )
          })}

          {[1, 3, 5].map((tick) => {
            const [x, y] = getPointOnCircle(120, rScale(tick), [
              width / 2,
              height / 2,
            ])
            return (
              <text
                key={tick}
                x={x - 0.0625}
                y={y}
                stroke="#FFF"
                strokeWidth={8}
                fontSize={1}
                fontWeight={600}
                fill={colors.gray[300]}
                alignmentBaseline="central"
                textAnchor="middle"
                paintOrder="stroke fill"
                vectorEffect="non-scaling-stroke"
              >
                {tick}
              </text>
            )
          })}

          {[1, 3, 5].map((tick) => {
            const [x, y] = getPointOnCircle(240, rScale(tick), [
              width / 2,
              height / 2,
            ])
            return (
              <text
                key={tick}
                x={x - 0.0625}
                y={y}
                stroke="#FFF"
                strokeWidth={8}
                fontSize={1}
                fontWeight={600}
                fill={colors.gray[300]}
                alignmentBaseline="central"
                textAnchor="middle"
                paintOrder="stroke fill"
                vectorEffect="non-scaling-stroke"
              >
                {tick}
              </text>
            )
          })}
        </g>
      )}

      <path
        d={trianglePath}
        fill="var(--chakra-colors-brand-500)"
        fillOpacity={0.5}
        stroke="var(--chakra-colors-brand-700)"
        strokeWidth={strokeWidth * 2}
        vectorEffect="non-scaling-stroke"
      />
      <g transform={`translate(${width / 2} ${height / 2})`} stroke="none">
        {tooltipSegments.map((segment, i) => (
          <Tooltip
            key={segment.data.label}
            label={
              <div
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  fontWeight: 600,
                }}
              >
                <div>{`${segment.data.label}: ${
                  Math.round(segment.data.value * 100) / 100
                }`}</div>
              </div>
            }
            placement={!i ? "top" : "bottom"}
          >
            <path
              d={segment.path}
              fill={
                highlightedSegment?.data?.label === segment?.data?.label
                  ? "rgba(0,0,0,0.1)"
                  : "transparent"
              }
              stroke="none"
              onMouseEnter={() => {
                setHighlightedSegment(segment)
              }}
              onMouseLeave={() => {
                setHighlightedSegment(null)
              }}
            />
          </Tooltip>
        ))}
      </g>
    </svg>
  )
}

function getPointOnCircle(deg, r, c = [0, 0]) {
  const a = (deg * Math.PI) / 180
  return [c[0] + r * Math.sin(a), c[1] + r * -Math.cos(a)].map(
    (d) => Math.round(d * 10000) / 10000
  )
}

// function Hexagon() {
//   const [a, b] = [4.5, 7.75]
//   return (
//     <>
//       <path
//         d={`M10,0 l${b},${a} l0,${Math.sqrt(
//           Math.pow(a, 2) + Math.pow(b, 2)
//         )} l-${b},${a} l-${b},-${a} l0,-${Math.sqrt(
//           Math.pow(a, 2) + Math.pow(b, 2)
//         )} l${b},-${a}`}
//         stroke="#000"
//         fill="none"
//         transform="translate(0 1)"
//       />
//       <circle cx={10} cy={1} r={0.75} />
//       <circle cx={10 + b} cy={10 + a} r={0.75} />
//       <circle cx={10 - b} cy={10 + a} r={0.75} />
//       <circle cx={10} cy={20 - 1} r={0.75} />
//     </>
//   )
// }
