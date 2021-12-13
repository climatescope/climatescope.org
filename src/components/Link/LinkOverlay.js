import { LinkOverlay as ChakraLinkOverlay } from "@chakra-ui/react"
import NextLink from "next/link"

const LinkOverlay = ({
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
      <ChakraLinkOverlay {...restProps} />
    </NextLink>
  )
}

export default LinkOverlay
