import { forwardRef } from "react"
import { Button } from "@chakra-ui/react"
import NextLink from "next/link"

const ButtonLink = forwardRef(
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
        <Button as="a" {...restProps} />
      </NextLink>
    )
  }
)

export default ButtonLink
