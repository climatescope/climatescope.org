export default function XAxis({ xScale, yTicks, xTicks, yScale }) {
  return (
    <g>
      <line
        x1={xScale(xTicks[0])}
        x2={xScale(xTicks.slice(-1)[0])}
        y1={yScale(yTicks[0])}
        y2={yScale(yTicks[0])}
        stroke="#000"
      />
      {xTicks.slice(1).map((tick) => {
        return (
          <text
            key={tick}
            x={xScale(tick)}
            y={yScale(yTicks[0]) + 10}
            alignmentBaseline="hanging"
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
          >
            {tick}
          </text>
        )
      })}
    </g>
  )
}