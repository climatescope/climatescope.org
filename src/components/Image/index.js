import getConfig from "next/config"
import { useTheme, AspectRatio, Box, Text } from "@chakra-ui/react"
import { imageTypes } from "../../../images.config"

const { publicRuntimeConfig } = getConfig()
const basePath = publicRuntimeConfig.basePath

const Image = ({
  src = "cover.jpg",
  type = "default",
  ratio = 3 / 2,
  alt = "",
  sizes,
  bg = "white",
  breakpoints,
  caption,
  ...restProps
}) => {
  const theme = useTheme()

  const internalSizes = sizes || imageTypes[type].sizes || []

  const internalBreakpoints =
    breakpoints ||
    imageTypes[type].breakpoints ||
    Object.keys(theme.breakpoints)
      .map((bk) => 16 * +theme.breakpoints[bk].split("em")[0])
      .slice(1, internalSizes.length + 1)

  const [name, suffix] = src.split(".")

  // Replace spaces with underscores to prevent any URI encoding issues
  // with responsive images (see scripts/images.js for build step)
  const fixedName = name.split(" ").join("_")

  const images = internalSizes.reduce((acc, cur, i) => {
    if (!cur) return acc
    const bp = internalBreakpoints[i - 1] || (!i ? "base" : null)
    if (!bp) return acc
    return [
      ...acc,
      {
        bp,
        src: `${basePath}/images/${fixedName}-${cur}.${suffix}`,
        ending: cur,
      },
    ]
  }, [])

  // const baseImage = images[0]
  const sources = images.slice(1).sort((a, b) => b.bp - a.bp)

  return (
    <Box {...restProps}>
      <AspectRatio ratio={ratio} bg={bg}>
        <Box as="picture">
          {sources.length
            ? sources.map(({ bp, src }, i) => {
                return (
                  <source
                    key={bp}
                    media={`(min-width: ${bp}px)`}
                    srcSet={src}
                  />
                )
              })
            : null}
          <img
            src={images[0].src}
            alt={alt}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </AspectRatio>
      {caption && (
        <Text color="gray.500" fontSize="md" mt={4}>
          {caption}
        </Text>
      )}
    </Box>
  )
}

export default Image
