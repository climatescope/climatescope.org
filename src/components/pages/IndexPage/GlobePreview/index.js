import { useState, useMemo, useEffect } from "react"
import { Box, Stack, Heading, Text, Container } from "@chakra-ui/react"

import { ButtonLink } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import Globe from "./Globe"
import InsightsList from "./InsightsList"

const GlobePreview = ({
  globeInsights,
  title = "Explore 2021 results",
  description = "Discover our 2021 ranking of 136 most attractive markets for 3 different sectors.",
  actionText = "Explore the results",
  actionHref = "/results/",
}) => {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const insights = useMemo(() => {
    const group = [
      globeInsights.slice(0, 3),
      globeInsights.slice(3, 6),
      globeInsights.slice(6),
    ][Math.floor(Math.random() * 3)]
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
          <Box gridColumn="span 5" px={20}>
            {loaded && (
              <Globe
                currentInsight={currentInsight}
                insights={insights}
                setCurrentInsight={setCurrentInsight}
              />
            )}
          </Box>
          <Box gridColumn="span 3">
            <Stack spacing={10} alignItems="flex-start">
              <Heading fontSize={["3xl", null, null, "4xl"]}>{title}</Heading>
              <Text fontSize="lg" lineHeight="short" color="brand.100">
                {description}
              </Text>
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
