import {
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Box,
  VisuallyHidden,
  Center,
} from "@chakra-ui/react"

import { CheckIcon, CloseIcon } from "@/components/Icon"

export default function BooleanChart({ title, question, data }) {
  return (
    <Stack spacing={6} gridColumn={["1 / -1", null, "2 / -2"]}>
      {title && (
        <Heading as="h4" fontSize="2xl">
          {title}
        </Heading>
      )}
      {question && (
        <Text fontSize="xl" lineHeight="base">
          {question}
        </Text>
      )}
      <SimpleGrid
        columns={[1, null, null, 3]}
        w="100%"
        gridColumnGap={6}
        gridRowGap={6}
      >
        {[
          { key: 1, label: data.q1, value: data.a1 === "yes" },
          { key: 2, label: data.q2, value: data.a2 === "yes" },
          { key: 3, label: data.q3, value: data.a3 === "yes" },
        ].map((d) => {
          return d.value ? (
            <Box
              key={d.label}
              p={3}
              bg="purple.100"
              border="0.125rem solid"
              borderColor="purple.500"
              borderRadius="md"
              color="purple.900"
              fontWeight={600}
              position="relative"
              textTransform="capitalize"
            >
              {d.label}
              <VisuallyHidden>{": Yes"}</VisuallyHidden>
              <Center
                position="absolute"
                top={0}
                right={0}
                transform="translate(50%, -50%)"
                w="1.75rem"
                h="1.75rem"
                bg="purple.500"
                borderRadius="full"
                border="0.125rem solid white"
                color="white"
              >
                <CheckIcon size="1.25rem" />
              </Center>
            </Box>
          ) : (
            <Box
              key={d.label}
              p={3}
              bg="gray.50"
              color="gray.500"
              borderRadius="md"
              fontWeight={600}
              position="relative"
              textTransform="capitalize"
            >
              {d.label}
              <VisuallyHidden>{": No"}</VisuallyHidden>
              <Center
                position="absolute"
                top={0}
                right={0}
                transform="translate(50%, -50%)"
                w="1.75rem"
                h="1.75rem"
                bg="gray.200"
                borderRadius="full"
                border="0.125rem solid white"
                color="white"
              >
                <CloseIcon size="1.25rem" />
              </Center>
            </Box>
          )
        })}
      </SimpleGrid>
    </Stack>
  )
}
