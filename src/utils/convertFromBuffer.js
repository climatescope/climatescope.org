export default function convertFromBuffer(content) {
  return Buffer.from(content, "base64").toString()
}
