import { useEffect, useRef } from "react"
import {
  HStack,
  Stack,
  Container,
  Box,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  VisuallyHidden,
  Divider,
  useTheme,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

import { Link, ButtonLink } from "@components/Link"
import { DownloadIcon, CloseIcon, MenuIcon } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"
import Logo from "./Logo"

const includedLinks = [
  "/results",
  "/highlights",
  "/tools",
  "/sectors",
  "/about",
]

const SiteHeader = ({ navigation }) => {
  const { colors } = useTheme()
  const initialRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { route } = useRouter()

  const allNavigation = navigation.filter((d) => includedLinks.includes(d.path))

  useEffect(() => {
    onClose()
  }, [route])

  const aboutItems = [navigation.find((s) => s.path === "/about")]
  const extendedNavigation = navigation.filter(
    (d) => !["/about"].includes(d.path)
  )

  return (
    <Box
      style={{
        background: route === "/blog" ? colors.brand[900] : "white",
        color: route === "/blog" ? "white" : "inherit",
      }}
    >
      <Container>
        <HStack
          h={["4.5rem", null, null, "6rem"]}
          justifyContent="space-between"
        >
          <HStack spacing={[8, null, null, null, 12]}>
            <Logo />
            <HStack
              as="nav"
              spacing={10}
              flex="1"
              display={["none", null, null, "flex"]}
            >
              {allNavigation.map(({ title, path }) => {
                return (
                  <Link key={path} href={path} variant="mainNav">
                    {title}
                  </Link>
                )
              })}
            </HStack>
          </HStack>

          <HStack spacing={3}>
            {/* <ButtonLink
              href="/downloads/climatescope-2022-report-en.pdf"
              download="climatescope-2022-report.pdf"
              target="_blank"
              size="lg"
              flex="none"
              rightIcon={<DownloadIcon strokeWidth={1.75} />}
              colorScheme={route === "/blog" ? "white" : "brand"}
              display={["none", "flex"]}
            >
              {"Download report"}
            </ButtonLink> */}
            <ReportDownloadDialog />
            <Button
              onClick={onOpen}
              ref={initialRef}
              w="3rem"
              minW="2.5rem"
              h="3rem"
              colorScheme={route === "/blog" ? "white" : "gray"}
              borderRadius="full"
              p={0}
            >
              <VisuallyHidden>{"Open navigation"}</VisuallyHidden>
              <MenuIcon size={20} />
            </Button>
          </HStack>
        </HStack>
      </Container>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="none"
        initialFocusRef={initialRef}
        finalRef={initialRef}
      >
        <ModalContent
          my={0}
          maxW="100%"
          w="100%"
          h="100vh"
          position="fixed"
          top="0"
          bottom="0"
          borderRadius="0"
          bg="teal.900"
          color="white"
          style={{ overflowY: "scroll" }}
        >
          <ModalBody p={0}>
            <Container top={0} position="sticky" bg="teal.900" zIndex={1}>
              <HStack
                h={["4.5rem", null, null, "6rem"]}
                spacing={12}
                justifyContent="space-between"
              >
                <Logo />

                <HStack
                  spacing={10}
                  flex="1"
                  display={["none", null, null, "flex"]}
                >
                  {allNavigation.map(({ title, path }) => {
                    return (
                      <Link key={path} href={path} variant="mainNav">
                        {title}
                      </Link>
                    )
                  })}
                </HStack>
                <Box>
                  <Button
                    onClick={onClose}
                    ref={initialRef}
                    w="3rem"
                    minW="2.5rem"
                    p={0}
                    h="3rem"
                    colorScheme="whiteAlpha"
                    borderRadius="full"
                  >
                    <VisuallyHidden>{"Close navigation"}</VisuallyHidden>
                    <CloseIcon size={20} />
                  </Button>
                </Box>
              </HStack>
            </Container>

            <Container>
              <SimpleGrid columns={[1, null, null, 8]} py={10}>
                <Stack spacing={[5, null, 10]} gridColumn="span 2">
                  <Stack flex="1" spacing={[5, null, 10]}>
                    <Text color="teal.100" fontSize={["md", null, "lg"]}>
                      {
                        "Climatescope is a snapshot of where clean energy policy and finance stand today, and a guide to what can happen in the future."
                      }
                    </Text>
                    <ButtonLink
                      href="/downloads/climatescope-2023-report-en.pdf"
                      download="climatescope-2023-report.pdf"
                      target="_blank"
                      size="lg"
                      flex="none"
                      rightIcon={<DownloadIcon strokeWidth={1.75} />}
                      variant="outline"
                      colorScheme="white"
                      display={["none", "flex"]}
                    >
                      {"Download report"}
                    </ButtonLink>
                    
                  </Stack>
                  {aboutItems.map((navItem) => {
                    return (
                      <Stack spacing={[5, null, 10]} key={navItem.path}>
                        <Link
                          href={navItem.path}
                          fontWeight={700}
                          fontSize={["xl", null, "3xl"]}
                          lineHeight="shorter"
                          color="teal.100"
                        >
                          {navItem.title}
                        </Link>
                        {navItem.links.length && (
                          <Stack spacing={3}>
                            {navItem.links.map((d) => {
                              return (
                                <Link
                                  key={d.path}
                                  href={d.path}
                                  fontSize={["md", null, "xl"]}
                                  lineHeight="short"
                                  color="teal.100"
                                >
                                  {d.title}
                                </Link>
                              )
                            })}
                          </Stack>
                        )}
                        <Divider borderColor="gray.700" />
                      </Stack>
                    )
                  })}
                </Stack>
                <Stack spacing={[5, null, 10]} gridColumn="span 3">
                  {extendedNavigation.slice(0, 3).map((navItem) => {
                    return (
                      <Stack spacing={[5, null, 10]} key={navItem.path}>
                        <Link
                          href={navItem.path}
                          fontWeight={700}
                          fontSize={["xl", null, "3xl"]}
                          lineHeight="shorter"
                        >
                          {navItem.title}
                        </Link>
                        {navItem.links.length && (
                          <Stack spacing={3}>
                            {navItem.links.map((d) => {
                              return (
                                <Box key={d.title}>
                                  <Link
                                    key={d.path}
                                    href={d.path}
                                    fontSize={["md", null, "xl"]}
                                    lineHeight="short"
                                  >
                                    {d.title}
                                  </Link>
                                </Box>
                              )
                            })}
                          </Stack>
                        )}
                        <Divider borderColor="gray.700" />
                      </Stack>
                    )
                  })}
                </Stack>
                <Stack spacing={[5, null, 10]} gridColumn="span 3">
                  {extendedNavigation.slice(3).map((navItem) => {
                    return (
                      <Stack spacing={[5, null, 10]} key={navItem.path}>
                        <Link
                          href={navItem.path}
                          fontWeight={700}
                          fontSize={["xl", null, "3xl"]}
                          lineHeight="shorter"
                        >
                          {navItem.title}
                        </Link>
                        {navItem.links.length && (
                          <Stack spacing={3}>
                            {navItem.links.map((d) => {
                              return (
                                <Link
                                  key={d.path}
                                  href={d.path}
                                  fontSize={["md", null, "xl"]}
                                  lineHeight="short"
                                >
                                  {d.title}
                                </Link>
                              )
                            })}
                          </Stack>
                        )}
                        <Divider borderColor="gray.700" />
                      </Stack>
                    )
                  })}
                </Stack>
              </SimpleGrid>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

function ReportDownloadDialog() {
  const { route } = useRouter()
  return (
    <>
      <Button
        as={Link}
        href="/downloads/climatescope-2023-report-en.pdf"
        // download="climatescope-2023-report.pdf"
        target="_blank"
        size="lg"
        flex="none"
        rightIcon={<DownloadIcon strokeWidth={1.75} />}
        colorScheme={route === "/blog" ? "white" : "brand"}
        display={["none", "flex"]}
      >
        {"Download report"}
      </Button>
    </>
  )
}

export default SiteHeader
