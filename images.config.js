/**
 *
 * Set image sizes here
 * The "ending" is used to add a suffix to the image
 * and to reference it in the imageTypes "sizes" array
 */
const sizes = [
  { ending: "sm", size: 360 },
  { ending: "md", size: 720 },
  { ending: "lg", size: 1440 },
]

const imageTypes = {
  /**
   * Use chakra's breakpoints by default
   * Check the chakra theme
   *
   * ./src/utils/theme/index.js
   *
   * for reference
   */
  default: {
    sizes: ["sm", null, null, null, "lg", "sm"],
  },
  sector: {
    sizes: ["sm", "md", null, "sm"],
  },
  reportThumbnail: {
    sizes: ["sm"],
  },
  reportCover: {
    sizes: ["sm", "md", "lg"],
  },
  cover: {
    sizes: ["lg"],
  },
  chart: {
    sizes: ["md", "lg"],
  },

  /**
   * Custom breakpoints are also possible
   */
  thumbnail: {
    sizes: ["sm", "md"],
    breakpoints: [400],
  },
  feature: {
    sizes: ["sm", "md", "lg"],
    breakpoints: [800, 1200],
  },
  article: {
    sizes: ["sm", "md", "lg"],
    breakpoints: [800, 1200],
  },
}

module.exports = { sizes, imageTypes }
