import { Box, Divider } from "@chakra-ui/react"

const ProfileDivider = ({ slot = "reference", ...restProps }) => {

  // Based on gridGap of @components/SimpleGrid

  const mr = !slot || slot === "reference" ? [-3, null, -4, null, -5] : 0
  const ml = !slot || slot === 1 ? [-3, null, -4, null, -5] : 0
  const w = !slot
    ? ["calc(100% + 1.5rem)", null, "calc(100% + 2rem)", null, "calc(100% + 2.5rem)"]
    : ["calc(100% + 0.75rem)", null, "calc(100% + 1rem)", null, "calc(100% + 1.25rem)"]
  return (
    <Box>
      <Divider mr={mr} ml={ml} w={w} {...restProps} />
    </Box>
  )
}

export default ProfileDivider
