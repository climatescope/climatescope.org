import { Box, Container, Heading, Stack, Text } from "@chakra-ui/layout"
import getConfig from "next/config"
import { useElementSize } from "usehooks-ts"

// import { getServerData } from "@utils/api/server"
import { useClientData } from "@utils/api/client"
import Visualization from "@components/RankingOverTime"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

export default function RankingOverTime() {
  const { data } = useClientData(`${basePath}/data/ranks-over-time.json`)
  const [squareRef, dimensions] = useElementSize()
  const { width } = dimensions
  return (
    <Box>
      <Container ref={squareRef}>
        <Stack spacing={10} pt={10} pb={20}>
          <Heading
            as="h1"
            w="100%"
            fontSize={["3xl", null, "5xl"]}
            maxW="container.sm"
            sx={{
              "h1 + p": {
                fontSize: ["lg", null, "2xl"],
                lineHeight: "short",
                fontWeight: 500,
              },
            }}
          >
            {"Climatescope rank over time"}
          </Heading>
          <Text
            as="p"
            w="100%"
            variant="subtitle"
            maxW="container.sm"
            sx={{
              "a": {
                color: "teal.700",
                _hover: { textDecoration: "underline" },
                _focus: { textDecoration: "underline" },
              },
            }}
          >
            {
              "See how markets have been ranked by Climatescope over time between 2021 and 2023. Color markets by region or market type to visualize trends."
            }
          </Text>
          {data?.length && width && <Visualization data={data} width={width} />}
        </Stack>
      </Container>
    </Box>
  )
}

export async function getStaticProps({ params }) {
  // const resultsData = await getServerData(`public/data/results-2023.json`)
  return { props: {} }
}
