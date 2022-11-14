const headingTheme = {
  baseStyle: {
    lineHeight: "shorter",
    fontWeight: 600,
  },
  defaultProps: { size: null },
  variants: {
    pageTitle: {
      fontSize: ["3xl", null, "5xl"],
    },
    sectionTitle: {
      fontSize: ["3xl", null, null, "4xl"],
    },
    keyMessageTitle: {
      fontSize: ["md", "lg", "xl"],
      fontWeight: 600,
      lineHeight: "shorter",
    },
    statisticTitle: {
      fontSize: ["2xl", null, null, "4xl"],
      fontWeight: 600,
      lineHeight: "shorter",
    },
  },
}

export default headingTheme
