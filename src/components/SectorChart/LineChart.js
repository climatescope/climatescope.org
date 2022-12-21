import { useEffect, useState } from "react"
import { csv } from "d3-fetch"

import LineChart from "@components/pages/MarketPage/LineChart"

function processData(d, indicator, labelKey, unit, precision) {
  const keys = Object.keys(d[0])
  const yearKeys = keys.filter((d) => !isNaN(d)).sort((a, b) => a - b)
  const nameKey = labelKey || keys.filter((d) => isNaN(d))[0]
  return {
    indicator,
    subindicators: d.map((dd) => {
      return {
        subindicator: dd[nameKey],
        units: unit || dd.unit || "",
        data: yearKeys.map((year) => ({
          color: dd[nameKey],
          year: parseInt(year),
          value:
            Math.round(parseFloat(dd[year]) * (1 / precision)) /
            (1 / precision),
        })),
      }
    }),
  }
}

export default function SectorLineChart({
  src,
  indicator = "Indicator name",
  labelKey,
  unit,
  precision = 1,
  preprocessData,
}) {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!src) return
    csv(`/data/sector${src}`).then((d) => {
      const preprocessed = preprocessData ? preprocessData(d) : d
      setData(processData(preprocessed, indicator, labelKey, unit, precision))
    })
  }, [src])

  if (!data) return null

  return (
    <div>
      <LineChart data={data} compactTooltip={false} />
    </div>
  )
}
