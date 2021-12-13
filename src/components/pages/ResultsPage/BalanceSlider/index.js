import { useState, useCallback, useEffect } from "react"
import { useControllableState } from "@chakra-ui/react"
import { debounce, noop } from "lodash"

import Slider from "./Slider"

const SliderWrapper = ({ value, onChange, delay = 0 }) => {
  const [internalState, setInternalState] = useState([50, 25, 25])

  const onChangeD = useCallback(debounce(onChange || noop, delay), [
    onChange,
    delay,
  ])

  const [internalValue, setInternalValue] = useControllableState({
    value: [internalState[0], internalState[0] + internalState[1]],
    onChange: ([v0, v1]) => {
      setInternalState([v0, v1 - v0, 100 - v1])
      if (onChange) onChangeD([v0, v1 - v0, 100 - v1])
    },
    shouldUpdate: (prev, next) =>
      [prev[0], prev[1] - prev[0], 100 - prev[1]].join("") !== next.join(""),
  })

  useEffect(() => {
    if (!value) return
    const v1 = [value[0], value[0] + value[1]]
    if (v1.join("") === internalValue.join("")) return
    // OR do this(?): if (value.join("") === internalState.join("")) return
    setInternalValue(v1)
  }, [value])

  return <Slider value={internalValue} onChange={setInternalValue} />
}

export default SliderWrapper
