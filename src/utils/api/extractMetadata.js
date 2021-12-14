export function extractMetadata(str, slug, metaDataName = "metaData") {
  const [, bodyText] = str.split(`const ${metaDataName} = `)

  let closedMetaBlock = false // avoid parsing component props in MDX
  let openBraceCount = 0

  const cleanData =
    bodyText.split("").reduce((acc, cur) => {
      if (cur === "{") openBraceCount = openBraceCount + 1
      if (cur === "}") {
        openBraceCount = openBraceCount - 1
        if (!openBraceCount) closedMetaBlock = true
      }
      if (closedMetaBlock) return acc
      if (!openBraceCount && acc.length > 1) return acc
      if (!openBraceCount) return acc
      return acc + cur
    }, "") + "}"

  const spacelessStr = cleanData
    .replaceAll("{", "{————")
    .replaceAll("}", "————}")
    .replaceAll(",\n", "————")
    .split("————")
    .map((d) => d.replaceAll("\n", "").replaceAll("\t", "").trim())
    .reduce((acc, cur) => {
      const cleanedLine = cur.trim()
      if (!cur) return acc
      if (["{", "}"].includes(cleanedLine)) return [...acc, cur]
      const [key, ...val] = cleanedLine.split(":")
      const cleanedValue = val.join("").trim()
      const hasTrailingComma = cleanedValue[cleanedValue.length - 1] === ","
      return [
        ...acc,
        `"${key.trim()}":${
          hasTrailingComma ? cleanedValue : cleanedValue + ","
        }`,
      ]
    }, [])
    .join("")
    .replaceAll(",}", "}")

  const parsedMetaData = JSON.parse(spacelessStr)

  return { ...parsedMetaData, slug }
}
