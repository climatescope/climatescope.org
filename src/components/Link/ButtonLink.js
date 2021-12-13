import { Button } from "@chakra-ui/react"
import NextLink from "next/link"

const ButtonLink = ({
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
      <Button as="a" {...restProps} />
    </NextLink>
  )
}

export default ButtonLink
