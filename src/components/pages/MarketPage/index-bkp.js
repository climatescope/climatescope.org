import { useRef } from "react"
import {
  Box,
  Center,
  Container,
  Stack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react"

import InPageNavigation from "@components/pages/MarketPage/InPageNavigation"
import LowCarbonStrategySection from "@components/pages/MarketPage/LowCarbonStrategy"
import PowerSection from "@components/pages/MarketPage/Power"
import TransportSection from "@components/pages/MarketPage/Transport"
import BuildingsSection from "@components/pages/MarketPage/Buildings"
import MarketBanner from "@components/pages/MarketPage/MarketBanner"
import BnefBanner from "@components/pages/IndexPage/BnefBanner"
import { useScroller } from "@utils/useScrollama"

const content = [
  {
    type: "section",
    title: "Overview",
    items: [
      {
        type: "section",
        title: "",
        items: [
          {
            type: "text",
            text: [
              "Chile has a cumulative score of 2.19. This puts it at rank 4 among emerging markets, and rank 22 among all markets in the climatescope ranking. Within the power ranking Chile is ranked as 1, with a score of 2.58. In the transport ranking, Chile has a score of 1.84 putting it at rank 4.",
              "Over the past 3 years, Chile has improved in the rankings, increasing its score from XX in 2020, to YY in 2023.",
              "Here we could compare to how the region or type of market have changed in the past three years. This could tell us whether this market performs better or worse than the average change.",
            ],
          },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "Power",
    items: [
      {
        type: "section",
        title: "Power policy",
        items: [
          {
            type: "text",
            text: [
              "Summary of the power policies chart below, focusing on policy categories represented and development from last year.",
            ],
          },
          { type: "chart", title: "Power policies (multi boxes)" },
        ],
      },
      {
        type: "section",
        title: "Power prices and costs",
        items: [
          {
            type: "text",
            text: [
              "Summary of the electricity prices chart below, focused on price development over the past years.",
            ],
          },
          { type: "chart", title: "Electricty prices (line)" },
        ],
      },
      {
        type: "section",
        title: "Power market",
        items: [
          {
            type: "text",
            text: [
              "Summary of installed capacity and the trends in installed capacity in the market.",
              "Summary of electricity generation and the tendencies there.",
            ],
          },
          { type: "chart", title: "Installed capacity (line)" },
          { type: "chart", title: "Electricity generation (line)" },
          { type: "text", text: ["Summary of the investment chart below."] },
          { type: "chart", title: "Investment (line)" },
          { type: "text", text: ["Notes on utility privatisation."] },
          { type: "chart", title: "Utility privatisation (multi boxes)" },
          { type: "text", text: ["Notes on the wholesale power market."] },
          { type: "chart", title: "Wholesale power market (yes/no boxes)" },
          { type: "text", text: ["Notes on the currency of PPAs"] },
          { type: "chart", title: "Currency of PPAs (yes/no boxes)" },
          { type: "text", text: ["Notes on bilateral power contracts."] },
          { type: "chart", title: "Bilateral power contracts (yes/no boxes)" },
          { type: "text", text: ["Notes on fossil fuel subsidies."] },
          {
            type: "chart",
            title: "Fossil fuel price distortions - Subsidies (yes/no boxes)",
          },
          { type: "text", text: ["Notes on fossil fuel taxes."] },
          {
            type: "chart",
            title: "Fossil fuel price distortions - Taxes (yes/no boxes)",
          },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "Transport",
    items: [
      {
        type: "section",
        title: "EV market",
        items: [
          {
            type: "text",
            text: [
              "Overview of EV market. Is there anything data-driven here?",
            ],
          },
        ],
      },
      {
        type: "section",
        title: "EV policy",
        items: [
          { type: "text", text: ["Summary of transport policies chart."] },
          { type: "chart", title: "Transport policies (multi boxes)" },
          { type: "text", text: ["Notes on fuel economy standards.."] },
          { type: "chart", title: "Fuel economy standards (yes/no boxes)" },
        ],
      },
    ],
  },
]

function Section({ title, items, ...restProps }) {
  return (
    <SimpleGrid columns={8} spacing={5} {...restProps}>
      {title && (
        <Heading
          as="h2"
          fontSize="4xl"
          gridColumn={["1 / -1", null, null, "2 / span 5"]}
        >
          {title}
        </Heading>
      )}

      {items.map((item) => (
        <SubSection key={item.title} {...item} />
      ))}
    </SimpleGrid>
  )
}

function SubSection({ title, items, ...restProps }) {
  return (
    <SimpleGrid
      columns={8}
      gridRowGap={3}
      key={title}
      gridColumn="1 / -1"
      {...restProps}
    >
      {title && (
        <Heading
          as="h3"
          fontSize="2xl"
          gridColumn={["1 / -1", null, null, "2 / span 5"]}
        >
          {title}
        </Heading>
      )}

      {items.map((content, key) => {
        switch (content.type) {
          case "chart":
            return (
              <Center
                key={key}
                bg="gray.100"
                py={5}
                gridColumn={["1 / -1", null, null, "2 / span 5"]}
              >
                <Heading as="h4" fontSize="xl">
                  {`Chart: ${content.title}`}
                </Heading>
              </Center>
            )
          default:
            return content.text.map((content, i) => (
              <Text
                fontSize="lg"
                key={i}
                gridColumn={["1 / -1", null, null, "2 / span 5"]}
              >
                {content}
              </Text>
            ))
        }
      })}
    </SimpleGrid>
  )
}

const MarketPage = ({ market, summary, marketCounts }) => {
  const [introCopy, powerCopy, transportCopy, buildingsCopy] =
    market.sectionCopy || []

  const container = useRef()
  useScroller({ container })

  // TODO: Remove this...
  introCopy.title = "Overview"

  return (
    <>
      <Box as="main" pb={0} minH="75vh">
        <Container>
          <MarketBanner
            market={market}
            summary={summary}
            marketCounts={marketCounts}
          />

          <InPageNavigation
            market={market}
            sections={[
              introCopy,
              powerCopy,
              transportCopy,
              // buildingsCopy,
            ]}
          />

          <Stack
            spacing={10}
            pt={[10, null, 20]}
            pb={[10, null, 20]}
            borderBottom="0.0625rem solid"
            borderColor="gray.200"
          >
            {content.map((item) => {
              return (
                <Section key={item.title} data-scroll-step="true" {...item} />
              )
            })}
          </Stack>

          <Stack
            spacing={10}
            ref={container}
            pt={[10, null, 20]}
            style={{ display: "flex" }}
          >
            {introCopy && (
              <Box data-scroll-step="true">
                <LowCarbonStrategySection
                  {...introCopy}
                  similarMarkets={market.similar}
                />
              </Box>
            )}
            {powerCopy && (
              <Box data-scroll-step="true">
                <PowerSection
                  {...powerCopy}
                  similarMarkets={market.similar}
                  market={market}
                />
              </Box>
            )}
            {transportCopy && (
              <Box data-scroll-step="true">
                <TransportSection
                  {...transportCopy}
                  similarMarkets={market.similar}
                  market={market}
                />
              </Box>
            )}
            {buildingsCopy && (
              <Box data-scroll-step="true">
                <BuildingsSection
                  {...buildingsCopy}
                  similarMarkets={market.similar}
                  market={market}
                />
              </Box>
            )}
          </Stack>

          <BnefBanner />
        </Container>
      </Box>
    </>
  )
}

export default MarketPage
