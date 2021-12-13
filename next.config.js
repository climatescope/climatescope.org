const withPlugins = require("next-compose-plugins")

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      [require("remark-prism"), {}],
    ],
  },
})

module.exports = withPlugins(
  [[withMDX, { pageExtensions: ["js", "jsx", "md", "mdx"] }]],
  {
    trailingSlash: true,
    basePath: process.env.BASE_PATH || "",
    publicRuntimeConfig: {
      basePath: process.env.BASE_PATH || "",
      siteUrl: process.env.SITE_URL || "",
      mapboxToken: process.env.MAPBOX_TOKEN || "",
    },
  }
)
