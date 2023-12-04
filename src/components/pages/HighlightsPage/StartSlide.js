import { useRef, useEffect } from "react"

import { Center, Stack, Text } from "@chakra-ui/layout"
import { useIntersectionObserver } from "usehooks-ts"

import useHighlightsStore from "@utils/store/highlightsStore"
import { ChevronDown } from "@components/Icon"

export default function StartSlide() {
  const ref = useRef(null)
  const updateSlide = useHighlightsStore((state) => state.updateSlide)
  const entry = useIntersectionObserver(ref, {
    threshold: 0,
  })
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    if (typeof window === "undefined") return
    if (isVisible) updateSlide(0)
  }, [isVisible])

  return (
    <Center ref={ref} position="relative">
      <Stack spacing={3} alignItems="center" color="gray.500">
        <Text fontWeight={600}>{"Scroll to start"}</Text>
        <ChevronDown size="2rem" />
      </Stack>
    </Center>
  )
}
