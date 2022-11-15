const textTheme = {
  baseStyle: {
    lineHeight: "base",
    fontSize: "lg",
    fontWeight: 400,
  },
  defaultProps: { size: null },
  variants: {
    subtitle: {
      fontSize: ["lg", null, "2xl"],
      lineHeight: "short",
      fontWeight: 500,
    },
    sectionSubtitle: {
      fontSize: ["lg", null, "xl"],
      lineHeight: "short",
      color: "gray.500",
      fontWeight: 500,
    },
    sectionSubtitleLight: {
      fontSize: ["lg", null, "xl"],
      lineHeight: "short",
      color: "brand.100",
      fontWeight: 500,
    },
    lead: {
      fontSize: ["lg", null, "2xl"],
      fontWeight: 400,
    },
    kicker: {
      fontSize: ["sm", null, "sm"],
      fontWeight: 600,
      textTransform: "uppercase",
    },
    keyMessageText: {
      color: "gray.500",
      fontWeight: 500,
      lineHeight: "shorter",
    },
    footerLink: {
      fontSize: "md",
      lineHeight: "short",
      fontWeight: 500,
      color: "gray.700",
    },
    statisticText: {
      color: "gray.500",
      fontSize: ["md", null, "lg"],
      fontWeight: 500,
      lineHeight: "short",
    },
  },
}

export default textTheme
