import { memo } from "react"
import { Box, Center } from "@chakra-ui/react"
import ReactSlider from "react-slider"

const Slider = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        ".slider-thumb": { width: 0, h: "1.25rem" },
        ".slider-track": { h: "1.25rem" },
        ".slider-track-0": { color: "yellow.600", bg: "yellow.500" },
        ".slider-track-1": { color: "teal.600", bg: "teal.500" },
        ".slider-track-2": { color: "purple.600", bg: "purple.500" },
      }}
      pt="0.75rem"
      pb="1.75rem"
    >
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="slider-thumb"
        trackClassName="slider-track"
        value={value}
        ariaLabel={["Fundamentals", "Opportunities"]}
        marks={[0, 25, 50, 75, 100]}
        renderTrack={(props, state) => {
          const val = [
            state.value[0],
            state.value[1] - state.value[0],
            100 - state.value[1],
          ][state.index]

          const w =
            state.index === 0
              ? (props.style.right / (100 - val)) * val
              : state.index === 1
              ? ((props.style.right + props.style.left) / (100 - val)) * val
              : (props.style.left / (100 - val)) * val

          const isNameLabelTooNarrow = state.index === 1 ? w < 80 : w < 70
          const isValueLabelTooNarrow = state.index === 1 ? w < 80 : w < 60
          return (
            <Box {...props} borderRadius="md">
              <Box
                mt="-1.5rem"
                textAlign="center"
                fontWeight={600}
                overflow="hidden"
                lineHeight="1rem"
              >
                <Box
                  style={{
                    paddingLeft: !state.index ? "0" : "1.25rem",
                    paddingRight: state.index < 2 ? "1.25rem" : "0",
                    opacity: isNameLabelTooNarrow ? 0 : 1,
                  }}
                  transition="opacity 0.5s"
                >
                  <Box isTruncated fontSize="md" h="1.25rem">
                    {
                      ["Fundamentals", "Opportunities", "Experience"][
                        state.index
                      ]
                    }
                  </Box>
                </Box>
                <Box
                  style={{
                    paddingLeft: !state.index ? "0" : "1.5rem",
                    paddingRight: state.index < 2 ? "1.5rem" : "0",
                    color: "#FFF",
                    opacity: isValueLabelTooNarrow ? 0 : 1,
                  }}
                  transition="opacity 0.5s"
                  mt="0.375rem"
                  whiteSpace="nowrap"
                  fontSize="sm"
                  lineHeight="1rem"
                >
                  {`${val}%`}
                </Box>
              </Box>
            </Box>
          )
        }}
        renderMark={(props) => {
          return null
          // return (
          //   <Box {...props}>
          //     <Box
          //       w="0.125rem"
          //       transform={
          //         props.key === 0
          //           ? "none"
          //           : props.key === 100
          //           ? "translateX(-100%)"
          //           : "translateX(-50%)"
          //       }
          //       h="0.875rem"
          //       bg="gray.100"
          //       mt="1.375rem"
          //     />
          //     <Box transform="translateX(-50%)" fontSize="xs" lineHeight="short" fontWeight={600} color="gray.500">
          //       {`${props.key}%`}
          //     </Box>
          //   </Box>
          // )
        }}
        renderThumb={(props) => {
          return (
            <Box
              {...props}
              w="0"
              h="1rem"
              cursor="grab"
              sx={{
                ".raised-disc": {
                  boxShadow: "md",
                  transition: "background 0.25s",
                },
              }}
              _hover={{
                ".raised-disc": { bg: "gray.50" },
              }}
              _focus={{
                ".raised-disc": {
                  boxShadow: "outline",
                },
              }}
              _active={{
                cursor: "grabbing",
              }}
            >
              <Center
                w="2.5rem"
                h="2.5rem"
                mt="-0.75rem"
                ml="-1.25rem"
                bg="white"
                position="absolute"
                borderRadius="full"
                left={0}
                boxShadow="0 0 0 0.25rem #FFF"
              >
                <Center w="2.5rem" h="2.5rem" borderRadius="full" className="raised-disc">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path transform="translate(-6 0)" d="M15 18l-6-6 6-6" />
                    <path transform="translate(6 0)" d="M9 18l6-6-6-6" />
                  </svg>
                </Center>
              </Center>
            </Box>
          )
        }}
        pearling
        minDistance={0}
        onChange={onChange}
      />
    </Box>
  )
}

export default memo(Slider, (prev, next) => {
  return prev.value.join("") === next.value.join("")
})
