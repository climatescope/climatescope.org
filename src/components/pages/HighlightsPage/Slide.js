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
      style={{ height: ["7", "8"].includes(slideId) ? "50vh" : "100vh" }}
    >
      {!["7", "8"].includes(slideId) && (
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          px={10}
          py={5}
          maxW="40rem"
          pointerEvents="all"
        >
          {children}
        </Box>
      )}
    </Center>
  )
}
