import { useTheme } from "@chakra-ui/react"
import { line } from "d3-shape"

const Line = ({ data, scaleX, scaleY }) => {
  const { colors } = useTheme()

  const lineGenerator = line()
    .x(d => scaleX(d.year))
    .y(d => scaleY(d.value))

  const d = lineGenerator(data)

  return (
    <g>
      <path d={d} fill="none" stroke="#FFF" strokeWidth={4} strokeLinecap="round" />
      <path d={d} fill="none" stroke={colors.teal[600]} strokeWidth={2} strokeLinecap="round" />
    </g>  
  )
}

export default Line
