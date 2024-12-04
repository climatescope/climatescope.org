import { readFile } from "fs/promises"
import { join } from "path"

function convertFromBuffer(content) {
  return Buffer.from(content, "base64").toString()
}

export default async function getPages({
  pageType = "factsheets",
  fields = [],
  limit = undefined,
  filter = () => true,
}) {
  const content = await readFile(
    join(process.env.PWD, "content", pageType + ".txt"),
    "utf8"
  )

  const parsedContent = JSON.parse(
    convertFromBuffer(content.trim().split("").reverse().join(""))
  )

  const allPages = (parsedContent.pages || [])
    .map(({ frontmatter = {}, fileName, slug, content }) => {
      return {
        ...frontmatter,
        _filename: fileName,
        _slug: slug,
        _content: content,
      }
    })
    .filter(filter)
    .slice(0, limit)

  return !fields.length
    ? allPages
    : allPages.map((d) =>
        fields.reduce((acc, cur) => {
          if (!d[cur]) return acc
          acc[cur] = d[cur]
          return acc
        }, {})
      )
}
