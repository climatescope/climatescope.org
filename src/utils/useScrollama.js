import { useEffect } from "react"
import scrollama from "scrollama"
import create from "zustand"

export const useScrollStore = create((set) => ({
  scroller: null,
  setScroller: (scroller) => set({ scroller }),

  currentStep: 0,
  setCurrentStep: (currentStep) => set({ currentStep }),
}))

export const useScroller = ({
  container,
  onStepEnter,
  onStepExit,
  debug = false,
  offset = 0.33,
}) => {
  const scroller = useScrollStore((state) => state.scroller)
  const setScroller = useScrollStore((state) => state.setScroller)
  const setCurrentStep = useScrollStore((state) => state.setCurrentStep)

  useEffect(() => {
    if (typeof window === "undefined") return

    const step = container.current.querySelectorAll(`[data-scroll-step="true"]`)
    const s = scrollama()

    const scroller = s
      .setup({ step, debug, offset })
      .onStepEnter((a) => {
        if (onStepEnter) onStepEnter(a)
        setCurrentStep(a.index)
      })
      .onStepExit((a) => {
        if (onStepExit) onStepExit(a)
      })

    setScroller(scroller)

    const handleResize = () => {
      scroller.resize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      scroller.destroy()
      setScroller(null)
      setCurrentStep(0)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return scroller
}
