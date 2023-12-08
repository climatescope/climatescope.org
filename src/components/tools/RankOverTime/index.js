import getConfig from "next/config"
import { useElementSize } from "usehooks-ts"

import { useClientData } from "@utils/api/client"
import Visualization from "@components/tools/RankOverTime/Visualization"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

export default function RankingOverTime() {
  const { data } = useClientData(`${basePath}/data/ranks-over-time.json`)
  const [squareRef, dimensions] = useElementSize()
  const { width } = dimensions
  return (
    <div ref={squareRef}>
      {data?.length && width && <Visualization data={data} width={width} />}
    </div>
  )
}
