import { Container } from "@chakra-ui/react"

import Listing from "@components/pages/ResultsPage/Listing"
import useRankingData from "@components/pages/ResultsPage/Ranking/useRankingData"

const Ranking = ({
  weighting,
  sector = "power",
  region,
  dataPreview,
  data,
  marketGroup = "developing",
}) => {
  const rankingData = useRankingData({
    weighting,
    region,
    sector,
    marketGroup,
    data: data || dataPreview,
  })

  return (
    <Container py={3}>
      {rankingData ? <Listing data={rankingData} sector={sector} /> : null}
    </Container>
  )
}

export default Ranking
