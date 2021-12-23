import { Select } from "@chakra-ui/react"

import useStore from "@utils/store/geographyComparisonStore"
import Content from "./Content"

export const ComparisonSelect = ({ allMarkets, slot = 0 }) => {
  const currentMarket = useStore((state) => state.currentMarket)
  const comparisonMarkets = useStore((state) => state.comparisonMarkets)
  const comparisonMarket = comparisonMarkets[slot]
  const setComparisonMarkets = useStore((state) => state.setComparisonMarkets)

  const iso = comparisonMarket.iso || ""

  const handleChange = (e) => {
    setComparisonMarkets(e.target.value, slot)
  }

  const isDisabled = slot ? !comparisonMarkets[0].name : !currentMarket.name

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
      isDisabled={isDisabled}
    >
      <option value="">{"Select a market"}</option>
      {currentMarket.similar && (
        <optgroup label="Suggested markets">
          {currentMarket.similar.map(({ iso, name }) => {
            return (
              <option key={iso} value={iso}>
                {name}
              </option>
            )
          })}
        </optgroup>
      )}
      <optgroup label="All markets">
        {allMarkets.map(({ iso, name }) => {
          return (
            <option key={iso} value={iso}>
              {name}
            </option>
          )
        })}
      </optgroup>
    </Select>
  )
}

export const ComparisonContent = ({ allMarkets, slot = 0 }) => {
  const market = useStore((state) => state.comparisonMarkets[slot])
  return <Content market={market} allMarkets={allMarkets} slot={slot} />
}
