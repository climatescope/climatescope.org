import { Box, Center, HStack } from "@chakra-ui/layout"
import { useRadioGroup, useRadio } from "@chakra-ui/radio"

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const radio = getRadioProps()

  return (
    <Box as="label" style={{ width: 100 / props.years.length + "%" }}>
      <input {...input} />
      <Center
        {...radio}
        cursor="pointer"
        borderRadius="full"
        fontSize={["xs", null, "sm", "md"]}
        fontWeight={600}
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
          boxShadow: "md",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        py={1}
      >
        {props.children}
      </Center>
    </Box>
  )
}

export default function CustomTimeSlider({
  years,
  value = "",
  onChange = () => {},
  bg = "gray.100",
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Year",
    defaultValue: years.slice(-1)[0],
    value,
    onChange: (val) => onChange(val),
  })
  const group = getRootProps()
  const extent = [years[0], years.slice(-1)[0]]
  return (
    <HStack
      {...group}
      spacing={0}
      bg={bg}
      p={1}
      borderRadius="full"
      userSelect="none"
    >
      {years.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} years={years} {...radio}>
            {!extent.includes(value) ? "'" + `${value}`.slice(2) : value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
