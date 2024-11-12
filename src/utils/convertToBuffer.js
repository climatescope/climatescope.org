export default function convertToBuffer(content) {
  return Buffer.from(content).toString("base64")
}
