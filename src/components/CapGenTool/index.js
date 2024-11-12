import { Stack } from "@chakra-ui/react"

import Selectors from "./Selectors"
import Filters from "./Filters"
import Visual from "./Visual"

export default function CapGenTool() {
  return (
    <Stack spacing={0}>
      <Selectors />
      <Filters />
      <Visual />
    </Stack>
  )
}
