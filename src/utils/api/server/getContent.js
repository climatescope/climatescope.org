import { readFile } from "fs/promises"
import { join } from "path"
import { csvParse } from "d3-dsv"

function convertFromBuffer(content) {
  return Buffer.from(content, "base64").toString()
}

export default async function getContent(name, format = "json") {
  if (!name) return null

  const contentRaw = await readFile(
    join(process.env.PWD, "content", name),
    "utf8"
  )

  const converted = `${convertFromBuffer(contentRaw.split("").reverse().join(""))}`.trim()

  return format === "csv" ? csvParse(converted.trim()) : JSON.parse(converted.trim())
}
