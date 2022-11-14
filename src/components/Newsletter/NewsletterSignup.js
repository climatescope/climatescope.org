import { Box, HStack, Stack } from "@chakra-ui/react"

const NewsletterSignup = ({ children, m = "0 auto", ...restProps }) => {
  return (
    <Box w="100%" {...restProps}>
      <form>
        <Stack spacing={3} flexWrap={["wrap", null, "nowrap"]}>
          {children}
        </Stack>
      </form>
    </Box>
  )
}

export default NewsletterSignup
