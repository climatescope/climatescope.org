import { useRef } from "react"
import { Box, Container, Stack } from "@chakra-ui/react"

import InPageNavigation from "@components/pages/MarketPage/InPageNavigation"
import LowCarbonStrategySection from "@components/pages/MarketPage/LowCarbonStrategy"
import PowerSection from "@components/pages/MarketPage/Power"
import TransportSection from "@components/pages/MarketPage/Transport"
import BuildingsSection from "@components/pages/MarketPage/Buildings"
import MarketBanner from "@components/pages/MarketPage/MarketBanner"
import BnefBanner from "@components/pages/IndexPage/BnefBanner"
import ComingSoonSection from "@components/pages/MarketPage/ComingSoonSection"
import { useScroller } from "@utils/useScrollama"

const MarketPage = ({ market, summary, marketCounts }) => {
  const [introCopy, powerCopy, transportCopy, buildingsCopy] =
    market.sectionCopy || []

  const container = useRef()
  useScroller({ container })

  return (
    <>
      <Box as="main" pb={0} minH="75vh">
        <Container>
          <MarketBanner
            market={market}
            summary={summary}
            marketCounts={marketCounts}
          />

          {/* <InPageNavigation
            market={market}
            sections={[introCopy, powerCopy, transportCopy, buildingsCopy]}
          /> */}

          <Stack spacing={10} ref={container}>
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
            {/* {transportCopy && (
              <Box data-scroll-step="true">
                <TransportSection
                  {...transportCopy}
                  similarMarkets={market.similar}
                  market={market}
                />
              </Box>
            )} */}
            {/* {buildingsCopy && (
              <Box data-scroll-step="true">
                <BuildingsSection
                  {...buildingsCopy}
                  similarMarkets={market.similar}
                  market={market}
                />
              </Box>
            )} */}
            <ComingSoonSection />
          </Stack>
          <BnefBanner />
        </Container>
      </Box>
      
    </>
  )
}

export default MarketPage
