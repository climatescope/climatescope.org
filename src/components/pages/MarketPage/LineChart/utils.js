import { useCallback, useMemo } from "react"
import { extent } from "d3-array"
import { scaleLinear, scaleBand } from "d3-scale"

export function useChart({ width, height }) {
  return {
    viewBox: `0 0 ${width} ${height}`,
  }
}

export function useExtent(data, val, defaultValue) {
  return useMemo(() =>
    // extent(data, cb) // Would "cb" need to "useCallback"?
    defaultValue || extent(data, o => o[val])
  , [data, val, defaultValue])
}

const scales = {
  linear: scaleLinear,
  band: scaleBand,
}

export function useScale({ type = "linear", domain, range, padding = [0, 0] }) {
  const scale = scales[type]
  const isRegular = range[0] <= range[1]
  return useCallback(scale()
    .domain(domain)
    .range([
      isRegular ? range[0] + padding[0] : range[0] - padding[0],
      isRegular ? range[1] - padding[1] : range[1] + padding[1],
    ])
  , [domain, range, type, padding])
}

export function useAxis({ scale, ticks = 6 }) {
  return useMemo(() => scale
    .nice()
    .ticks(ticks)
    .map(value => ({
      value,
      offset: scale(value),
      line: {},
    }))
  , [scale])
}
