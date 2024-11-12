import { useContext, createContext } from "react"
import {
  Box,
  HStack,
  Center,
  useRadioGroup,
  useRadio,
  useStyleConfig,
} from "@chakra-ui/react"

const RadioContext = createContext({
  value: { getRadioProps: () => null, colorScheme: "", size: "" },
})

export function RadioGroup({
  value,
  defaultValue,
  name = "Sample Radio Group",
  onChange,
  children,
  colorScheme,
  size,
  ...restProps
}) {
  const options = children
    .filter((d) => d.props.value)
    .map((d) => d.props.value)

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: defaultValue || options[0],
    value,
    onChange,
  })

  return (
    <RadioContext.Provider value={{ getRadioProps, colorScheme, size }}>
      <HStack {...getRootProps()} {...restProps}>
        {children}
      </HStack>
    </RadioContext.Provider>
  )
}

export function RadioGroupItem({ value, flex, ...restProps }) {
  const ctx = useContext(RadioContext)

  const { getInputProps, getRadioProps } = useRadio(
    ctx.getRadioProps({ value })
  )

  const input = getInputProps()
  const checkbox = getRadioProps()

  const styles = useStyleConfig("Button", {
    variant: input.checked ? "solid" : "ghost",
    colorScheme: ctx.colorScheme,
    size: ctx.size,
  })

  return (
    <Box as="label" flex={flex}>
      <input {...input} />
      {/* <Center
        {...checkbox}
        cursor="pointer"
        fontWeight={600}
        bg="gray.100"
        transition="background 0.2s"
        _checked={{
          bg: "blue.500",
          color: "white",
        }}
        _focusVisible={{
          outline: "0.125rem solid black",
          outlineOffset: "0.125rem",
        }}
        h={10}
        px={3}
        {...restProps}
      /> */}
      <Center {...checkbox} {...styles} cursor="pointer" {...restProps} />
    </Box>
  )
}
