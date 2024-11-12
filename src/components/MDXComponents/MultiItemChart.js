import {
  SimpleGrid,
  Box,
  Text,
  Heading,
  VisuallyHidden,
  useTheme,
  Center,
} from "@chakra-ui/react"

import { CheckIcon, CloseIcon } from "@/components/Icon"

export default function MultiItemChart({ title, question, a1 }) {
  const { colors } = useTheme()
  return (
    <SimpleGrid
      columns={8}
      gridColumn={["1 / -1", null, null, null, "2 / -2"]}
      gridRowGap={4}
    >
      <Box gridColumn="span 2" px={3} display={["none", null, "inline"]}>
        <Text
          fontWeight={600}
          fontSize={["xs", null, "sm"]}
          textTransform="uppercase"
        >
          {"Type"}
        </Text>
      </Box>
      <Box gridColumn={["span 5", null, "span 3"]} px={3}>
        <Text
          fontWeight={600}
          fontSize={["xs", null, "sm"]}
          textTransform="uppercase"
        >
          {"Question"}
        </Text>
      </Box>
      <Box
        gridColumn={["span 3", null, "7 / -1"]}
        px={3}
        textAlign={["right", null, "center"]}
      >
        <Text
          fontWeight={600}
          fontSize={["xs", null, "sm"]}
          textTransform="uppercase"
        >
          {"Availability"}
        </Text>
      </Box>
      <SimpleGrid
        columns={8}
        gridColumn="1 / -1"
        border="0.125rem solid"
        borderRadius="md"
        py={4}
        style={{
          background: a1 ? colors.teal[100] : colors.gray[50],
          borderColor: a1 ? colors.teal[500] : colors.gray[50],
          color: a1 ? colors.teal[900] : colors.gray[500],
        }}
      >
        <Box
          gridColumn="span 2"
          px={3}
          display={["none", null, "inline"]}
          fontWeight={500}
          fontSize={["sm", null, "md"]}
          lineHeight="short"
        >
          <Heading as="h4" fontWeight={600}>
            {title}
          </Heading>
        </Box>
        <Box
          gridColumn={["span 7", null, "span 4"]}
          px={3}
          fontWeight={500}
          fontSize={["sm", null, "md"]}
          lineHeight="short"
        >
          <Text lineHeight="short">{question}</Text>
        </Box>
        <Center
          gridColumn={["span 1", null, "7 / -1"]}
          fontWeight={500}
          px={[0, null, 3]}
          pr={[3, null, 3]}
          justifySelf={["flex-end", null, "center"]}
        >
          {a1 ? (
            <Center
              w="2rem"
              h="2rem"
              bg="teal.500"
              color="white"
              borderRadius="full"
            >
              <VisuallyHidden>{"Yes"}</VisuallyHidden>
              <CheckIcon />
            </Center>
          ) : (
            <Center w="2rem" h="2rem" bg="gray.200" borderRadius="full">
              <VisuallyHidden>{"No"}</VisuallyHidden>
              <CloseIcon />
            </Center>
          )}
        </Center>
      </SimpleGrid>
    </SimpleGrid>
  )
}
