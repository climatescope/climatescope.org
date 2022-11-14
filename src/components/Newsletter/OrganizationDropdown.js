import { Select } from "@chakra-ui/react"
import { ChevronDown } from "@components/Icon"

const roleItems = [
  { value: "1", label: "Government" },
  { value: "2", label: "Utility" },
  { value: "4", label: "Project developer" },
  { value: "8", label: "Investor" },
  { value: "16", label: "Researcher" },
  { value: "32", label: "Journalist" },
  { value: "64", label: "Other" },
]

const OrganizationDropdown = ({
  bg = "white",
  value = "",
  onChange,
  ...restProps
}) => {
  return (
    <Select
      name="Role"
      placeholder="Select a role"
      h="3rem"
      icon={<ChevronDown />}
      border="0.125rem solid"
      borderColor="gray.100"
      bg={bg}
      _hover={{ bg: "white" }}
      _focus={{ borderColor: "brand.500", boxShadow: "outline" }}
      _active={{ bg: "white" }}
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
