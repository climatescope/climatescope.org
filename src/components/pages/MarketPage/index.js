import {
  Box,
  Center,
  Container,
  Stack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/layout"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import { Tooltip } from "@chakra-ui/tooltip"
import { useTheme } from "@chakra-ui/system"
import { extent, max } from "d3-array"

import AreaChart from "@components/pages/MarketPage/AreaChart"
import LineChart from "@components/pages/MarketPage/LineChart"
import MarketBanner from "@components/pages/MarketPage/MarketBanner"
import { CheckIcon, CancelIcon } from "@components/Icon"

function RegionalComparisonChart({ title, data, market }) {
  const { colors } = useTheme()
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
                      ? colors.teal[500]
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
                      color="teal.500"
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

function Section({ item, market }) {
  const { colors } = useTheme()
  switch (item.type) {
    case "text":
      const paragraphs = item.text.map((d) => [d].flat().join(""))
      return (
        <Stack spacing={10} gridColumn={["1 / -1", null, "2 / -3"]}>
          {paragraphs.map((paragraph, i) => (
            <Text key={i}>{paragraph}</Text>
          ))}
        </Stack>
      )
    case "chart-regional-comparison":
      return (
        <Box gridColumn={["1 / -1", null, "2 / -2"]}>
          <RegionalComparisonChart
            title={item.title}
            data={item.data}
            market={market}
          />
        </Box>
      )
    case "chart-line":
      return (
        <Box gridColumn={["1 / -1", null, "2 / -2"]}>
          <LineChart
            data={{ indicator: item.title, subindicators: item.data }}
            domainX={extent(
              item.data.flatMap((d) => d.data),
              (o) => o.year
            )}
            domainY={[
              0,
              max(
                item.data.flatMap((d) => d.data),
                (o) => o.value
              ),
            ]}
            market={market}
          />
        </Box>
      )
    case "chart-area":
      const maxValue = max(
        item.data[0].data.map((d, i) => {
          const sum = item.data
            .slice(1)
            .map((d) => d.data[i])
            .reduce((acc, cur) => acc + parseFloat(cur.value), 0)
          return { year: d.year, value: d.value + sum }
        }),
        (o) => o.value
      )
      return (
        <Box gridColumn={["span 8", null, "span 4"]}>
          <AreaChart
            data={{ indicator: item.title, subindicators: item.data }}
            domainX={[2013, 2022]}
            domainY={[0, maxValue]}
            market={market}
            downloadable={true}
          />
        </Box>
      )
    case "chart-boolean":
      return !item.data.isBoolean ? (
        <Stack spacing={6} gridColumn={["1 / -1", null, "2 / -2"]}>
          <Heading as="h4" fontSize="2xl">
            {item.title}
          </Heading>
          <Text>{item.data.question}</Text>
          <SimpleGrid
            columns={[1, null, null, 3]}
            w="100%"
            gridColumnGap={6}
            gridRowGap={6}
          >
            {[
              { key: 1, label: item.data.q1, value: item.data.a1 },
              { key: 2, label: item.data.q2, value: item.data.a2 },
              { key: 3, label: item.data.q3, value: item.data.a3 },
            ].map((d) => {
              return d.value ? (
                <Box
                  key={d.label}
                  p={3}
                  bg="purple.100"
                  border="0.125rem solid"
                  borderColor="purple.500"
                  borderRadius="md"
                  color="purple.900"
                  fontWeight={500}
                >
                  {d.label}
                  <VisuallyHidden>{": Yes"}</VisuallyHidden>
                </Box>
              ) : (
                <Box
                  key={d.label}
                  p={3}
                  bg="gray.50"
                  color="gray.500"
                  borderRadius="md"
                  fontWeight={500}
                >
                  {d.label}
                  <VisuallyHidden>{": No"}</VisuallyHidden>
                </Box>
              )
            })}
          </SimpleGrid>
        </Stack>
      ) : (
        <SimpleGrid
          columns={8}
          gridColumn={["1 / -1", null, null, null, "2 / -2"]}
          gridRowGap={4}
        >
          <Box gridColumn="span 2" px={3} display={["none", null, "inline"]}>
            <Text
              fontWeight={600}
              fontSize={["xs", null, "sm"]}
              textTransform="uppercase"
            >
              {"Type"}
            </Text>
          </Box>
          <Box gridColumn={["span 5", null, "span 3"]} px={3}>
            <Text
              fontWeight={600}
              fontSize={["xs", null, "sm"]}
              textTransform="uppercase"
            >
              {"Question"}
            </Text>
          </Box>
          <Box
            gridColumn={["span 3", null, "7 / -1"]}
            px={3}
            textAlign={["right", null, "center"]}
          >
            <Text
              fontWeight={600}
              // display={["none", null, "inline"]}
              fontSize={["xs", null, "sm"]}
              textTransform="uppercase"
            >
              {"Availability"}
            </Text>
          </Box>
          <SimpleGrid
            columns={8}
            gridColumn="1 / -1"
            border="0.125rem solid"
            borderRadius="md"
            py={4}
            style={{
              background: item.data.a1 ? colors.teal[100] : colors.gray[50],
              borderColor: item.data.a1 ? colors.teal[500] : colors.gray[50],
              color: item.data.a1 ? colors.teal[900] : colors.gray[500],
            }}
          >
            <Box
              gridColumn="span 2"
              px={3}
              display={["none", null, "inline"]}
              fontWeight={500}
              fontSize={["sm", null, "md"]}
              lineHeight="short"
            >
              <Heading as="h4">{item.title}</Heading>
            </Box>
            <Box
              gridColumn={["span 7", null, "span 4"]}
              px={3}
              fontWeight={500}
              fontSize={["sm", null, "md"]}
              lineHeight="short"
            >
              <Text lineHeight="short">{item.data.question}</Text>
            </Box>
            <Center
              gridColumn={["span 1", null, "7 / -1"]}
              fontWeight={500}
              px={[0, null, 3]}
              pr={[3, null, 3]}
              justifySelf={["flex-end", null, "center"]}
            >
              {item.data.a1 ? (
                <Center
                  w="2rem"
                  h="2rem"
                  bg="teal.500"
                  color="white"
                  borderRadius="full"
                >
                  <VisuallyHidden>{"Yes"}</VisuallyHidden>
                  <CheckIcon />
                </Center>
              ) : (
                <Center w="2rem" h="2rem" bg="gray.200" borderRadius="full">
                  <VisuallyHidden>{"No"}</VisuallyHidden>
                  <CancelIcon />
                </Center>
              )}
            </Center>
          </SimpleGrid>
        </SimpleGrid>
      )
    case "chart-multibox":
      return (
        <Stack spacing={6} gridColumn={["1 / -1", null, "2 / -2"]}>
          <Heading as="h4" fontSize="2xl">
            {item.title}
          </Heading>
          <SimpleGrid
            columns={[1, null, 3]}
            w="100%"
            gridColumnGap={6}
            gridRowGap={6}
          >
            {item.data.map((d) => {
              return d.answer ? (
                <Box
                  key={d.policy}
                  p={3}
                  bg="purple.100"
                  border="0.125rem solid"
                  borderColor="purple.500"
                  borderRadius="md"
                  color="purple.900"
                  fontWeight={500}
                >
                  {d.policy}
                </Box>
              ) : (
                <Box
                  key={d.policy}
                  p={3}
                  bg="gray.50"
                  color="gray.500"
                  borderRadius="md"
                  fontWeight={500}
                >
                  {d.policy}
                </Box>
              )
            })}
          </SimpleGrid>
        </Stack>
      )

    default:
      const fontSize = { h2: "4xl", h3: "3xl", h4: "2xl" }[item.level || "h2"]
      return (
        <SimpleGrid columns={8} gridColumn="1 / -1">
          <Heading
            as={item.level}
            fontSize={fontSize}
            gridColumn={["1 / -1", null, "2 / -2"]}
          >
            {item.title}
          </Heading>
          {item.items?.map((item, i) => {
            return <Section key={i} item={item} market={market} />
          })}
        </SimpleGrid>
      )
  }
}

export default function MarketPage({ market }) {
  return (
    <Box as="main" pb={0} minH="75vh">
      <Container>
        <MarketBanner market={market} summary={market.summary || ""} />

        {/* <InPageNavigation
            market={market}
            sections={[
              introCopy,
              powerCopy,
              transportCopy,
              // buildingsCopy,
            ]}
          /> */}

        <SimpleGrid
          columns={8}
          pt={[10, null, 20]}
          pb={[10, null, 20]}
          borderBottom="0.0625rem solid"
          borderColor="gray.200"
        >
          {market.sections.map((section, i) => {
            return <Section key={i} item={section} market={market} />
          })}
        </SimpleGrid>

        {/* <Stack
          spacing={10}
          pt={[10, null, 20]}
          pb={[10, null, 20]}
          borderBottom="0.0625rem solid"
          borderColor="gray.200"
        >
          {market.sections.map((section, i) => {
            return <Section key={i} item={section} />
          })}
        </Stack> */}
      </Container>
    </Box>
  )
}
