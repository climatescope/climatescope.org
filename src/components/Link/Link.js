import { forwardRef } from "react"
import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"

const Link = forwardRef(
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
        <ChakraLink {...restProps} />
      </NextLink>
    )
  }
)

export default Link
