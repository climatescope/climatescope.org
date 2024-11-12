import {
  Container,
  Box,
  HStack,
  Stack,
  Button,
  Drawer,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
  DrawerFooter,
  useDisclosure,
  Divider,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"

import { NavigationIcon, DownloadIcon } from "@/components/Icon"
import { ButtonLink, Link } from "@/components/Link"
import ClimatescopeLogo from "@/components/Logo"

const navigationItems = [
  { href: "/results", label: "Results" },
  { href: "/highlights", label: "Highlights" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
]

export default function SiteHeader() {
  return (
    <Box as="header">
      <Container>
        <HStack spacing={10} h={20} justifyContent="space-between">
          <Link href="/" flex="none" color="black">
            <ClimatescopeLogo />
          </Link>
          <HStack
            flex={1}
            spacing={2}
            fontWeight={600}
            display={["none", null, null, "flex"]}
          >
            {navigationItems.map((d) => {
              return (
                <ButtonLink
                  key={d.href}
                  href={d.href}
                  variant="ghost"
                  colorScheme="gray"
                  borderRadius="sm"
                  size="lg"
                  px={3}
                >
                  {d.label}
                </ButtonLink>
              )
            })}
          </HStack>
          <HStack spacing={3}>
            <ButtonLink
              href="/downloads/climatescope-emerging-markets-power-factbook-2024.pdf"
              download="climatescope-emerging-markets-power-factbook-2024.pdf"
              target="_blank"
              colorScheme="gray"
              size="lg"
              borderRadius="sm"
              rightIcon={<DownloadIcon />}
              pr={5}
              display={["none", null, null, null, "inline-flex"]}
            >
              {"Download report"}
            </ButtonLink>
            <NavigationDrawer />
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

function NavigationDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/results", label: "Results" },
    { href: "/highlights", label: "Highlights" },
    { href: "/reports", label: "Reports" },
    { href: "/tools", label: "Tools" },
    {},
    // { href: "/markets", label: "Markets" },
    // { href: "/blog", label: "Blog" },
    // {},
    { href: "/about", label: "About Climatescope" },
    { href: "/about/methodology", label: "Methodology" },
    { href: "/about/license", label: "License" },
    { href: "/about/contact", label: "Contact" },
  ].map((d, i) => ({ key: i + 1, ...d }))

  return (
    <>
      <Button
        colorScheme="gray"
        size="lg"
        borderRadius="sm"
        rightIcon={<NavigationIcon />}
        pr={5}
        onClick={onOpen}
      >
        {"Menu"}
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent bg="black" color="white">
          <DrawerHeader
            minH="5.0625rem"
            borderBottom="0.0625rem solid"
            borderColor="gray.700"
          >
            <DrawerCloseButton
              size="lg"
              borderRadius="full"
              top={5}
              _focusVisible={{
                outline: "0.125rem solid",
                outlineColor: "white",
                bg: "gray.800",
              }}
            />
          </DrawerHeader>
          <DrawerBody px={0} py={0}>
            <Stack spacing={0} py={5}>
              {navigationItems.map((item) => {
                return item.href ? (
                  <ButtonLink
                    key={item.key}
                    href={item.href}
                    colorScheme="gray"
                    color="white"
                    _hover={{
                      bg: "gray.800",
                      svg: { opacity: 1, transform: "translateX(0rem)" },
                    }}
                    _focusVisible={{
                      bg: "gray.800",
                      svg: { opacity: 1, transform: "translateX(0rem)" },
                    }}
                    _active={{
                      bg: "gray.700",
                      svg: { opacity: 1, transform: "translateX(0rem)" },
                    }}
                    variant="ghost"
                    justifyContent="space-between"
                    borderRadius={0}
                    onClick={onClose}
                    size="lg"
                    rightIcon={<ArrowForwardIcon w="1.5rem" h="1.5rem" />}
                    sx={{
                      svg: {
                        opacity: 0,
                        transform: "translateX(-0.5rem)",
                        transition: "all 0.3s",
                      },
                    }}
                  >
                    {item.label}
                  </ButtonLink>
                ) : (
                  <Divider
                    key={item.key}
                    borderColor="gray.700"
                    opacity={1}
                    my={5}
                  />
                )
              })}
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTop="0.0625rem solid" borderColor="gray.700">
            <ButtonLink
              href="/downloads/climatescope-emerging-markets-power-factbook-2024.pdf"
              download="climatescope-emerging-markets-power-factbook-2024.pdf"
              target="_blank"
              colorScheme="brand"
              size="lg"
              borderRadius="sm"
              rightIcon={<DownloadIcon />}
              w="100%"
            >
              {"Download report"}
            </ButtonLink>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
