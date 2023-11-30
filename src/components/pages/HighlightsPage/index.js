import { useEffect } from "react"
import { Container, Heading, Stack, Text } from "@chakra-ui/layout"
import { useTheme } from "@chakra-ui/system"

import Slide from "@components/pages/HighlightsPage/Slide"
import Visual from "@components/pages/HighlightsPage/Visual"
import StartSlide from "@components/pages/HighlightsPage/StartSlide"
import useHighlightsStore from "@utils/store/highlightsStore"

export default function HighlightsPage({ data, policies, slides }) {
  const { colors } = useTheme()
  const setInitialData = useHighlightsStore((state) => state.setInitialData)

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    if (!data) return undefined
    if (!policies) return undefined
    setInitialData(data, policies, slides, colors)
  }, [data, policies])

  return (
    <Container>
      <Stack spacing={0} pt={10} textAlign="center">
        <Stack spacing={8} alignItems="center" pb={20}>
          <Heading as="h1" variant="pageTitle">
            {"Climatescope 2023 highlights"}
          </Heading>
          <Text variant="subtitle" maxW="58rem">
            {
              "Climatescope is BNEF’s annual assessment of energy transition opportunities around the world. Now in its 12th year, the project surveys the power, transport and buildings sectors in 140 developing and developed markets. The 2023 edition also boasts a new deep dive into in the correlation between effective policy mechanisms and renewable energy investment."
            }
          </Text>
        </Stack>

        <StartSlide />

        <Visual />

        {slides.map((slide) => {
          return (
            <Slide key={slide.id} slideId={slide.id}>
              <Stack spacing={3}>
                {/* <Text>{slide.id || "Missing slide id"}</Text> */}
                <Heading>{slide.title || "Missing title"}</Heading>
                <Text>{slide.description || "Missing description"}</Text>
                {/* <Text fontSize="xs">
                  {slide.visual || "Missing visual description"}
                </Text> */}
              </Stack>
            </Slide>
          )
        })}
      </Stack>
      {/* <Stack spacing={20} pt={10} pb={40} textAlign="center">
        {slides.slice(8).map((slide) => {
          return (
            <Slide key={slide.id} slideId={slide.id}>
              <Stack spacing={3}>
                <Text>{slide.id || "Missing slide id"}</Text>
                <Heading>{slide.title || "Missing title"}</Heading>
                <Text>{slide.description || "Missing description"}</Text>
                <Text fontSize="xs">
                  {slide.visual || "Missing visual description"}
                </Text>
              </Stack>
            </Slide>
          )
        })}
      </Stack> */}
    </Container>
  )
}
