import { useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import { csv } from "d3-fetch"

import Top10Ranking from "@components/pages/IndexPage/Highlights/Top10Ranking"

export default function MiniChart({ src }) {
  const [data, setData] = useState()

  useEffect(() => {
    if (typeof window === "undefined") return

    const urlParts = src.split("/")
    const isFullUrl = urlParts.length > 1

    const chunks = isFullUrl
      ? src.split("/").slice(-1)[0].split("__")
      : src.split("__")
    const sector = chunks.length === 1 ? "" : chunks[0]
    const index = chunks.length === 1 ? "0" : chunks[1]
    const fullName = chunks.length === 1 ? chunks[0] : chunks[2]

    const src2 = encodeURIComponent(src)
    csv(isFullUrl ? src : `/data/mini-rankings/${src2}`).then((d) => {
      const name = [index, fullName.split(".csv")[0].split("_").join(" ")]
        .join(" ")
        .trim()
      setData({
        name,
        data: d,
        sector,
        index,
      })
    })
  }, [])

  return (
    <Box>
      <Top10Ranking
        data={data}
        barHeight={8}
        headingFontSize={["xl", null, null, "2xl"]}
        chartFontSize="md"
      />
    </Box>
  )
}
