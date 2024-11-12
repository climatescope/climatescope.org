import { Box, Stack, Heading, Tooltip, useTheme } from "@chakra-ui/react"
// import { extent, max } from "d3-array"

// import AreaChart from "@components/pages/MarketPage/AreaChart"
// import LineChart from "@components/pages/MarketPage/LineChart"
// import MarketBanner from "@components/pages/MarketPage/MarketBanner"
// import { CheckIcon, CancelIcon } from "@/components/Icon"

export default function RegionalComparisonChart({ title, data, market }) {
  const { colors } = useTheme()
  if (!data) return null
  const { score, items } = data
  const max = 5
  const calculatePosition = (n) => (100 / max) * n

  const ticks = Array(max + 1)
    .fill(0)
    .map((d, i) => d + i)

  return (
    <Stack spacing={5}>
      <Heading as="h4" fontSize="2xl">
        {title}
      </Heading>
      <Box h="5rem" pt="2rem">
        <Box position="relative" h="3rem" w="100%">
          {ticks.map((tick) => {
            return (
              <Box
                key={tick}
                position="absolute"
                bottom="100%"
                w="2.5rem"
                h="2rem"
                textAlign="center"
                transform="translateX(-50%)"
                fontSize="sm"
                fontWeight={600}
                color="gray.500"
                style={{ left: calculatePosition(tick) + "%" }}
              >
                {tick}
              </Box>
            )
          })}

          <Box
            h="3rem"
            w="0.125rem"
            bg="gray.500"
            position="absolute"
            transform="translateX(-50%)"
            style={{ left: calculatePosition(score.average) + "%", top: 0 }}
          />

          {ticks.map((tick) => {
            return (
              <Box
                key={tick}
                h="1rem"
                w="0.125rem"
                bg="gray.200"
                position="absolute"
                transform="translateX(-50%)"
                style={{ left: calculatePosition(tick) + "%", top: "1rem" }}
              />
            )
          })}

          <Box
            position="absolute"
            top="50%"
            left={0}
            right={0}
            h="0.125rem"
            bg="gray.200"
            transform="translateY(-50%)"
          />
          {items.map((item, j) => {
            const isHighlighted = market.iso === item.iso.toLowerCase()
            return (
              <Tooltip
                key={j}
                label={`${item.name} ${item.score}`}
                placement="top"
                hasArrow
              >
                <Box
                  tabIndex={0}
                  h="1.25rem"
                  w="1.25rem"
                  bg="teal.500"
                  border="0.125rem solid #FFF"
                  position="absolute"
                  borderRadius="full"
                  transform="translate(-50%, -50%)"
                  style={{
                    left: calculatePosition(item.score) + "%",
                    top: "50%",
                    opacity: isHighlighted ? 1 : 0.3,
                    background: isHighlighted
                      ? colors.brand[500]
                      : colors.gray[500],
                    zIndex: isHighlighted ? 2 : 1,
                  }}
                >
                  {isHighlighted ? (
                    <Box
                      position="absolute"
                      top="100%"
                      left="50%"
                      transform="translateX(-50%)"
                      fontWeight={600}
                      color="black"
                      whiteSpace="nowrap"
                    >
                      {item.name}
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              </Tooltip>
            )
          })}
        </Box>
      </Box>
    </Stack>
  )
}
