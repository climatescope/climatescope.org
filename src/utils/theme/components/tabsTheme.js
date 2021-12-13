const headingTheme = {
  baseStyle: {
    tablist: {
      fontFamily: "heading",
    },
    tab: {
      fontWeight: 700,
      lineHeight: "none",
    },
    tabpanel: {
      px: 0,
      py: 10,
    },
  },
  variants: {
    sectorTabs: {
      tablist: {
        h: "4.5rem",
        borderBottom: "0.125rem solid",
        borderBottomColor: "gray.100",
      },
      tab: {
        fontSize: "lg",
        borderBottomWidth: "0.25rem",
        borderBottomColor: "transparent",
        color: "gray.500",
        w: "25%",
        h: "4.5rem",
        justifyContent: "flex-start",
        fontWeight: 600,
        _selected: {
          color: "teal.800",
          borderColor: "teal.800",
          fontWeight: 700,
          "div": { bg: "teal.800", color: "white" },
        },
      },
    },
  },
  sizes: {
    lg: {
      tab: { fontSize: "lg", px: 5, py: 5 },
    },
  },
}

export default headingTheme
