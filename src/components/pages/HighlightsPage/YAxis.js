import { AnimatePresence, motion } from "framer-motion"

import animationConfig from "./animationConfig"
import useHighlightsStore from "@utils/store/highlightsStore"

export default function YAxis({ xScale, yTicks, xTicks, yScale }) {
  const x1 = xScale(xTicks[0])
  const x2 = xScale(xTicks.slice(-1)[0])
  const currentSlide = useHighlightsStore((state) => state.currentSlide)
  const showAxis = parseInt(currentSlide) < 8
  return (
    <g>
      <AnimatePresence mode="wait">
        {showAxis && (
          <motion.g
            key={`labels-${yTicks.slice(-1)[0]}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={animationConfig}
          >
            {yTicks.map((tick, i) => {
              const y = yScale(tick)
              const isLast = i === yTicks.length - 1
              return (
                <text
                  key={tick}
                  x={x1}
                  y={y - 4}
                  fontSize={14}
                  fontWeight={600}
                >
                  {tick / 1000}
                  {isLast ? " USD Bn" : ""}
                </text>
              )
            })}
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAxis && yTicks.map((tick) => {
          const y = yScale(tick)
          return (
            <motion.line
              key={tick}
              x1={x1}
              x2={x2}
              y1={y}
              y2={y}
              stroke="#DDDDDD"
              strokeDasharray={[2, 1]}
              initial={{
                y1: yScale(yTicks[0]),
                y2: yScale(yTicks[0]),
                opacity: 0,
              }}
              animate={{ y1: y, y2: y, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={animationConfig}
            />
          )
        })}
      </AnimatePresence>
    </g>
  )
}