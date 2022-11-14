import { useEffect, useState } from "react"
import { csv } from "d3-fetch"

import LineChart from "@components/pages/MarketPage/LineChart"

export default function SectorLineChart({
  src,
  indicator = "Indicator name",
  unit = "unit",
  precision = 1,
}) {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!src) return
    csv(`/data/sector${src}`).then((d) => {
      const keys = Object.keys(d[0])
      const yearKeys = keys.filter((d) => !isNaN(d)).sort((a, b) => a - b)
      const nameKey = keys.filter((d) => isNaN(d))[0]
      const ddd = {
        indicator,
        subindicators: d.map((dd) => {
          return {
            subindicator: dd[nameKey],
            units: unit,
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
      setData(ddd)
    })
  }, [src])

  if (!data) return null

  return (
    <div>
      <LineChart data={data} compactTooltip={false} />
    </div>
  )
}
