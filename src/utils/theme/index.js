import {
  extendTheme,
  withDefaultColorScheme,
  // withDefaultVariant,
  // theme as baseTheme,
} from "@chakra-ui/react"
import localFont from "next/font/local"

import colors from "./colors"
import components from "./components"
import textStyles from "./textStyles"

const avenirSans = localFont({
  display: "swap",
  src: [
    {
      path: "../../pages/fonts/bb-avenir-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../pages/fonts/bb-avenir-demi.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../pages/fonts/bb-avenir-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bb-avenir",
  fallback: ["system-ui", "sans-serif"],
})

export default extendTheme(
  {
    styles: {
      global: {
        body: {
          letterSpacing: "tight",
        },
        a: {
          _focusVisible: {
            outline: "0.125rem solid currentcolor",
            outlineOffset: "0.125rem",
            boxShadow: "none !important",
          },
        },
      },
    },
    sizes: {
      container: {
        "2xl": "90rem",
      },
    },
    letterSpacings: {
      normal: "0",
      tight: "-0.0125em",
      tighter: "-0.025em",
      wide: "0.0125em",
      wider: "0.025em",
      widest: "0.5em",
    },
    radii: {
      sm: "0.125rem",
      md: "0.125rem",
      lg: "0.125rem",
    },
    colors,
    fonts: {
      body: avenirSans.style.fontFamily,
      heading: avenirSans.style.fontFamily,
    },
    textStyles,
    lineHeights: {
      taller: "calc(1em + 0.75rem)",
      tall: "calc(1em + 0.625rem)",
      base: "calc(1em + 0.5rem)",
      short: "calc(1em + 0.375rem)",
      shorter: "calc(1em + 0.25rem)",
    },
    components,
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    // components: ["Button", "Badge"],
  }),
  withDefaultColorScheme({
    colorScheme: "gray",
    components: ["Tag"],
  })
  // withDefaultVariant({
  //   variant: "solid",
  //   // components: ["Input", "NumberInput", "PinInput"],
  // })
)
