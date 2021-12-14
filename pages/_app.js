import { useEffect } from "react"
import { MDXProvider } from "@mdx-js/react"
import { ChakraProvider } from "@chakra-ui/react"

import { theme } from "@utils/theme"
import navigation from "@utils/navigation"
import components from "@components/MDXComponents"
import SiteHeader from "@components/SiteHeader"
import SiteFooter from "@components/SiteFooter"
import * as ga from "@utils/ga"

import "mapbox-gl/dist/mapbox-gl.css"

function AppWrapper({ Component, pageProps, router }) {
  useEffect(() => {
    if (typeof window === "undefined") return
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <SiteHeader navigation={navigation} />
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
      <SiteFooter navigation={navigation} />
    </ChakraProvider>
  )
}

export default AppWrapper
