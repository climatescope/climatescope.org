import { Box, Heading, Text, Stack } from "@chakra-ui/react"

import { Link } from "@components/Link"
import SectorPageBanner from "@components/pages/SectorPage/Banner"
import AreaChart from "@components/SectorChart/AreaChart"
import LineChart from "@components/SectorChart/LineChart"
import BarChart from "@components/SectorChart/BarChart"
import MiniChart from "@components/MiniChart"
import Image from "@components/Image"

function ComponentWrapper(props) {
  return <Box gridColumn="1 / span 5" {...props} />
}

const components = {
  Image: (props) => {
    return (
      <ComponentWrapper>
        <Image {...props} />
      </ComponentWrapper>
    )
  },
  h1: (props) => null,
  h2: (props) => {
    return (
      <ComponentWrapper>
        <Heading
          as="h2"
          w="100%"
          fontSize={["xl", null, "2xl", "3xl"]}
          maxW="container.sm"
          // pt={4}
          {...props}
        />
      </ComponentWrapper>
    )
  },
  h3: (props) => {
    return (
      <ComponentWrapper>
        <Heading
          as="h3"
          w="100%"
          fontSize={["xl", null, "2xl"]}
          maxW="container.sm"
          {...props}
        />
      </ComponentWrapper>
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
      <ComponentWrapper>
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
      </ComponentWrapper>
    )
  },
  pre: (props) => {
    const cssClasses = props?.children?.props?.className || ""
    const langClass = cssClasses
      .split(" ")
      .find((s) => s.trim().split("-")[0] === "language")
    const lang = langClass.split("-")[1]
    return (
      <ComponentWrapper>
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
      </ComponentWrapper>
    )
  },
  ul: (props) => {
    return (
      <ComponentWrapper>
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
      </ComponentWrapper>
    )
  },
  ol: (props) => {
    return (
      <ComponentWrapper>
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
      </ComponentWrapper>
    )
  },
  blockquote: (props) => {
    return (
      <ComponentWrapper>
        <Box
          as="blockquote"
          fontWeight={700}
          borderLeft="0.5rem solid"
          borderColor="teal.500"
          pl={5}
          py={2}
          sx={{
            "> p": {
              fontFamily: "heading",
              fontSize: "2xl",
              lineHeight: "base",
            },
          }}
          {...props}
        />
      </ComponentWrapper>
    )
  },
  SectorPageBanner: (props) => {
    return (
      <Box gridColumn="1 / -1">
        <SectorPageBanner {...props} />
      </Box>
    )
  },
  AreaChart: (props) => {
    return (
      <Box gridColumn="1 / span 5">
        <AreaChart {...props} />
      </Box>
    )
  },
  LineChart: (props) => {
    return (
      <Box gridColumn="1 / span 5">
        <LineChart {...props} />
      </Box>
    )
  },
  BarChart: (props) => {
    return (
      <Box gridColumn="1 / span 5">
        <BarChart {...props} />
      </Box>
    )
  },
  MiniChart: (props) => {
    return (
      <Box gridColumn="1 / span 5">
        <MiniChart {...props} />
      </Box>
    )
  },
}

export default components
