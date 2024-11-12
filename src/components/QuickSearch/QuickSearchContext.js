import { createContext, useContext } from "react"

export const QuickSearchContext = createContext({})

export const QuickSearchProvider = QuickSearchContext.Provider

export const useQuickSearchContext = () => {
  const quickSearchContext = useContext(QuickSearchContext)
  return quickSearchContext
}
