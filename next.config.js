module.exports = {
  trailingSlash: true,
  env: {
    MAILCHIMP_ADDRESS: process.env.MAILCHIMP_ADDRESS || "",
    MAILCHIMP_TIMEOUT: "3500",
  },
  basePath: process.env.BASE_PATH || "",
  publicRuntimeConfig: {
    // year: process.env.YEAR || 2022,
    year: process.env.YEAR || "2023",
    basePath: process.env.BASE_PATH || "",
    siteUrl: process.env.SITE_URL || "",
    mapboxToken: process.env.MAPBOX_TOKEN || "",
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS || "UA-56170738-1",
  },
  output: "export",
}
