import { useRef, useMemo } from "react"
import sortBy from "lodash/sortBy"

const topicNames = ["Fundamentals", "Opportunities", "Experience"]

const computeFinalScore = (topics, weighting, sector) => {
  const weightedTopics = topics.reduce((acc, cur) => {
    if (cur.sector !== sector) return acc

    const name = cur.name
    const weight = weighting[topicNames.indexOf(name)]
    const value = cur.data[0].value
    const weightedValue = value * (weight / 100)

    const item = {
      id: cur.id,
      name,
      sector: cur.sector,
      value,
      weight,
      weightedValue,
      width: (100 / 5) * weightedValue,
    }

    return [...acc, item]
  }, [])

  const finalScore = weightedTopics.reduce(
    (acc, cur) => acc + cur.weightedValue,
    0
  )

  return { finalScore, weightedTopics }
}

const useRankingData = ({
  weighting,
  sector = "power",
  region,
  marketGroup,
  data,
}) => {
  if (!data) return null
  const count = useRef(0)
  const len = data.length

  const augmented = useMemo(() => {
    return data.map((d) => {
      const isVisible =
        (!region || d.region.id === region) &&
        (!marketGroup || d.marketGrouping === marketGroup)

      if (sector === "all") {
        return {
          ...d,
          isVisible,
          finalScore: d.score.data[0].value,
          weightedTopics: [],
        }
      }

      const hasData = sector === "all sectors" || d.sectors.find((s) => s.id === sector).data[0].value

      const { finalScore, weightedTopics } = computeFinalScore(
        d.topics,
        weighting,
        sector
      )
      return {
        ...d,
        isVisible: !!hasData && isVisible,
        finalScore,
        weightedTopics,
      }
    })
  }, [region, weighting, sector, len, marketGroup])

  const sorted = sortBy(augmented, (o) => -o.finalScore)

  return sorted.map((cur, i) => {
    if (!i) count.current = 0
    count.current = count.current + (cur.isVisible ? 1 : 0)
    return { ...cur, masterRank: count.current }
  })
}

export default useRankingData
