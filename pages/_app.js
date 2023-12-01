import { ChakraProvider } from "@chakra-ui/provider"

import { theme } from "@utils/theme"
import navigation from "@utils/navigation"
import SiteHeader from "@components/SiteHeader"
import SiteFooter from "@components/SiteFooter"
// import * as ga from "@utils/ga"

import "mapbox-gl/dist/mapbox-gl.css"

function AppWrapper({ Component, pageProps, router }) {
  // useEffect(() => {
  //   if (typeof window === "undefined") return
  //   const handleRouteChange = (url) => {
  //     ga.pageview(url)
  //   }
  //   router.events.on("routeChangeComplete", handleRouteChange)
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange)
  //   }
  // }, [router.events])
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SiteHeader navigation={navigation} />
      <Component {...pageProps} />
      <SiteFooter navigation={navigation} />
    </ChakraProvider>
  )
}

export default AppWrapper
