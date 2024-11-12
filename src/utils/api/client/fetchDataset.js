import { csvParse } from "d3-dsv"

import convertFromBuffer from "@/utils/convertFromBuffer"

export default async function fetchDataset(url, format = "json") {
  const data = await fetch(url)
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.text()
    })
    .then((d) => {
      const converted = convertFromBuffer(d.split("").reverse().join(""))
      return format === "csv" ? csvParse(converted) : JSON.parse(converted)
    })
    .catch(() => [])
  return data
}
