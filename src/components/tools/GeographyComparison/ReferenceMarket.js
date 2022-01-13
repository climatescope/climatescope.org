import { useEffect } from "react"
import { Select } from "@chakra-ui/react"
import { useRouter } from "next/router"

import useStore from "@utils/store/geographyComparisonStore"
import Content from "./Content"

export const ReferenceSelect = ({ allMarkets }) => {
  const router = useRouter()
  const currentMarket = useStore((state) => state.currentMarket)
  const setCurrentMarket = useStore((state) => state.setCurrentMarket)

  const { market } = router.query

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!market && currentMarket.iso) return
    setCurrentMarket(market)
  }, [market])

  const handleChange = (e) => {
    router.replace("/tools/geography-comparison")
    setCurrentMarket(e.target.value)
  }

  const iso = currentMarket.iso || ""

  return (
    <Select
      size="lg"
      variant="filled"
      colorScheme="gray"
      fontWeight={600}
      bg="gray.50"
      _focus={{ boxShadow: "outline" }}
      value={iso}
      onChange={handleChange}
    >
      {allMarkets.map(({ iso, name }) => {
        return (
          <option key={iso} value={iso}>
            {name}
          </option>
        )
      })}
    </Select>
  )
}

export const ReferenceContent = ({ allMarkets }) => {
  const market = useStore((state) => state.currentMarket)
  return <Content market={market} allMarkets={allMarkets} slot="reference" />
}
