import { Stack } from "@chakra-ui/react"

const NewsletterSignup = ({ children, m = "0 auto", ...restProps }) => {
  return (
    <Stack
      as="form"
      w="100%"
      spacing={3}
      flexWrap={["wrap", null, "nowrap"]}
      flexDirection="column"
      {...restProps}
    >
      {children}
    </Stack>
  )
}

export default NewsletterSignup
