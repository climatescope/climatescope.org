const linkTheme = {
  baseStyle: {},
  variants: {
    stealth: {
      _hover: { textDecoration: "none" },
    },
    mainNav: {
      fontFamily: "heading",
      fontWeight: 700,
      fontSize: "sm",
      textTransform: "uppercase",
    },
    card: {
      display: "block",
      _hover: { textDecoration: "none" },
    },
    section: {
      fontFamily: "heading",
      fontWeight: 600,
      fontSize: "sm",
      lineHeight: "shorter",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      "svg": {
        marginLeft: "0.5rem",
      },
    },
  },
}

export default linkTheme
