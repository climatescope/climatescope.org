import { max as d3Max } from "d3-array"
import { Heading, Box, Stack, Text, Center } from "@chakra-ui/react"

export default function Top10Ranking({
  data = {},
  limit,
  barHeight = 10,
  headingFontSize = "lg",
  chartFontSize = "md",
  precision = 0.01,
}) {
  if (!data.name) return null

  const maxVal =
    data?.data[0]?.max_value ||
    d3Max(data?.data || [], (o) => parseFloat(o.value))

  const chartName = (data?.name || "").split("  ")[1]
  const chartTitle = chartName
    ? chartName[0].toUpperCase() + chartName.slice(1)
    : ""

  return (
    <Stack spacing={5}>
      <Heading as="h3" fontSize={headingFontSize}>
        {chartTitle.replace(" 2021", ", 2021")}
      </Heading>
      <Stack spacing={3}>
        {data.data?.slice(0, limit || undefined).map((d, i) => {
          const barLength = (100 / maxVal) * parseFloat(d.value)
          return (
            <Stack key={d.iso} spacing={1}>
              <Text
                fontSize={chartFontSize}
                lineHeight="shorter"
                fontWeight={600}
                color="gray.500"
              >
                {`${i + 1}. ${d.country}`}
              </Text>
              <Box w="100%" bg="gray.50">
                <Box
                  h={barHeight}
                  bg="brand.800"
                  boxShadow="0.125rem 0 0 #FFF"
                  position="relative"
                  style={{ width: `${barLength}%` }}
                  color="brand.800"
                >
                  <Center
                    position="absolute"
                    h={barHeight}
                    top={0}
                    px={2}
                    fontSize="xs"
                    fontWeight={600}
                    whiteSpace="nowrap"
                    style={{
                      right: barLength > 50 ? 0 : "auto",
                      left: barLength > 50 ? "auto" : "100%",
                      color: barLength > 50 ? "#FFFFFF" : "currentcolor",
                    }}
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
                  </Center>
                </Box>
              </Box>
            </Stack>
          )
        })}
      </Stack>
    </Stack>
  )
}
