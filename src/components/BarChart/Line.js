import { useTheme } from "@chakra-ui/react"

const Line = ({ data, scaleX, scaleY, subindicator }) => {
  const { colors } = useTheme()
  const barColor = colors.indicators[subindicator] || colors.teal[600]
  return (
    <g>
      {data.map((d) => {
        const x = scaleX(d.year)
        const y1 = scaleY(d.value)
        const y2 = scaleY(0)
        return (
          <line
            key={d.year}
            x1={x}
            x2={x}
            y1={y1}
            y2={y2}
            stroke={barColor}
            strokeWidth={20}
          />
        )
      })}
    </g>
  )
}

export default Line
