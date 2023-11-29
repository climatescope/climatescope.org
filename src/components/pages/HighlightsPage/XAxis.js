import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "@chakra-ui/system"

import animationConfig from "./animationConfig"
import useHighlightsStore from "@utils/store/highlightsStore"

export default function XAxis({ xScale, yTicks, xTicks, yScale }) {
  const { colors } = useTheme()
  const currentSlide = useHighlightsStore((state) => state.currentSlide)
  return (
    <AnimatePresence>
      {parseInt(currentSlide) < 7 && (
        <motion.g
          intial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={animationConfig}
        >
          <line
            x1={xScale(xTicks[0])}
            x2={xScale(xTicks.slice(-1)[0])}
            y1={yScale(yTicks[0])}
            y2={yScale(yTicks[0])}
            stroke={colors.gray[300]}
          />
          {xTicks.slice(1).map((tick) => {
            return (
              <text
                key={tick}
                x={xScale(tick)}
                y={yScale(yTicks[0]) + 10}
                alignmentBaseline="hanging"
                textAnchor="middle"
                fontSize={14}
                fontWeight={600}
                fill={colors.gray[800]}
              >
                {tick}
              </text>
            )
          })}
        </motion.g>
      )}
    </AnimatePresence>
  )
}
