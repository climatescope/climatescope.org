import { Stack, HStack, Box, Heading, Text } from "@chakra-ui/layout"
import { useTheme } from "@chakra-ui/system"

import { LinkBox, LinkOverlay } from "@components/Link"
import { GreenIdeaIcon, ChevronRight } from "@components/Icon"

const InsightsList = ({ insights, currentInsight, setCurrentInsight }) => {
  const { colors } = useTheme()
  return (
    <Stack spacing={5} w="100%">
      {insights.map(({ key, title, href, description }) => {
        return (
          <LinkBox key={key} onMouseEnter={() => setCurrentInsight(key - 1)}>
            <HStack
              p={5}
              spacing={5}
              borderRadius="md"
              style={{
                background:
                  currentInsight === key - 1
                    ? colors.brand[700]
                    : colors.brand[800],
              }}
            >
              <Box
                bg="brand.900"
                color="yellow.500"
                flex="none"
                borderRadius="full"
                p={4}
              >
                <GreenIdeaIcon strokeWidth={1.5} />
              </Box>
              <Stack spacing={1} flex="1">
                <Heading variant="keyMessageTitle" as="h3">
                  <LinkOverlay
                    href={href}
                    onFocus={() => setCurrentInsight(key - 1)}
                    _focusVisible={{
                      outline: "0.125rem solid",
                      outlineColor: "whiteAlpha.800",
                      outlineOffset: "0.125rem",
                    }}
                  >
                    {title}
                  </LinkOverlay>
                </Heading>
                <Text variant="keyMessageText" color="brand.100">
                  {description}
                </Text>
              </Stack>
              <Box flex="none" borderRadius="full">
                <ChevronRight />
              </Box>
            </HStack>
          </LinkBox>
        )
      })}
    </Stack>
  )
}

export default InsightsList
