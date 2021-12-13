export default function extractKeyMDXParts(children, options = {}) {
  const ch = [children].flat()
  const allTags = ch.map((d) => d.props.originalType)
  const headingIndex = allTags.indexOf("h1")
  const heading = ch[headingIndex]
  const offset = options.subHeading ? 2 : 1

  const textBody = ch.slice(headingIndex + offset)
  const sections = extractSections({
    textBody,
    tagName: "h2",
    includeInSection: true,
  })

  return {
    heading,
    subHeading: ch[headingIndex + 1],
    textBody: ch.slice(headingIndex + offset),
    sections,
  }
}

function extractSections({
  textBody,
  tagName = "h2",
  includeInSection = true,
}) {
  return textBody.reduce((acc, cur, i) => {
    if (!i) return [[cur]]
    if (cur.props.mdxType === tagName)
      return includeInSection ? [...acc, [cur]] : [...acc, []]
    else return [...acc.slice(0, -1), [...acc[acc.length - 1], cur]]
  }, [])
}
