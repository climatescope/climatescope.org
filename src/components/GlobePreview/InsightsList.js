import { Stack, HStack, Box, Heading, Text } from "@chakra-ui/layout"
import { useTheme } from "@chakra-ui/react"

import { LinkBox, LinkOverlay } from "@/components/Link"

const InsightsList = ({ insights, currentInsight, setCurrentInsight }) => {
  const { colors } = useTheme()
  return (
    <Stack spacing={5} w="100%">
      {insights.map(({ key, title, href, description }) => {
        const isHighlighted = currentInsight === key - 1
        return (
          <LinkBox
            key={key}
            onMouseEnter={() => setCurrentInsight(key - 1)}
            _active={{ bg: "gray.900" }}
          >
            <HStack
              p={5}
              spacing={5}
              borderLeft="0.25rem solid"
              borderColor="transparent"
              style={{
                borderColor: isHighlighted ? colors.brand[500] : "transparent",
              }}
            >
              <Stack spacing={1} flex="1">
                <Heading
                  as="h3"
                  textStyle="cardButtonHeading"
                  style={{ color: isHighlighted ? colors.brand[500] : "white" }}
                >
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
                <Text
                  textStyle="cardButtonSubheading"
                  style={{ color: isHighlighted ? "white" : colors.gray[500] }}
                >
                  {description}
                </Text>
              </Stack>
              <Box flex="none" borderRadius="full">
                {/* <ChevronRight /> */}
              </Box>
            </HStack>
          </LinkBox>
        )
      })}
    </Stack>
  )
}

export default InsightsList
