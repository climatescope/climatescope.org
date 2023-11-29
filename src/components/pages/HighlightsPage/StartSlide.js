import { useRef, useEffect } from "react"

import { Center } from "@chakra-ui/react"
import { useIntersectionObserver } from "usehooks-ts"

import useHighlightsStore from "@utils/store/highlightsStore"

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
      {"Scroll to start"}
    </Center>
  )
}
