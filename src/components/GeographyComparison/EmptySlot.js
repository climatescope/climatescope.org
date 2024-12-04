import { Stack, Box, Divider } from "@chakra-ui/react"

export default function EmptySlot() {
  return (
    <Stack spacing={5} bg="white" px={5}>
      <Box h={10} bg="gray.100" borderRadius="sm" />
      <Divider />
    </Stack>
  )
}
