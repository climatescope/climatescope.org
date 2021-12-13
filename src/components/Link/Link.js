import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"

const Link = ({
  href,
  locale,
  prefetch,
  hrefAs,
  replace,
  scroll,
  shallow,
  ...restProps
}) => {
  return (
    <NextLink
      passHref
      href={href}
      locale={locale}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      as={hrefAs}
    >
      <ChakraLink {...restProps} />
    </NextLink>
  )
}

export default Link
