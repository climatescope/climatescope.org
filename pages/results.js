import sortBy from "lodash/sortBy"
import getConfig from "next/config"

import { getServerData } from "@utils/api/server"
import { useClientData } from "@utils/api/client"

import SEO from "@components/SEO"
import ResultsPage from "@components/pages/ResultsPage"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

const ResultsPageWrapper = ({ dataPreview }) => {
  const clientData = useClientData(`${basePath}/data/results-2023.json`)
  return (
    <>
      <SEO
        title="Results"
        description="Which market is the most attractive for energy transition investment?"
      />
      <ResultsPage clientData={clientData} dataPreview={dataPreview} />
    </>
  )
}

export async function getStaticProps() {
  const resultsData = await getServerData(`public/data/results-2023.json`)
  const dataPreview = sortBy(
    resultsData.filter((d) => d.marketGrouping === "emerging"),
    (o) => o.marketGroupingScore.data[0].rank
  ).slice(0, 10)
  return { props: { dataPreview } }
}

export default ResultsPageWrapper
