export const sizes = [
  { ending: "sm", size: 360 },
  { ending: "md", size: 720 },
  { ending: "lg", size: 1440 },
]

export const imageTypes = {
  // Use chakra breakpoints by default
  // Check the chakra theme for reference
  default: {
    sizes: ["md", null, "lg"],
  },
  exampleCover: {
    sizes: ["sm", "md"],
  },
  partnerLogo: {
    sizes: ["sm"],
  },
  sector: {
    sizes: ["sm", "md", null, "sm"],
  },
  reportThumbnail: {
    sizes: ["sm"],
  },
  // Custom breakpoints are possible
  thumbnail: {
    sizes: ["sm", "md"],
    breakpoints: [400],
  },
  feature: {
    sizes: ["sm", "md", "lg"],
    breakpoints: [800, 1200],
  },
  cover: {
    sizes: ["md", "lg"],
    breakpoints: [800],
  },
}
