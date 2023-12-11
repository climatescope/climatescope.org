import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@chakra-ui/system"
import _sortBy from "lodash/sortBy"

import Row from "@components/tools/RankOverTime/Row"
import { useStore } from "@components/tools/RankOverTime/store"

/**
 *
 * Ranking over time visualization
 *
 */
export default function RankingOverTime({ data, width }) {
  const { colors } = useTheme()

  const rowHeight = 44
  const headerRowHeight = 40
  const height = data.length * rowHeight + headerRowHeight

  const segmentWidth =
    width < 600
      ? width / 3.8
      : width < 1000
      ? width / 3.1
      : width < 1200
      ? width / 2.8
      : width / 2.6

  const headerColumns = ["2021", "2022", "2023"].map((label, i) => {
    const x = i * segmentWidth + rowHeight / 2 || 0
    return { x, label }
  })

  const padding = {
    left: 2,
    right: 4,
    top: 0,
    bottom: 0,
  }

  const w = width + padding.left + padding.right
  const h = height + padding.top + padding.bottom

  const filteredData = _sortBy(data, (o) => o["2023"])

  return (
    <div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        style={{ width: "100%", height: "auto" }}
      >
        <g transform={`translate(${padding.left} ${padding.top})`}>
          {headerColumns.map((col) => {
            return (
              <g
                key={col.label}
                transform={`translate(${col.x} ${headerRowHeight / 2})`}
              >
                <text textAnchor="middle" fontWeight={600}>
                  {col.label}
                </text>
                <line
                  x1={0}
                  x2={0}
                  y1={10}
                  y2={height}
                  stroke={colors.gray[200]}
                  strokeWidth={2}
                />
              </g>
            )
          })}
          <g transform={`translate(0 ${headerRowHeight})`}>
            {filteredData.map((d) => {
              return (
                <Row
                  key={d.iso}
                  d={d}
                  width={width}
                  rowHeight={rowHeight}
                  segmentWidth={segmentWidth}
                  colors={{
                    circleFill: colors.gray[200],
                    circleStroke: "#FFF",
                    pathStroke: colors.gray[200],
                    rankFill: colors.gray[800],
                  }}
                />
              )
            })}
            <AnimatePresence>
              <Highlighted
                width={width}
                height={height}
                rowHeight={rowHeight}
                segmentWidth={segmentWidth}
              />
            </AnimatePresence>
          </g>
        </g>
      </svg>
    </div>
  )
}

function Highlighted({ width, height, rowHeight, segmentWidth }) {
  const { colors } = useTheme()
  const highlighted = useStore((state) => state.highlighted)
  return highlighted ? (
    <motion.g
      style={{ pointerEvents: "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <rect width={width} height={height} fill="#FFF" opacity={0.75} />
      <Row
        d={highlighted}
        width={width}
        rowHeight={rowHeight}
        segmentWidth={segmentWidth}
        glow
        colors={{
          circleFill: colors.teal[500],
          circleStroke: "#FFF",
          pathStroke: colors.teal[500],
          rankFill: "#FFF",
        }}
      />
    </motion.g>
  ) : null
}
