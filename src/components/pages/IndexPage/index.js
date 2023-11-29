import { Box, Container, Stack } from "@chakra-ui/layout"

import Banner from "@components/pages/IndexPage/Banner"
import Sectors from "@components/pages/IndexPage/Sectors"
import GlobePreview from "@components/pages/IndexPage/GlobePreview"
import Tools from "@components/pages/IndexPage/Tools"
import BnefBanner from "@components/pages/IndexPage/BnefBanner"

// import TechnologiesMap from "@components/pages/IndexPage/TechnologiesMap"
import MiniGlobes from "@components/pages/IndexPage/MiniGlobes"

const IndexPage = ({
  globeInsights,
  metaData,
  allTools,
  miniGlobesData,
}) => {
  return (
    <Box as="main" minH="75vh">
      <Container>
        <Stack spacing={24}>
          <Banner />
          <GlobePreview globeInsights={globeInsights} />
          <Sectors metaData={metaData} />
          {/* <TechnologiesMap /> */}
          <MiniGlobes data={miniGlobesData} />
          <Tools allTools={allTools} />
          <BnefBanner />
        </Stack>
      </Container>
    </Box>
  )
}

export default IndexPage
