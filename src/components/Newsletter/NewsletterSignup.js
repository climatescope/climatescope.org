import { Box, HStack } from "@chakra-ui/react"

const NewsletterSignup = ({ children, m = "0 auto", ...restProps }) => {
  return (
    <Box w="100%" {...restProps}>
      <form>
        <HStack spacing={[0, null, 3]} flexWrap={["wrap", null, "nowrap"]}>
          {children}
        </HStack>
      </form>
    </Box>
  )
}

export default NewsletterSignup
