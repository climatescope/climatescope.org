import { Box, Center, Stack, Heading, useTheme } from "@chakra-ui/react"

import SimpleGrid from "@components/SimpleGrid"
import { CheckIcon, CloseIcon } from "@components/Icon"

const CardTable = ({ data, sector, compact }) => {
  const { colors } = useTheme()

  const cards = data
    .filter((d) => d.sector === sector)
    .map((d) => ({
      text: d.policy,
      isSelected: d.answer.trim() === "Available",
    }))

  if (!cards.length) {
    return (
      <Box
        p={4}
        bg="gray.50"
        textAlign="center"
        borderRadius="md"
      >{`No ${sector.toLowerCase()} policies`}</Box>
    )
  }

  return (
    <Stack spacing={6}>
      <Heading fontSize="xl">{`${sector} policies`}</Heading>
      <SimpleGrid
        columns={compact ? 1 : [2, null, null, 3]}
        gridColumnGap={5}
        gridRowGap={5}
      >
        {cards.length &&
          cards.map(({ text, isSelected }, i) => {
            return (
              <Box
                key={i}
                position="relative"
                p={4}
                border="0.125rem solid"
                borderRadius="md"
                fontWeight={600}
                lineHeight="shorter"
                style={{
                  color: isSelected ? colors.purple[900] : colors.gray[700],
                  background: isSelected ? colors.purple[100] : colors.gray[50],
                  borderColor: isSelected
                    ? colors.purple[500]
                    : colors.gray[50],
                }}
              >
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
                {text}
                {isSelected && (
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
                )}
              </Box>
            )
          })}
      </SimpleGrid>
    </Stack>
  )
}

export default CardTable
