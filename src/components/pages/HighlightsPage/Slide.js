import { useRef, useEffect } from "react"

import { Box, Center } from "@chakra-ui/react"
import { useIntersectionObserver } from "usehooks-ts"

import useHighlightsStore from "@utils/store/highlightsStore"

export default function Slide({ slideId = 1, children }) {
  const ref = useRef(null)
  const updateSlide = useHighlightsStore((state) => state.updateSlide)
  const entry = useIntersectionObserver(ref, {
    threshold: 0.5,
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
      {slideId !== "7" ? (
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          px={10}
          py={5}
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
          py={5}
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
