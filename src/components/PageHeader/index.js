import {
  Box,
  Stack,
  HStack,
  Container,
  Button,
  SimpleGrid,
} from "@chakra-ui/react"

import { ButtonLink } from "@/components/Link"
import { ArrowLeftIcon, ShareIcon } from "@/components/Icon"

export function PageHeader(props) {
  return (
    <Box as="header">
      <Container>
        <SimpleGrid columns={8} gridColumnGap={10} gridRowGap={0} {...props} />
      </Container>
    </Box>
  )
}

export function PageHeaderContent(props) {
  return <Stack spacing={5} py={10} gridColumn={["1 / -1", null, null, "1 / span 5"]} {...props} />
}

export function PageHeaderSubnavigation(props) {
  return (
    <HStack
      h={16}
      spacing={10}
      justifyContent="space-between"
      borderTop="0.0625rem solid"
      borderColor="gray.200"
      gridColumn="1 / -1"
      {...props}
    />
  )
}

export function PageHeaderBackButton(props) {
  return (
    <ButtonLink
      href="/"
      colorScheme="gray"
      variant="ghost"
      borderRadius="sm"
      leftIcon={<ArrowLeftIcon size="1.25rem" />}
      pl={3}
      {...props}
    />
  )
}

export function PageHeaderShareButton(props) {
  return (
    <Button
      colorScheme="gray"
      borderRadius="sm"
      rightIcon={<ShareIcon size="1.25rem" />}
      {...props}
    />
  )
}
