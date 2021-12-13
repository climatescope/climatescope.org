import { Input } from "@chakra-ui/react"

const SignupInput = ({ size = "lg", ...restProps }) => {
  return (
    <Input
      type="email"
      name="email"
      variant="outlined"
      h="3rem"
      mb={["0.75rem", null, "0"]}
      placeholder="you@provider.tld"
      border="0.125rem solid"
      borderColor="gray.100"
      px={5}
      bg="white"
      _placeholder={{ color: "gray.300" }}
      _hover={{ bg: "white" }}
      _focus={{ borderColor: "brand.500", boxShadow: "outline" }}
      _active={{ bg: "white" }}
      {...restProps}
    />
  )
}

export default SignupInput
