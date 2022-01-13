import { Box, Container, Stack } from "@chakra-ui/react"

import Banner from "@components/pages/IndexPage/Banner"
import Sectors from "@components/pages/IndexPage/Sectors"
import Themes from "@components/pages/IndexPage/Themes"
import Markets from "@components/pages/IndexPage/Markets"
import GlobePreview from "@components/pages/IndexPage/GlobePreview"
import Tools from "@components/pages/IndexPage/Tools"
import BnefBanner from "@components/pages/IndexPage/BnefBanner"

const IndexPage = ({
  globeInsights,
  spotlightMarkets,
  metaData,
  allTools,
}) => {
  return (
    <Box as="main" minH="75vh">
      <Container>
        <Stack spacing={24}>
          <Banner />
          <GlobePreview globeInsights={globeInsights} />
          <Sectors metaData={metaData} />
          <Tools allTools={allTools} />
          <Themes />
          <Markets
            markets={spotlightMarkets}
            metaData={metaData}
          />
          <BnefBanner />
        </Stack>
      </Container>
    </Box>
  )
}

export default IndexPage
