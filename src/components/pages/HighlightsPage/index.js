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
          const colors = {
            "developed markets": "#0DA9D9",
            "developing markets": "#6363C4",
          }
          const fontWeights = {
            "developed markets": 600,
            "developing markets": 600,
          }

          const words = ["developed markets", "developing markets"]
          const description = extractWords(slide.description, words).map(
            (t) => ({
              color: colors[t.toLowerCase()] || "inherit",
              fontWeight: fontWeights[t.toLowerCase()] || "inherit",
              text: t,
            })
          )

          return (
            <Slide key={slide.id} slideId={slide.id}>
              <Stack spacing={5}>
                {slide.id === "7" ? (
                  <Heading fontSize="3xl">{slide.title}</Heading>
                ) : (
                  <Heading fontSize="xl">{slide.title}</Heading>
                )}

                <Text>
                  {description.map(({ color, fontWeight, text }) => (
                    <span style={{ color, fontWeight }}>{text}</span>
                  ))}
                </Text>
              </Stack>
            </Slide>
          )
        })}
      </Stack>
    </Container>
  )
}

function extractWords(text, words = []) {
  return words
    .reduce((acc, word) => acc.split(word).join(`__${word}__`), text)
    .split("__")
}
