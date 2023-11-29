import { forwardRef } from "react"
import { LinkOverlay as ChakraLinkOverlay } from "@chakra-ui/layout"
import NextLink from "next/link"

const LinkOverlay = forwardRef(
  (
    { href, locale, prefetch, hrefAs, replace, scroll, shallow, ...restProps },
    ref
  ) => {
    return (
      <NextLink
        ref={ref}
        passHref
        href={href}
        locale={locale}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        as={hrefAs}
        legacyBehavior
      >
        <ChakraLinkOverlay {...restProps} />
      </NextLink>
    )
  }
)

export default LinkOverlay
