import { Select } from "@chakra-ui/react"

const RegionSelector = ({ value, onChange, ...restProps }) => {
  return (
    <Select
      minW="0"
      maxW="13rem"
      variant="filled"
      colorScheme="gray"
      flex={["1", null, null, "none"]}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...restProps}
    >
      <option value="">{"All regions"}</option>
      <option value="amer">{"Americas"}</option>
      <option value="asia">{"Asia-Pacific"}</option>
      <option value="eu">{"Europe"}</option>
      <option value="mena">{"Middle East & Africa"}</option>
    </Select>
  )
}

export default RegionSelector
