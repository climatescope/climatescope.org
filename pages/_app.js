import { MDXProvider } from "@mdx-js/react"
import { ChakraProvider } from "@chakra-ui/react"

import { theme } from "@utils/theme"
import components from "@components/MDXComponents"

import "mapbox-gl/dist/mapbox-gl.css"

function AppWrapper({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  )
}

export default AppWrapper
