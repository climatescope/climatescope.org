import { Box, Grid, Divider, Stack } from "@chakra-ui/react"

import { useClientData } from "@utils/api/client"
import { ReferenceSelect, ReferenceContent } from "./ReferenceMarket"
import { ComparisonSelect, ComparisonContent } from "./ComparisonMarket"

const GeographyComparison = () => {
  const { data } = useClientData("/data/results-2021.json")

  const allMarkets = data || []

  return (
    <Box>
      <Grid
        gridTemplateColumns={[
          "1fr 0.0625rem 1fr",
          null,
          null,
          "1fr 0.0625rem 1fr 0.0625rem 1fr",
        ]}
        gridColumnGap={[3, null, 4, null, 5]}
        gridTemplateRows="9.6875rem auto"
      >
        <Stack spacing={5} gridRow="1 / -1" pb={5}>
          <ReferenceSelect allMarkets={allMarkets} />
          <ReferenceContent allMarkets={allMarkets} />
        </Stack>

        <Divider orientation="vertical" bg="gray.100" gridRow="2 / -1" />

        <Stack spacing={5} gridRow="1 / -1" pb={5}>
          <ComparisonSelect allMarkets={allMarkets} slot={0} />
          <ComparisonContent slot={0} allMarkets={allMarkets} />
        </Stack>

        <Divider
          orientation="vertical"
          bg="gray.100"
          gridRow="2 / -1"
          display={["none", null, null, "block"]}
        />

        <Stack
          spacing={5}
          gridRow="1 / -1"
          pb={5}
          display={["none", null, null, "flex"]}
        >
          <ComparisonSelect allMarkets={allMarkets} slot={1} />
          <ComparisonContent slot={1} allMarkets={allMarkets} />
        </Stack>
      </Grid>
    </Box>
  )
}

export default GeographyComparison
