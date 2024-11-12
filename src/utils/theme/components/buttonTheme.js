export default {
  baseStyle: {
    letterSpacing: "tight",
    _focusVisible: {
      boxShadow: "none",
      outline: "0.125rem solid currentcolor",
    },
  },
  variants: {
    solid: ({ colorScheme }) => {
      switch (colorScheme) {
        case "gray":
          return {
            bg: "gray.100",
            color: "gray.800",
            _hover: { "bg": "gray.200", "_disabled": { "bg": "gray.100" } },
            _focusVisible: { outlineColor: "gray.800" },
            _active: { "bg": "gray.300" },
          }
        case "brand":
          return {
            bg: "brand.500",
            color: "brand.1000",
            _hover: { "bg": "brand.600", "_disabled": { "bg": "brand.100" } },
            _focusVisible: { outlineColor: "brand.500" },
            _active: { "bg": "brand.700" },
          }
        default:
          return {
            bg: `${colorScheme}.500`,
            color: `white`,
            _hover: {
              "bg": `${colorScheme}.600`,
              "_disabled": { "bg": `${colorScheme}.100` },
            },
            _focusVisible: { outlineColor: `${colorScheme}.500` },
            _active: { "bg": `${colorScheme}.700` },
          }
      }
    },
  },
}
