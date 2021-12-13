import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

import themeColors from "./colors"
import globalStyles from "./globalStyles"

import {
  headingTheme,
  buttonTheme,
  containerTheme,
  linkTheme,
  tabsTheme,
  textTheme,
  selectTheme,
} from "./components"

export const colors = themeColors

export const theme = extendTheme(
  {
    config: {
      cssVarPrefix: "",
    },
    styles: {
      global: globalStyles,
    },
    fonts: {
      body: `"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      heading: `"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    lineHeights: {
      shorter: "calc(1em + 0.3125rem)",
      short: "calc(1em + 0.625rem)",
      base: "calc(1em + 0.75rem)",
      tall: "calc(1em + 1rem)",
      taller: "calc(1em + 1.25rem)",
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    colors,
    space: {
      "2xs": "0.25rem",
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
      "7xl": "7rem",
      "8xl": "8rem",
    },
    sizes: {
      container: {
        sm: "45rem",
        md: "65rem",
        lg: "75rem",
        xl: "95rem",
      },
    },
    radii: {
      sm: "0.125rem",
      md: "0.25rem",
      lg: "0.5rem",
    },
    breakpoints: {
      sm: "30.0625em",
      md: "48.0625em",
      lg: "62em",
      xl: "80em",
      "2xl": "96em",
    },
    components: {
      Button: buttonTheme,
      Container: containerTheme,
      Link: linkTheme,
      Heading: headingTheme,
      Tabs: tabsTheme,
      Text: textTheme,
      Select: selectTheme,
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
)
