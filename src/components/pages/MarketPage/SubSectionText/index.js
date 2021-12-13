import { Stack, Heading, Text } from "@chakra-ui/react"

const SubSectionText = ({ title, paragraphs }) => {
  return (
    <Stack spacing={5} gridColumn={["1 / -1", null, null, "2 / span 5"]}>
      <Heading as="h3" fontSize="2xl">
        {title}
      </Heading>
      {paragraphs.map((text, i) => (
        <Text key={i} fontSize="lg">{text}</Text>
      ))}
    </Stack>
  )
}

export default SubSectionText
