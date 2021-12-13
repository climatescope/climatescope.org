import { MDXProvider } from "@mdx-js/react"
import { ChakraProvider } from "@chakra-ui/react"

import { theme } from "@utils/theme"
import navigation from "@utils/navigation"
import components from "@components/MDXComponents"
import SiteHeader from "@components/SiteHeader"
import SiteFooter from "@components/SiteFooter"

import "mapbox-gl/dist/mapbox-gl.css"

function AppWrapper({ Component, pageProps }) {
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
