import { Box, Heading, Text, Stack } from "@chakra-ui/react"

import { Link } from "@components/Link"

const components = {
  h1: (props) => {
    return (
      <Heading
        as="h1"
        w="100%"
        fontSize={["3xl", null, "5xl"]}
        maxW="container.sm"
        {...props}
      />
    )
  },
  h2: (props) => {
    return (
      <Heading
        as="h2"
        w="100%"
        fontSize={["xl", null, "2xl", "3xl"]}
        maxW="container.sm"
        // pt={4}
        {...props}
      />
    )
  },
  h3: (props) => {
    return (
      <Heading
        as="h3"
        w="100%"
        fontSize={["xl", null, "2xl"]}
        maxW="container.sm"
        {...props}
      />
    )
  },
  a: (props) => {
    return (
      <Link
        fontWeight={600}
        textDecoration="underline"
        _hover={{ color: "teal.500" }}
        _active={{ color: "teal.500" }}
        _focus={{ color: "teal.500" }}
        {...props}
      />
    )
  },
  p: (props) => {
    return (
      <Text
        as="p"
        w="100%"
        fontSize={["md", null, "xl"]}
        maxW="container.sm"
        sx={{
          "code": {
            display: "inline-block",
            bg: "teal.100",
            px: "0.25rem",
            fontSize: "0.875em",
          },
          "a": {
            color: "teal.700",
            _hover: { textDecoration: "underline" },
            _focus: { textDecoration: "underline" },
          },
        }}
        {...props}
      />
    )
  },
  pre: (props) => {
    const cssClasses = props?.children?.props?.className || ""
    const langClass = cssClasses
      .split(" ")
      .find((s) => s.trim().split("-")[0] === "language")
    const lang = langClass.split("-")[1]
    return (
      <Box w="100%" maxW="container.sm">
        <Text as="span" py="0.5rem" px="1rem" bg="gray.200" color="gray.500">
          {lang}
        </Text>
        <Box
          as="pre"
          bg="gray.50"
          p="1rem"
          overflowX="scroll"
          overflowY="hidden"
          fontSize={["md", null, "lg"]}
          lineHeight="1.5rem"
          {...props}
        />
      </Box>
    )
  },
  ul: (props) => {
    return (
      <Stack
        as="ul"
        spacing={2}
        w="100%"
        maxW="container.sm"
        pl={6}
        fontSize={["md", null, "lg"]}
        lineHeight="2rem"
        {...props}
      />
    )
  },
  ol: (props) => {
    return (
      <Stack
        as="ol"
        spacing={5}
        w="100%"
        maxW="container.sm"
        pl={6}
        fontSize={["md", null, "lg"]}
        lineHeight="2rem"
        {...props}
      />
    )
  },
  blockquote: (props) => {
    return (
      <Box
        as="blockquote"
        fontWeight={700}
        borderLeft="0.5rem solid"
        borderColor="teal.500"
        pl={5}
        py={2}
        sx={{
          "> p": { fontFamily: "heading", fontSize: "2xl", lineHeight: "base" },
        }}
        {...props}
      />
    )
  },
}

export default components
