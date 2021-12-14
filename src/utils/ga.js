import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()
const googleAnalyticsId = publicRuntimeConfig.googleAnalyticsId

export const pageview = (url) => {
  if (typeof window === "undefined") return
  window.gtag("config", googleAnalyticsId, {
    page_path: url,
  })
}

export const event = ({ action, params }) => {
  if (typeof window === "undefined") return
  window.gtag("event", action, params)
}
