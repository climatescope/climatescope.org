const buttonTheme = {
  baseStyle: {
    fontFamily: "heading",
    fontSize: "sm",
    fontWeight: 600,
    borderRadius: "md",
    textTransform: "uppercase",
  },
  sizes: {
    sm: { px: 5, h: "2rem", fontSize: "sm" },
    md: { px: 5, h: "2.5rem", fontSize: "sm" },
    lg: { px: 5, h: "3rem", fontSize: "sm" },
  },
  variants: {
    solid: (props) => {
      const { colorScheme } = props
      const isBrand = colorScheme === "brand"
      const neutrals = [
        ["white", "whiteAlpha"],
        ["gray", "whiteAlpha"],
      ]
      const isNeutral = neutrals.flat().includes(colorScheme)
      const neutralColorScheme = neutrals[0].includes(colorScheme)
        ? "whiteAlpha"
        : colorScheme

      const bgShades = {
        base: [
          `${colorScheme}.800`,
          neutralColorScheme === "whiteAlpha"
            ? `${neutralColorScheme}.200`
            : `${neutralColorScheme}.50`,
          `${colorScheme}.500`,
        ],
        hover: [
          `${colorScheme}.700`,
          neutralColorScheme === "whiteAlpha"
            ? `${neutralColorScheme}.300`
            : `${neutralColorScheme}.100`,
          `${colorScheme}.600`,
        ],
        focus: [
          `${colorScheme}.700`,
          neutralColorScheme === "whiteAlpha"
            ? `${neutralColorScheme}.300`
            : `${neutralColorScheme}.100`,
          `${colorScheme}.600`,
        ],
        active: [
          `${colorScheme}.800`,
          neutralColorScheme === "whiteAlpha"
            ? `${neutralColorScheme}.400`
            : `${neutralColorScheme}.200`,
          `${colorScheme}.700`,
        ],
      }

      return {
        color: isNeutral ? "currentcolor" : "white",
        bg: isBrand
          ? bgShades.base[0]
          : isNeutral
          ? bgShades.base[1]
          : bgShades.base[2],
        _hover: {
          bg: isBrand
            ? bgShades.hover[0]
            : isNeutral
            ? bgShades.hover[1]
            : bgShades.hover[2],
        },
        _focus: {
          bg: isBrand
            ? bgShades.focus[0]
            : isNeutral
            ? bgShades.focus[1]
            : bgShades.focus[2],
        },
        _active: {
          bg: isBrand
            ? bgShades.active[0]
            : isNeutral
            ? bgShades.active[1]
            : bgShades.active[2],
        },
      }
    },
    outline: (props) => {
      const { colorScheme } = props
      const isInverted =
        colorScheme === "white" ||
        colorScheme === "whiteAlpha" ||
        colorScheme === "blackAlpha"
      const alphaColor =
        colorScheme === "white" || colorScheme === "whiteAlpha"
          ? "whiteAlpha"
          : "blackAlpha"
      const isGray = colorScheme === "gray"

      const colorShades = {
        base: ["currentcolor", `currentcolor`, `${colorScheme}.700`],
        hover: ["currentcolor", "currentcolor", `${colorScheme}.800`],
        focus: ["currentcolor", "currentcolor", `${colorScheme}.800`],
        active: ["currentcolor", "currentcolor", `${colorScheme}.900`],
      }

      const borderShades = {
        base: [
          alphaColor === "blackAlpha"
            ? `${alphaColor}.200`
            : `${alphaColor}.600`,
          `${colorScheme}.100`,
          `${colorScheme}.700`,
        ],
        focus: [
          alphaColor === "blackAlpha"
            ? `${alphaColor}.300`
            : `${alphaColor}.700`,
          `${colorScheme}.200`,
          `${colorScheme}.800`,
        ],
        hover: [
          alphaColor === "blackAlpha"
            ? `${alphaColor}.300`
            : `${alphaColor}.700`,
          `${colorScheme}.200`,
          `${colorScheme}.800`,
        ],
        active: [
          alphaColor === "blackAlpha"
            ? `${alphaColor}.400`
            : `${alphaColor}.900`,
          `${colorScheme}.300`,
          `${colorScheme}.900`,
        ],
      }

      const bgShades = {
        base: ["transparent"],
        hover: [`${alphaColor}.100`, `${colorScheme}.50`, `${colorScheme}.100`],
        focus: [
          `${alphaColor}.100`,
          `${colorScheme}.100`,
          `${colorScheme}.100`,
        ],
        active: [
          `${alphaColor}.200`,
          `${colorScheme}.100`,
          `${colorScheme}.200`,
        ],
      }

      return {
        borderWidth: "0.125rem",
        bg: bgShades.base[0],
        color: isInverted
          ? colorShades.base[0]
          : isGray
          ? colorShades.base[1]
          : colorShades.base[2],
        borderColor: isInverted
          ? borderShades.base[0]
          : isGray
          ? borderShades.base[1]
          : borderShades.base[2],
        _hover: {
          bg: isInverted
            ? bgShades.hover[0]
            : isGray
            ? bgShades.hover[1]
            : bgShades.hover[2],
          color: isInverted
            ? colorShades.hover[0]
            : isGray
            ? colorShades.hover[1]
            : colorShades.hover[2],
          borderColor: isInverted
            ? borderShades.hover[0]
            : isGray
            ? borderShades.hover[1]
            : borderShades.hover[2],
        },
        _focus: {
          bg: isInverted
            ? bgShades.focus[0]
            : isGray
            ? bgShades.focus[1]
            : bgShades.focus[2],
          color: isInverted
            ? colorShades.focus[0]
            : isGray
            ? colorShades.focus[1]
            : colorShades.focus[2],
          borderColor: isInverted
            ? borderShades.focus[0]
            : isGray
            ? borderShades.focus[1]
            : borderShades.focus[2],
          boxShadow: "outline",
        },
        _active: {
          bg: isInverted
            ? bgShades.active[0]
            : isGray
            ? bgShades.active[1]
            : bgShades.active[2],
          color: isInverted
            ? colorShades.active[0]
            : isGray
            ? colorShades.active[1]
            : colorShades.active[2],
          borderColor: isInverted
            ? borderShades.active[0]
            : isGray
            ? borderShades.active[1]
            : borderShades.active[2],
        },
      }
    },
    ghost: (props) => {
      const { colorScheme } = props
      const isInverted = colorScheme === "white"
      const isGray = colorScheme === "gray"
      return {
        bg: "transparent",
        color: isInverted
          ? colorScheme
          : isGray
          ? "inherit"
          : colorScheme === "brand"
          ? `${colorScheme}.800`
          : `${colorScheme}.500`,
        _hover: {
          bg: isInverted
            ? "whiteAlpha.100"
            : isGray
            ? `${colorScheme}.50`
            : `${colorScheme}.100`,
          color: isInverted
            ? colorScheme
            : isGray
            ? "inherit"
            : colorScheme === "brand"
            ? `${colorScheme}.800`
            : `${colorScheme}.600`,
        },
        _focus: {
          bg: isInverted
            ? "whiteAlpha.100"
            : isGray
            ? `${colorScheme}.50`
            : `${colorScheme}.100`,
          color: isInverted
            ? colorScheme
            : isGray
            ? "inherit"
            : colorScheme === "brand"
            ? `${colorScheme}.800`
            : `${colorScheme}.600`,
          boxShadow: "outline",
        },
        _active: {
          bg: isInverted
            ? "whiteAlpha.200"
            : isGray
            ? `${colorScheme}.100`
            : `${colorScheme}.200`,
          color: isInverted
            ? colorScheme
            : isGray
            ? "inherit"
            : `${colorScheme}.700`,
        },
      }
    },
    subtle: (props) => {
      const { colorScheme } = props
      const isInverted = colorScheme === "white"
      const isGray = colorScheme === "gray"
      return {
        bg: isInverted
          ? "whiteAlpha.100"
          : isGray
          ? `${colorScheme}.50`
          : `${colorScheme}.100`,
        color: isInverted
          ? colorScheme
          : isGray
          ? "inherit"
          : `${colorScheme}.600`,
        _hover: {
          bg: isInverted
            ? "whiteAlpha.100"
            : isGray
            ? `${colorScheme}.100`
            : `${colorScheme}.200`,
          color: isInverted
            ? colorScheme
            : isGray
            ? "inherit"
            : `${colorScheme}.700`,
        },
        _focus: {
          bg: isInverted
            ? "whiteAlpha.100"
            : isGray
            ? `${colorScheme}.100`
            : `${colorScheme}.200`,
          color: isInverted
            ? colorScheme
            : isGray
            ? "inherit"
            : `${colorScheme}.700`,
          boxShadow: "outline",
        },
        _active: {
          bg: isInverted
            ? "whiteAlpha.200"
            : isGray
            ? `${colorScheme}.200`
            : `${colorScheme}.300`,
          color: isInverted
            ? colorScheme
            : isGray
            ? "inherit"
            : `${colorScheme}.700`,
        },
      }
    },
    drawerNavigationButton: {
      w: "100%",
      borderRadius: "none",
      justifyContent: "flex-start",
      px: "1.5rem",
      "&:hover": { bg: "gray.100" },
      "&:focus": { bg: "gray.100" },
      "&:active": { bg: "gray.200" },
    },
  },
}

export default buttonTheme
