import { Select } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

const roleItems = [
  { value: "1", label: "Government" },
  { value: "2", label: "Utility" },
  { value: "4", label: "Project developer" },
  { value: "8", label: "Investor" },
  { value: "16", label: "Researcher" },
  { value: "32", label: "Journalist" },
  { value: "64", label: "Other" },
]

const OrganizationDropdown = ({ value = "", onChange, ...restProps }) => {
  return (
    <Select
      name="Role"
      placeholder="Select a role"
      h="3rem"
      icon={<ChevronDownIcon />}
      border="0.0625rem solid"
      borderColor="gray.500"
      bg="black"
      _hover={{ bg: "gray.900" }}
      _focus={{
        bg: "transparent",
        borderColor: "brand.500",
        boxShadow: "none",
        outline: "0.0625rem solid",
        outlineColor: "brand.500",
        outlineOffset: "0",
      }}
      _active={{ bg: "gray.800" }}
      value={value}
      isRequired
      onChange={(e) => {
        if (!onChange) return
        onChange(e.target.value)
      }}
      {...restProps}
    >
      {roleItems.map(({ value, label }) => {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        )
      })}
    </Select>
  )
}

export default OrganizationDropdown
