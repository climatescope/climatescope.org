import { useEffect } from "react"
import { Stack } from "@chakra-ui/react"

import Selectors from "./Selectors"
import Filters from "./Filters"
import Visual from "./Visual"
import fetchDataset from "@/utils/api/client/fetchDataset"
import { useStore } from "./store"

export default function CapGenTool() {
  const setInitialData = useStore((state) => state.setInitialData)

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    Promise.all([
      fetchDataset("/data/capacity-generation.txt", "json"),
      fetchDataset("/data/augmented-geographies.txt", "json")  
    ]).then(([capgenData, geographiesData]) => {
      setInitialData(capgenData, geographiesData)
    })
  })

  return (
    <Stack spacing={0}>
      <Selectors />
      <Filters />
      <Visual />
    </Stack>
  )
}
