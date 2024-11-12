import { useState, useEffect } from "react"
import { useCombobox } from "downshift"
import { matchSorter } from "match-sorter"
import { useRouter } from "next/navigation"
import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"

import fetchDataset from "@/utils/api/client/fetchDataset"

export default function useQuickSearch({
  customOptions = {},
  searchIndex = "lite",
}) {
  const [referenceItems, setReferenceItems] = useState([])
  const [inputItems, setInputItems] = useState([])

  const router = useRouter()

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges
    const hasSelectedItem = !!changes.selectedItem

    switch (type) {
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
        if (hasSelectedItem) router.push(changes.selectedItem.href || "/")

        const results = matchSorter(referenceItems, changes.inputValue, {
          keys: ["label", "type", "content"],
          threshold: matchSorter.rankings.STARTS_WITH,
        })

        if (results.length) router.push(results[0]?.href || "/")

        // Reset changes
        // changes.inputValue = inputValue
        // changes.selectedItem = null

        return changes
      case useCombobox.stateChangeTypes.ItemClick:
        router.push(changes.selectedItem.href || "/")

        // Reset changes
        // changes.inputValue = inputValue
        // changes.selectedItem = null

        return changes
      default:
        return changes // otherwise business as usual.
    }
  }

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString: (d) => d.label,
    stateReducer,
    onInputValueChange: ({ inputValue }) => {
      const results = matchSorter(referenceItems, inputValue, {
        keys: ["label", "type", "content"],
        threshold: matchSorter.rankings.CONTAINS,
      })
      setInputItems(results)
    },
    ...customOptions,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const searchIndices = {
      lite: "/data/search-index-lite.txt",
      full: "/data/search-index-full.txt",
    }

    const searchIndexUrl = searchIndices[searchIndex] || searchIndices.lite

    Promise.all([fetchDataset(searchIndexUrl, "json")]).then(
      ([correctedSearchIndex]) => {
        setReferenceItems(correctedSearchIndex)
        setInputItems(correctedSearchIndex)

        const results = matchSorter(correctedSearchIndex, "", {
          keys: ["label", "type", "content"],
          threshold: matchSorter.rankings.CONTAINS,
        })

        setInputItems(results)
      }
    )
  }, [searchIndex])

  return {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputItems,
    setInputItems,
    referenceItems,
    setReferenceItems,
    searchIndex,
  }
}
