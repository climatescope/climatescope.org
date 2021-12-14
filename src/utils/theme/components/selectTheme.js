const selectTheme = {
  baseStyle: {
    field: {
      cursor: "pointer",
      lineHeight: "2rem",
      whiteSpace: "nowrap",
    },
  },
  sizes: {
    sm: { field: { borderRadius: "sm", px: 5, h: "2rem", fontSize: "md" } },
    md: { field: { borderRadius: "md", px: 5, h: "2.5rem", fontSize: "md" } },
    lg: { field: { borderRadius: "md", px: 5, h: "3rem", fontSize: "md" } },
  },
  variants: {
    filled: ({ colorScheme = "gray" }) => ({
      field: {
        bg: `${colorScheme}.50`,
        fontWeight: 600,
        _hover: {
          bg: `${colorScheme}.100`,
        },
        _focus: {
          bg: `${colorScheme}.100`,
          boxShadow: "outline",
        },
      },
    }),
    outline: {
      field: {
        border: "0.125rem solid",
        borderColor: "gray.100",
        _hover: { borderColor: "gray.200" },
        _focus: { borderColor: "teal.500", boxShadow: "outline" },
        _active: { borderColor: "gray.300", boxShadow: "outline" },
      },
    },
  },
}

export default selectTheme
