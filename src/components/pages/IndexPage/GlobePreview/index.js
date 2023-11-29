import { useState, useMemo, useEffect } from "react"
import { Box, Stack, Heading, Text, Container } from "@chakra-ui/layout"
import getConfig from "next/config"

import { ButtonLink } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import Globe from "./Globe"
import InsightsList from "./InsightsList"

const { publicRuntimeConfig } = getConfig()
const year = publicRuntimeConfig.year

const GlobePreview = ({
  globeInsights,
  title = `Explore the ${year} results `,
  description = `Discover our ${year} ranking of the 140 most attractive markets for the power sector.`,
  actionText = "Explore the results",
  actionHref = "/results/",
}) => {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const insights = useMemo(() => {
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
    return group.map(({ key, lng, lat, description, ...restProps }, i) => {
      return {
        key: parseInt(i + 1),
        description: description.trim(),
        ...restProps,
        coordinates: [parseFloat(lng), parseFloat(lat)],
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
      bg="teal.900"
      color="white"
      w="100vw"
      left="50%"
      transform="translateX(-50%)"
      py={20}
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
              <Stack spacing={5}>
                <Heading variant="sectionTitle">{title}</Heading>
                <Text variant="sectionSubtitleLight">{description}</Text>
              </Stack>
              {loaded && (
                <InsightsList
                  insights={insights}
                  currentInsight={currentInsight}
                  setCurrentInsight={setCurrentInsight}
                />
              )}
              <ButtonLink
                size="lg"
                variant="outline"
                colorScheme="white"
                href={actionHref}
              >
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
