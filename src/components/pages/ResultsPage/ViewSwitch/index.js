import { Box, Center, HStack, useRadioGroup, useRadio, VisuallyHidden } from "@chakra-ui/react"

import { TableIcon, MapIcon } from "@components/Icon"

const defaultOptions = [
  { label: "Map", value: "map" },
  { label: "Table", value: "table" },
]

const RadioButton = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  return (
    <Box as="label">
      <input {...getInputProps()} />
      <Center
        {...getCheckboxProps()}
        borderRadius="full"
        bg="gray.50"
        w="2.5rem"
        h="2.5rem"
        cursor="pointer"
        _hover={{ bg: "gray.100" }}
        _checked={{ bg: "teal.800", color: "white" }}
        _focus={{ boxShadow: "outline" }}
        style={{
          pointerEvents: props.isChecked ? "none" : "all",
        }}
      >
        <VisuallyHidden>{props.iconLabel}</VisuallyHidden>
        {props.value === "map" ? <MapIcon size="20" strokeWidth={2} /> : null}
        {props.value === "table" ? (
          <TableIcon size="20" strokeWidth={2} />
        ) : null}
      </Center>
    </Box>
  )
}

export const RadioButtonGroup = ({
  options = defaultOptions,
  name = "View switch",
  value,
  onChange,
  ...restProps
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: "table",
    value,
    onChange,
  })

  const group = getRootProps()

  return (
    <HStack {...restProps} {...group}>
      {options.map(({ label, value }) => {
        const radio = getRadioProps({ value })
        return <RadioButton key={value} iconLabel={label} {...radio} />
      })}
    </HStack>
  )
}

export default RadioButtonGroup
