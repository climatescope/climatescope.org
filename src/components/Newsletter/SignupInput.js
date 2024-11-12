import { Input } from "@chakra-ui/react"

const SignupInput = ({ size = "lg", ...restProps }) => {
  return (
    <Input
      type="email"
      name="email"
      variant="outlined"
      h="3rem"
      placeholder="Your email address"
      border="0.0625rem solid"
      borderColor="gray.500"
      px={5}
      bg="black"
      _placeholder={{ color: "gray.700" }}
      _hover={{ bg: "gray.900" }}
      _focus={{
        bg: "black",
        borderColor: "brand.500",
        outline: "0.0625rem solid",
        outlineColor: "brand.500",
        outlineOffset: "0",
        boxShadow: "none",
      }}
      _active={{ bg: "gray.800" }}
      {...restProps}
    />
  )
}

export default SignupInput
