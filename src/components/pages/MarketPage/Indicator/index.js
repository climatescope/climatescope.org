import {
  Box,
  Center,
  Stack,
  // Flex,
  HStack,
  Heading,
  Text,
  useDisclosure,
  Collapse,
  Divider,
  useTheme,
} from "@chakra-ui/react"

// import SimpleGrid from "@components/SimpleGrid"
import { CheckIcon, CloseIcon } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"

const BooleanItems = ({ data }) => {
  const { colors } = useTheme()
  return (
    <HStack spacing={5} p={5}>
      <Box
        flex="1"
        position="relative"
        p={4}
        border="0.125rem solid"
        borderRadius="md"
        fontWeight={600}
        style={{
          background: data.a1 ? colors.teal[100] : colors.gray[50],
          color: data.a1 ? colors.teal[900] : colors.gray[700],
          borderColor: data.a1 ? colors.teal[500] : colors.gray[50],
        }}
      >
        <Center
          position="absolute"
          top={0}
          right={0}
          transform="translate(50%, -50%)"
          w="1.75rem"
          h="1.75rem"
          borderRadius="full"
          border="0.125rem solid white"
          color="white"
          style={{
            background: data.a1 ? colors.teal[500] : colors.gray[200],
          }}
        >
          {
            data.a1 ? <CheckIcon size="1.25rem" /> : <CloseIcon size="1.25rem" />
          }
        </Center>
        {"Available"}
      </Box>
      <Box
        flex="1"
        position="relative"
        p={4}
        border="0.125rem solid"
        borderRadius="md"
        fontWeight={600}
        style={{
          background: data.a1 ? colors.gray[50] : colors.teal[100],
          color: data.a1 ? colors.gray[700] : colors.teal[900],
          borderColor: data.a1 ? colors.gray[50] : colors.teal[900],
        }}
      >
        <Center
          position="absolute"
          top={0}
          right={0}
          transform="translate(50%, -50%)"
          w="1.75rem"
          h="1.75rem"
          borderRadius="full"
          border="0.125rem solid white"
          color="white"
          style={{
            background: data.a1 ? colors.gray[200] : colors.teal[500],
          }}
        >
          {
            data.a1 ? <CloseIcon size="1.25rem" /> : <CheckIcon size="1.25rem" />
          }
        </Center>
        {"Not available"}
      </Box>
    </HStack>
  )
}

const MultiItems = ({ data }) => {
  const { colors } = useTheme()
  return (
    <SimpleGrid columns={3} gridColumnGap={5} p={5}>
      <Box
        flex="1"
        position="relative"
        p={4}
        border="0.125rem solid"
        borderRadius="md"
        fontWeight={600}
        gridColumn={["span 3", null, "span 1"]}
        style={{
          background: data.a1 ? colors.purple[100] : colors.gray[50],
          color: data.a1 ? colors.purple[900] : colors.gray[700],
          borderColor: data.a1 ? colors.purple[500] : colors.gray[50],
        }}
      >
        <Center
          position="absolute"
          top={0}
          right={0}
          transform="translate(50%, -50%)"
          w="1.75rem"
          h="1.75rem"
          borderRadius="full"
          border="0.125rem solid white"
          color="white"
          style={{
            background: data.a1 ? colors.purple[500] : colors.gray[200],
          }}
        >
          {
            data.a1 ? <CheckIcon size="1.25rem" /> : <CloseIcon size="1.25rem" />
          }
        </Center>
        {data.q1}
      </Box>
      <Box
        flex="1"
        position="relative"
        p={4}
        border="0.125rem solid"
        borderRadius="md"
        fontWeight={600}
        gridColumn={["span 3", null, "span 1"]}
        style={{
          background: data.a2 ? colors.purple[100] : colors.gray[50],
          color: data.a2 ? colors.purple[900] : colors.gray[700],
          borderColor: data.a2 ? colors.purple[500] : colors.gray[50],
        }}
      >
         <Center
          position="absolute"
          top={0}
          right={0}
          transform="translate(50%, -50%)"
          w="1.75rem"
          h="1.75rem"
          borderRadius="full"
          border="0.125rem solid white"
          color="white"
          style={{
            background: data.a2 ? colors.purple[500] : colors.gray[200],
          }}
        >
          {
            data.a2 ? <CheckIcon size="1.25rem" /> : <CloseIcon size="1.25rem" />
          }
        </Center>
        {data.q2}
      </Box>
      <Box
        flex="1"
        position="relative"
        p={4}
        border="0.125rem solid"
        borderRadius="md"
        fontWeight={600}
        gridColumn={["span 3", null, "span 1"]}
        style={{
          background: data.a3 ? colors.purple[100] : colors.gray[50],
          color: data.a3 ? colors.purple[900] : colors.gray[700],
          borderColor: data.a3 ? colors.purple[500] : colors.gray[50],
        }}
      >
         <Center
          position="absolute"
          top={0}
          right={0}
          transform="translate(50%, -50%)"
          w="1.75rem"
          h="1.75rem"
          borderRadius="full"
          border="0.125rem solid white"
          color="white"
          style={{
            background: data.a3 ? colors.purple[500] : colors.gray[200],
          }}
        >
          {
            data.a3 ? <CheckIcon size="1.25rem" /> : <CloseIcon size="1.25rem" />
          }
        </Center>
        {data.q3}
      </Box>
    </SimpleGrid>
  )
}

const Indicator = ({ data }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  if (!data) return null

  const indicator = data[0] || data

  if (!indicator) return null

  return (
    <Box border="0.0625rem solid" borderColor="gray.100" borderRadius="md">
      <HStack spacing={10} p={5}>
        <Stack spacing={2} flex="1">
          <Heading fontSize="xl">{indicator.indicators}</Heading>
          <Text color="gray.500">{indicator.question}</Text>
        </Stack>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <Divider borderColor="gray.100" />
        {indicator.isBoolean ? (
          <BooleanItems data={indicator} />
        ) : (
          <MultiItems data={indicator} />
        )}
        {/* <SimpleGrid
          columns={2}
          gridColumnGap={[5, null, null, 3, 5]}
          gridRowGap={4}
          p={5}
        >
          {[1, 2].map((card) => {
            const isSelected = card === 1
            return (
              <Flex
                key={card}
                position="relative"
                bg="gray.50"
                borderRadius="md"
                border="0.125rem solid"
                p={4}
                textAlign={["left", null, null, "center"]}
                fontWeight={600}
                alignItems="center"
                justifyContent={["left", null, null, "center"]}
                style={{
                  color: isSelected ? colors.teal[900] : colors.gray[700],
                  background: isSelected ? colors.teal[100] : colors.gray[50],
                  borderColor: isSelected ? colors.teal[500] : colors.gray[50],
                }}
              >
                <Stack spacing={2}>
                  <Text
                    fontSize={["md", null, null, "sm"]}
                    lineHeight="shorter"
                  >
                    {"State/Province level only"}
                  </Text>
                  <Text
                    lineHeight="shorter"
                    fontSize="sm"
                    display={["block", null, null, "none"]}
                  >
                    {"XX markets"}
                  </Text>
                </Stack>
                <Center
                  position="absolute"
                  top={0}
                  right={0}
                  transform="translate(50%, -50%)"
                  w="1.5rem"
                  h="1.5rem"
                  bg={isSelected ? "teal.500" : "gray.200"}
                  borderRadius="full"
                  border="0.125rem solid white"
                  color="white"
                >
                  {isSelected ? (
                    <CheckIcon size="1rem" />
                  ) : (
                    <CloseIcon size="1rem" />
                  )}
                </Center>
              </Flex>
            )
          })}
        </SimpleGrid> */}
      </Collapse>
    </Box>
  )
}

export default Indicator
