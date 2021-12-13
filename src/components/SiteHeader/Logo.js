import { Text } from "@chakra-ui/react"
import { Link } from "@components/Link"

const Logo = () => {
  return (
    <Link href="/" fontWeight={700} lineHeight="1" variant="stealth">
      <Text
        as="span"
        textTransform="uppercase"
        fontWeight={700}
        fontFamily="heading"
        fontSize="2xl"
        lineHeight="none"
        letterSpacing="-0.03125rem"
      >
        {"Climatescope"}
      </Text>
      <Text
        as="span"
        display="block"
        fontSize="sm"
        lineHeight="none"
        color="gray.500"
      >
        {"by "}
        <Text
          as="span"
          color="gray.300"
          fontFamily="Avenir, system-ui, sans-serif"
        >
          {"BloombergNEF"}
        </Text>
      </Text>
    </Link>
  )
}

export default Logo
