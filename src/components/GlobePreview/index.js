import { useState, useMemo, useEffect } from "react"
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
} from "@chakra-ui/react"

import { ButtonLink } from "@/components/Link"
import SectionHeader from "@/components/SectionHeader"
import Globe from "./Globe"
import InsightsList from "./InsightsList"

const GlobePreview = ({
  globeInsights,
  title = "",
  description = "",
  actionText = "",
  actionHref = "/",
}) => {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const insights = useMemo(() => {
    if (globeInsights.length <= 3) {
      return globeInsights.map((d, i) => ({ key: parseInt(i + 1), ...d }))
    }
    const chunkedInsights = new Array(Math.ceil(globeInsights.length / 3))
      .fill()
      .map((d, i) => {
        const start = i * 3
        const insights = globeInsights.slice(start, start + 3)
        const missingItems = globeInsights.slice(0, 3 - insights.length)
        return [...insights, ...missingItems]
      })
    const group =
      chunkedInsights[Math.floor(Math.random() * chunkedInsights.length)]
    return group.map(({ key, coordinates, description, ...restProps }, i) => {
      return {
        key: parseInt(i + 1),
        description: description.trim(),
        ...restProps,
        coordinates: coordinates.map((d) => parseFloat(d)),
      }
    })
  }, [globeInsights])

  useEffect(() => {
    if (typeof window === "undefined") return
    setLoaded(true)
  }, [])

  return (
    <Box
      position="relative"
      bg="black"
      color="white"
      w="100vw"
      left="50%"
      transform="translateX(-50%)"
      py={24}
    >
      <Container>
        <SimpleGrid
          columns={[1, null, null, 8]}
          gridColumnGap={[0, null, null, 6]}
          alignItems="center"
        >
          <Box gridColumn={["span 5", null, "span 6", "span 5"]} px={20}>
            <Box mx="auto" maxW={["24rem", null, "32rem", "40rem"]}>
              {loaded && (
                <Globe
                  currentInsight={currentInsight}
                  insights={insights}
                  setCurrentInsight={setCurrentInsight}
                />
              )}
            </Box>
          </Box>
          <Box gridColumn="span 3">
            <Stack spacing={10} alignItems="flex-start">
              <SectionHeader w="100%" dividerColor="gray.500">
                <Heading textStyle="sectionHeading">{title}</Heading>
                <Text textStyle="sectionSubheading">{description}</Text>
              </SectionHeader>
              {loaded && (
                <InsightsList
                  insights={insights}
                  currentInsight={currentInsight}
                  setCurrentInsight={setCurrentInsight}
                />
              )}
              <ButtonLink size="lg" href={actionHref}>
                {actionText}
              </ButtonLink>
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default GlobePreview
