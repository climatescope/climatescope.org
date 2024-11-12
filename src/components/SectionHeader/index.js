import { Stack, Divider } from "@chakra-ui/react"

export default function SectionHeader({ dividerColor = "gray.200", ...props }) {
  return (
    <Stack
      as="header"
      spacing={4}
      divider={<Divider borderColor={dividerColor} />}
      {...props}
    />
  )
}
