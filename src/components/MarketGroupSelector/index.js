import { Select } from "@chakra-ui/react"

const MarketGroupSelector = ({ value, onChange, ...restProps }) => {
  return (
    <Select
      w="13rem"
      variant="filled"
      colorScheme="gray"
      flex={["1", null, null, "none"]}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...restProps}
    >
      <option value="">{"All markets"}</option>
      <option value="emerging">{"Emerging markets"}</option>
      <option value="developed">{"Developed markets"}</option>
    </Select>
  )
}

export default MarketGroupSelector
