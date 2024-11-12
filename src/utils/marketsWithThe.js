const marketsWithThe = [
  "bs",
  "ky",
  "cf",
  "ky",
  "km",
  "do",
  "fk",
  "gm",
  "im",
  "cg",
  "cd",
  "lw",
  "mv",
  "mh",
  "nl",
  "an",
  "ph",
  "sb",
  "tc",
  "ae",
  "gb",
  "us",
  "vi",
]

export default marketsWithThe

export function prefixMarket(iso, name) {
  return marketsWithThe.includes(iso) ? `the ${name}` : name
}
