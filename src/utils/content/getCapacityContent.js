import _uniqBy from "lodash/uniqBy"
import _sortBy from "lodash/sortBy"

export default function getCapacitySummary({ data, objective, measure = "capacity installed" }) {
  const parsedData = data.data
    .map((d) => {
      const lastData = d.data.slice(-1)[0]
      const prevData = d.data.slice(-2)[0]
      return { ...d, prevData, lastData }
    })
    .map((d, i, a) => {
      const prevSum = a.reduce(
        (acc, cur) => acc + parseFloat(cur.prevData.y_val),
        0
      )
      const lastSum = a.reduce(
        (acc, cur) => acc + parseFloat(cur.lastData.y_val),
        0
      )
      const prevPercentage =
        Math.round((100 / prevSum) * d.prevData.y_val * 100) / 100
      const lastPercentage =
        Math.round((100 / lastSum) * d.lastData.y_val * 100) / 100
      const change = lastPercentage - prevPercentage
      return {
        subindicator: d.subsector,
        units: d.units,
        prevData: d.prevData,
        lastData: d.lastData,
        prevPercentage,
        lastPercentage,
        change: Math.round(change * 100) / 100,
        changeDirection: !change ? 0 : change < 0 ? -1 : 1,
      }
    })

  const lastTop = _sortBy(parsedData, (o) => -o.lastPercentage)[0]
  const lastTopChange = _sortBy(
    parsedData.filter((d) => d.changeDirection > 0),
    (o) => -o.change
  )[0]

  const baseSame = `The top amount of ${measure} in ${objective.default} in ${lastTop.lastData.x_val} was in ${lastTop.subindicator} at ${lastTop.lastPercentage}%.`
  const baseIncrease = `The top amount of ${measure} in ${objective.default} in ${lastTop.lastData.x_val} was in ${lastTop.subindicator} at ${lastTop.lastPercentage}%, up from ${lastTop.prevPercentage}% in ${lastTop.prevData.x_val}.`
  const baseDecrease = `The top amount of ${measure} in ${objective.default} in ${lastTop.lastData.x_val} was in ${lastTop.subindicator} at ${lastTop.lastPercentage}%, down from ${lastTop.prevPercentage}% in ${lastTop.prevData.x_val}.`

  const base =
    lastTop.changeDirection === 0
      ? baseSame
      : lastTop.changeDirection > 0
      ? baseIncrease
      : baseDecrease

  const addition =
    lastTopChange && lastTop.subindicator !== lastTopChange.subindicator
      ? `The technology with the biggest increase in ${measure} in ${lastTopChange.lastData.x_val} was ${lastTopChange.subindicator} at ${lastTopChange.lastPercentage}%, up from ${lastTopChange.prevPercentage}% in ${lastTopChange.prevData.x_val}.`
      : ""

  return {
    type: "text",
    text: [[base.trim(), addition.trim()].join(" ")],
  }
}
