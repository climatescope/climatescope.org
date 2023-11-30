import { useRef, useEffect } from "react"

import { Box, Center, Text } from "@chakra-ui/react"
import { useIntersectionObserver } from "usehooks-ts"

import useHighlightsStore from "@utils/store/highlightsStore"

export default function Slide({ slideId = 1, children }) {
  const ref = useRef(null)
  const updateSlide = useHighlightsStore((state) => state.updateSlide)
  const entry = useIntersectionObserver(ref, {
    threshold: slideId === "7" ? 0.25 : 0.5,
  })
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    if (typeof window === "undefined") return
    if (isVisible) updateSlide(slideId)
  }, [isVisible])

  return (
    <Center
      ref={ref}
      position="relative"
      pointerEvents="none"
      style={{ height: slideId === "7" ? "100vh" : "100vh" }}
    >
      {slideId !== "7" && slideId !== "12" ? (
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          px={10}
          py={6}
          w="100%"
          maxW="46rem"
          pointerEvents="all"
        >
          {children}
        </Box>
      ) : (
        <Box
          bg="white"
          px={10}
          py={6}
          w="100%"
          maxW="46rem"
          pointerEvents="all"
        >
          {children}
        </Box>
      )}
    </Center>
  )
}
