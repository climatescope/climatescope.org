const linkTheme = {
  baseStyle: {
    boxShadow: "none",
    _focus: {
      boxShadow: "none",
    },
    _focusVisible: {
      outline: "0.125rem solid currentcolor",
    },
  },
  variants: {
    stealth: {
      _hover: { textDecoration: "none" },
    },
    mainNav: {
      fontFamily: "heading",
      fontWeight: 600,
      fontSize: "sm",
      lineHeight: "short",
      textTransform: "uppercase",

      backgroundImage:
        "linear-gradient(transparent calc(100% - 0.125rem), currentcolor 0.125rem)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "0% 100%",
      transition: "background-size 0.25s ease",
      _hover: {
        backgroundSize: "100% 100%",
        textDecoration: "none",
      },
      _focusVisible: {
        backgroundSize: "100% 100%",
        textDecoration: "none",
      },
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
        transition: "transform 0.25s ease",
      },
      backgroundImage:
        "linear-gradient(transparent calc(100% - 0.125rem), currentcolor 0.125rem)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "0% 100%",
      transition: "background-size 0.25s ease",
      _hover: {
        backgroundSize: "calc(100% - 1.625rem) 100%",
        textDecoration: "none",
        "svg": { transform: "translateX(0.25rem)" },
      },
      _focusVisible: {
        backgroundSize: "calc(100% - 1.625rem) 100%",
        textDecoration: "none",
        "svg": { transform: "translateX(0.25rem)" },
      },
    },
    footerLink: {
      lineHeight: "short",
      fontWeight: 500,
      color: "gray.700",
      backgroundImage:
        "linear-gradient(transparent calc(100% - 0.125rem), currentcolor 0.125rem)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "0% 100%",
      transition: "background-size 0.25s ease",
      _hover: {
        backgroundSize: "100% 100%",
        textDecoration: "none",
      },
      _focusVisible: {
        backgroundSize: "100% 100%",
        textDecoration: "none",
      },
    },
  },
}

export default linkTheme
