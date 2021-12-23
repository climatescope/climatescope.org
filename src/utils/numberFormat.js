
export const formatScore = (val) => {
  return val?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  })
}

export const formatRank = (val) => {
  return val?.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
}
