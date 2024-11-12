import React from "react"
import { Box } from "@chakra-ui/react"

import useQuickSearch from "./useQuickSearch"
import QuickSearchInput from "./QuickSearchInput"
import QuickSearchResults from "./QuickSearchResults"
import { QuickSearchProvider } from "./QuickSearchContext"

export default function QuickSearch({
  customOptions = {},
  maxW = "40rem",
  children,
  searchIndex = "lite",
  ...restProps
}) {
  const searchConfig = useQuickSearch({ customOptions, searchIndex })
  return (
    <QuickSearchProvider value={searchConfig}>
      <Box position="relative" w="100%" maxW={maxW} {...restProps}>
        {children || (
          <>
            <QuickSearchInput />
            <QuickSearchResults />
          </>
        )}
      </Box>
    </QuickSearchProvider>
  )
}
