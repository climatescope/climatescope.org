import { useEffect } from "react"
import { Container, SimpleGrid } from "@chakra-ui/react"
import fetchDataset from "@/utils/api/client/fetchDataset"

import ComparisonGeography from "./ComparisonGeography"
import { useGeographyComparisonStore } from "./store"

export default function GeographyComparison({ data }) {
  const isLoaded = useGeographyComparisonStore((state) => state.isLoaded)
  const setInitialData = useGeographyComparisonStore(
    (state) => state.setInitialData
  )
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    fetchDataset(`/data/markets/${data[0].val}.txt`).then((marketData) => {
      setInitialData(data, marketData)
    })
  }, [])

  return (
    <Container>
      <SimpleGrid
        columns={3}
        gridGap="0.0625rem"
        bg="gray.100"
        minH="100vh"
        mb={20}
        mx={-5}
      >
        {isLoaded && (
          <>
            <ComparisonGeography slot={0} />
            <ComparisonGeography slot={1} />
            <ComparisonGeography slot={2} />
          </>
        )}
      </SimpleGrid>
    </Container>
  )
}
