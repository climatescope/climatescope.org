import {
  useTheme,
  Box,
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
} from "@chakra-ui/react"

export default function CustomTimeSlider({
  years,
  name,
  ticks = [],
  value,
  onChange,
  bg = "white",
  sliderTrackProps = {},
  sliderFilledTrackProps = {},
}) {
  const min = parseInt(years[0])
  const max = parseInt(years.slice(-1)[0])

  const { shadows, colors } = useTheme()

  return (
    <Box p={4} pt={6}>
      <Slider
        aria-label={name}
        value={value}
        onChange={(val) => onChange(`${val}`)}
        step={1}
        min={min}
        max={max}
      >
        {ticks.map((tick) => (
          <SliderMark
            key={tick}
            value={tick}
            mt={3}
            transform="translateX(-50%)"
            fontSize="sm"
            fontWeight={600}
          >
            {tick}
          </SliderMark>
        ))}
        <SliderMark
          value={value}
          textAlign="center"
          bg="brand.500"
          color="brand.1000"
          bottom="100%"
          transform="translateX(-50%)"
          px={3}
          py={0.5}
          fontWeight={600}
          mb={2}
          borderRadius="sm"
        >
          {value}
        </SliderMark>
        <SliderTrack {...sliderTrackProps}>
          <SliderFilledTrack {...sliderFilledTrackProps} />
        </SliderTrack>
        <SliderThumb
          w={5}
          h={5}
          bg="brand.500"
          boxShadow={`${shadows.lg}, 0 0 0 0.25rem ${colors[bg]}`}
          _focus={{
            boxShadow: `${shadows.lg}, 0 0 0 0.25rem ${colors[bg]}`,
            outline: "0.125rem solid",
            outlineColor: "brand.500",
          }}
        />
      </Slider>
    </Box>
  )
}
