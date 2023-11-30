import { Box, Center, Container } from "@chakra-ui/layout"
import getConfig from "next/config"
import {
  ComposableMap,
  Marker,
  Geographies,
  Geography,
} from "react-simple-maps"
import { scaleSqrt } from "d3-scale"

import { useClientData } from "@utils/api/client"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

const dataUrl = `${basePath}/data/areas-by-geography.json`

export default function AreasByGeography() {
  const { data, error } = useClientData(dataUrl)
  if (error) return <div>{"No data"}</div>

  const sizeScale = scaleSqrt().domain([1, 175000000]).range([1, 100])

  return (
    <Container pb={24}>
      <Center h="100vh" bg="gray.100">
        <Box bg="white" w="100%">
          <ComposableMap width={800} height={500}>
            {data?.map((geo) => {
              return (
                <Marker key={geo.iso} coordinates={[geo.lon, geo.lat]}>
                  <circle r={sizeScale(geo.area)} />
                </Marker>
              )
            })}
          </ComposableMap>
        </Box>
      </Center>
    </Container>
  )
}
