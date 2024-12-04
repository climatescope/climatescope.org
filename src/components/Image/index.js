import { AspectRatio, Box, useTheme } from "@chakra-ui/react"

// Set image sizes here
// The "ending" is used to add a suffix to the image
// and to reference it in the imageTypes "sizes" array
import { imageTypes } from "./imageConfig"

export default function Image({
  src = "cover.jpg",
  type = "default",
  ratio,
  alt = "",
  sizes,
  breakpoints,
  subFolder = "",
  width = "100%",
  height = "auto",
  objectFit = "cover",
  ...restProps
}) {
  const theme = useTheme()

  const internalSizes = sizes || imageTypes[type].sizes || []

  const internalBreakpoints =
    breakpoints ||
    imageTypes[type].breakpoints ||
    Object.keys(theme.breakpoints)
      .map((bk) => 16 * +theme.breakpoints[bk].split("em")[0])
      .slice(1, internalSizes.length + 1)

  const [name, suffix] = src.split(".")

  const images = internalSizes.reduce((acc, cur, i) => {
    if (!cur) return acc
    const bp = internalBreakpoints[i - 1] || (!i ? "base" : null)
    if (!bp) return acc
    return [
      ...acc,
      {
        bp,
        src: `/images${
          subFolder ? `/${subFolder}/` : "/"
        }${name}-${cur}.${suffix}`,
        ending: cur,
      },
    ]
  }, [])

  const sources = images.slice(1).sort((a, b) => b.bp - a.bp)

  return !ratio ? (
    <Box as="span" display="block" {...restProps}>
      <Box as="picture">
        {sources.length
          ? sources.map(({ bp, src }, i) => {
              return (
                <source key={bp} media={`(min-width: ${bp}px)`} srcSet={src} />
              )
            })
          : null}
        <Box
          as="img"
          src={images[0].src}
          alt={alt}
          style={{ width, height }}
          objectFit={objectFit}
        />
      </Box>
    </Box>
  ) : (
    <AspectRatio as="span" display="block" ratio={ratio} {...restProps}>
      <Box as="picture" border="1px solid">
        {sources.length
          ? sources.map(({ bp, src }, i) => {
              return (
                <source key={bp} media={`(min-width: ${bp}px)`} srcSet={src} />
              )
            })
          : null}
        <Box
          as="img"
          src={images[0].src}
          alt={alt}
          style={{ width: "100%", height: "100%" }}
          objectFit={objectFit}
        />
      </Box>
    </AspectRatio>
  )
}
