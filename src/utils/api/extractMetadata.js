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
    .replaceAll("{ ", "{")
    .replaceAll(", ", ",")
    .replaceAll(" }", "}")
    .replaceAll(": ", ":")
    .replaceAll("\n", "")
    .replaceAll("\t", "")
    .replaceAll("  ", "")
    .replaceAll(",}", "}")
    .replaceAll(/\{.+?:/g, (d) => `{"${d.slice(1, -1)}":`)
    .replaceAll(/\,.+?:/g, (d) => `,"${d.slice(1, -1)}":`)

  const parsedMetaData = JSON.parse(spacelessStr)

  return { ...parsedMetaData, slug }
}
