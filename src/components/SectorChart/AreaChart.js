import { useEffect, useState } from "react"
import { csv } from "d3-fetch"

import AreaChart from "@components/pages/MarketPage/AreaChart"

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

export default function SectorAreaChart({
  src,
  indicator = "Indicator name",
  labelKey,
  unit,
  precision = 0.1,
  chartNotes = "",
  compactTooltip = false,
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
  }, [src, labelKey])

  if (!data) return null

  return (
    <div>
      <AreaChart
        data={data}
        compactTooltip={compactTooltip}
        precision={precision}
      />
      {chartNotes && (
        <p
          style={{
            fontSize: "0.875rem",
            color: "#778088",
            marginTop: "1.25rem",
          }}
        >
          {chartNotes}
        </p>
      )}
    </div>
  )
}
