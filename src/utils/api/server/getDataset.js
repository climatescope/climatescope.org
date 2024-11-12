import { readFile } from "fs/promises"
import { join } from "path"

function convertFromBuffer(content) {
  return Buffer.from(content, "base64").toString()
}

export default async function getDataset(name) {
  if (!name) return null

  const contentRaw = await readFile(
    join(process.env.PWD, "public", "data", name),
    "utf8"
  )

  const converted = convertFromBuffer(contentRaw.split("").reverse().join(""))

  return converted
}
