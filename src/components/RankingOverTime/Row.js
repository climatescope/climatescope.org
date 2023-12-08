import { useMemo } from "react"
import { useRouter } from "next/router"
import { Text } from "@visx/text"

import { useStore } from "@components/RankingOverTime/store"

const usePoints = ({ d, width, rowHeight }) => {
  return useMemo(() => {
    const ranks = ["2021", "2022", "2023"].map((y) => d[y])
    const points = ranks
      .map((rank, j) => {
        const x = j * (width / 2.5) + rowHeight / 2 || 0
        const y = (rank - 1) * rowHeight + rowHeight / 2 || 0
        return { rank, x, y }
      })
      .filter((p) => p.rank)
    const path = "M" + points.map((p) => `${p.x},${p.y}`).join("L")
    return { points, path }
  }, [d, width, rowHeight])
}

const names = {
  bh: "Bahrain",
  ve: "Venezuela",
  is: "Iceland",
  me: "Montenegro",
}

function Row({
  d,
  width,
  rowHeight,
  glow = false,
  colors = {
    circleFill: "#DDD",
    circleStroke: "#FFF",
    pathStroke: "#999",
    rankFill: "#333",
  },
}) {
  const router = useRouter()
  const setHighlighted = useStore((state) => state.setHighlighted)

  const { points, path } = usePoints({ d, width, rowHeight })

  const handleMouseEnter = () => setHighlighted(d)
  const handleMouseLeave = () => setHighlighted(null)

  const lastPoint = points.slice(-1)[0]

  const handleGeographyClick = () => {
    router.push(`/markets/${d.iso}`)
  }

  return (
    <g
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ userSelect: "none" }}
    >
      <path d={path} fill="none" stroke="#FFF" strokeWidth={3} />
      <path
        d={path}
        fill="none"
        stroke={glow ? colors.pathStroke : "transparent"}
        strokeWidth={12}
        opacity={0.3}
      />
      <path d={path} fill="none" stroke={colors.pathStroke} strokeWidth={2} />
      {points.map(({ rank, x, y }, j) => (
        <g key={j} transform={`translate(${x} ${y})`}>
          <circle
            r={rowHeight / 2 - 5}
            fill={colors.circleFill}
            stroke={colors.circleStroke}
            strokeWidth={4}
            paintOrder="stroke fill"
          />
          <text
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize={12}
            fontWeight={600}
            fill={colors.rankFill}
          >
            {rank}
          </text>
        </g>
      ))}
      <Text
        y={lastPoint.y}
        x={lastPoint.x + rowHeight / 2 + 8}
        width={width - (lastPoint.x + rowHeight / 2 + 8)}
        verticalAnchor="middle"
        fontWeight={600}
        tabIndex={0}
        style={{ cursor: "pointer", outline: "none" }}
        onClick={handleGeographyClick}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {d.geography || names[d.iso] || ""}
      </Text>
    </g>
  )
}

export default Row
