import { useEffect } from "react"
import { Container, Heading, Stack, Text } from "@chakra-ui/layout"
import { useTheme } from "@chakra-ui/system"

import Slide from "@components/pages/HighlightsPage/Slide"
import Visual from "@components/pages/HighlightsPage/Visual"
import StartSlide from "@components/pages/HighlightsPage/StartSlide"
import useHighlightsStore from "@utils/store/highlightsStore"

export default function HighlightsPage({ data, slides }) {
  const { colors } = useTheme()
  const setInitialData = useHighlightsStore((state) => state.setInitialData)

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    if (!data) return undefined
    setInitialData(data, slides, colors)
  }, [data])

  return (
    <Container>
      <Stack spacing={0} pt={10} textAlign="center">
        <Stack spacing={8} alignItems="center" pb={20}>
          <Heading as="h1" variant="pageTitle">
            {"Climatescope 2023 highlights"}
          </Heading>
          <Text variant="subtitle" maxW="58rem">
            {
              "Climatescope is BNEF's annual assessment of energy transition opportunities, covering the power, transport and buildings sectors across 136 countries. The project's 11th edition adds a new element by highlighting the top 10 markets for investment, capacity additions and policies."
            }
          </Text>
        </Stack>

        <StartSlide />

        <Visual />

        {slides.map((slide) => {
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
