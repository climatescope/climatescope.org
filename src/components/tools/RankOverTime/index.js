import getConfig from "next/config"
import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"

import { useClientData } from "@utils/api/client"
import Visualization from "@components/tools/RankOverTime/Visualization"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

export default function RankingOverTime() {
  const { data } = useClientData(`${basePath}/data/ranks-over-time.json`)

  const regions = _sortBy([
    "",
    ...Object.keys(_groupBy(data, (o) => o.regionName)).filter((d) => d),
  ])

  return (
    <div>{data?.length && <Visualization data={data} regions={regions} />}</div>
  )
}
