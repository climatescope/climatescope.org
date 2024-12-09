import { HStack, Text, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react"

import { useStore } from "./store"

export default function SelectedFilters() {
  const regions = useStore((state) => state.regions)
  const sectors = useStore((state) => state.sectors)
  const countries = useStore((state) => state.countries)
  const year = useStore((state) => state.year)

  const setYear = useStore((state) => state.setYear)
  const setPostFilters = useStore((state) => state.setPostFilters)

  const filterCount =
    regions.length +
    sectors.length +
    countries.length +
    year.filter((d) => d !== "all").length

  const keyOverrides = {
    "mena": "Middle East",
    "emea": "Europe",
    "amer": "Northern America",
    "latam": "Latin America",
    "ssa": "Africa",
    "apac": "Asia-Pacific",
  }

  return (
    <HStack spacing={2} flex={1} overflow="hidden" py={1}>
      {!filterCount && (
        <Text fontSize="sm" color="gray.500" fontWeight={600}>
          {"Showing all"}
        </Text>
      )}
      {regions.map((region) => (
        <Tag key={region}>
          <TagLabel>{keyOverrides[region] || region}</TagLabel>
          <TagCloseButton
            onClick={() => {
              setPostFilters({
                regions: regions.filter((d) => d !== region),
              })
            }}
          />
        </Tag>
      ))}
      {sectors.map((sector) => (
        <Tag key={sector}>
          <TagLabel>{sector}</TagLabel>
          <TagCloseButton
            onClick={() => {
              setPostFilters({
                sectors: sectors.filter((d) => d !== sector),
              })
            }}
          />
        </Tag>
      ))}
      {countries.map((country) => (
        <Tag key={country}>
          <TagLabel>{country}</TagLabel>
          <TagCloseButton
            onClick={() => {
              setPostFilters({
                countries: countries.filter((d) => d !== country),
              })
            }}
          />
        </Tag>
      ))}
      {year
        .filter((d) => d !== "all")
        .map((y) => (
          <Tag key={y}>
            <TagLabel>{y}</TagLabel>
            <TagCloseButton
              onClick={() => {
                setYear(
                  year.length === 1 ? ["all"] : year.filter((d) => d !== y)
                )
              }}
            />
          </Tag>
        ))}

      {/* <Tag>
        <TagLabel>{"Filter that is short"}</TagLabel>
        <TagCloseButton />
      </Tag>
      <Tag>
        <TagLabel>{"Shortest"}</TagLabel>
        <TagCloseButton />
      </Tag> */}
    </HStack>
  )
}
