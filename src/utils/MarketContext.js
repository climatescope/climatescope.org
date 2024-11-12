import { createContext, useContext } from "react"

export const MarketContext = createContext({
  slug: "",
  frontmatter: {},
  data: {},
})
export const MarketProvider = MarketContext.Provider

export const useMarketContext = () => {
  return useContext(MarketContext)
}
