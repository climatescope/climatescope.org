export default {
  baseStyle: {
    container: { borderRadius: "sm" },
    label: { lineHeight: "short", fontWeight: 600 },
    closeButton: {
      flex: "none",
      opacity: 1,
      _focusVisible: {
        outline: "0.125rem solid currentcolor",
        boxShadow: "none",
      },
    },
  },
  sizes: {
    md: {
      container: {
        "--tag-font-size": "fontSizes.sm",
        "--tag-min-height": "sizes.8",
        "--tag-min-width": "sizes.6",
        "--tag-padding-inline": "space.2",
      },
    },
  },
}
