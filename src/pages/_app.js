import { ChakraProvider } from "@chakra-ui/react"
import Script from "next/script"

import theme from "@/utils/theme"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"

export default function App({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SiteHeader />
        <Component {...pageProps} />
        <SiteFooter />
      </ChakraProvider>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </>
  )
}
