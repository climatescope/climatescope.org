import React, { forwardRef } from "react"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

import { SearchIcon } from "@/components/Icon"
import { useQuickSearchContext } from "./QuickSearchContext"

const QuickSearchInput = forwardRef(({ bg = "white", ...restProps }, ref) => {
  const { getInputProps } = useQuickSearchContext()
  return (
    <InputGroup bg={bg} size="lg" {...restProps}>
      <InputLeftElement h={14}>
        <SearchIcon />
      </InputLeftElement>
      <Input
        ref={ref}
        h={14}
        placeholder="Search for a market"
        _placeholder={{ color: "gray.500" }}
        _focusVisible={{
          bg: "white",
          color: "black",
          borderColor: "black",
          outline: "0.0625rem solid",
          outlineColor: "black",
          outlineOffset: "0",
        }}
        {...getInputProps()}
      />
    </InputGroup>
  )
})

export default QuickSearchInput
