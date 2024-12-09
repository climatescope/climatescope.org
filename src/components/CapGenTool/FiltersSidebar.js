import { useRef } from "react"
import {
  Heading,
  Button,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
  CheckboxGroup,
  Stack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react"
import { range } from "d3-array"

import { useStore } from "./store"
import { FilterIcon } from "../Icon"

export default function FiltersSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const allSectors = useStore((state) => state.allSectors)
  const allRegions = useStore((state) => state.allRegions)
  const allCountries = useStore((state) => state.allCountries)

  const sectors = useStore((state) => state.sectors)
  const regions = useStore((state) => state.regions)
  const countries = useStore((state) => state.countries)

  const setPostFilters = useStore((state) => state.setPostFilters)

  const allYears = range(2024 - 2010).map((d) => `${2010 + d}`)
  const year = useStore((state) => state.year)
  const setYear = useStore((state) => state.setYear)

  const filterCount =
    year.filter((d) => d !== "all").length + regions.length + sectors.length

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="gray"
        onClick={onOpen}
        rightIcon={<FilterIcon size="1.25rem" />}
      >
        {`Filters`}
        {filterCount ? (
          <Center
            w={5}
            h={5}
            bg="brand.500"
            color="brand.1000"
            ml={2}
            borderRadius="full"
            fontSize="xs"
            fontWeight={600}
          >
            {filterCount}
          </Center>
        ) : null}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top={3} right={3} />
          <DrawerHeader py={4} fontWeight={700}>
            <HStack gap={3}>
              <Heading>{"Filters"}</Heading>
              {filterCount ? (
                <Center
                  w={5}
                  h={5}
                  bg="gray.200"
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight={600}
                >
                  {filterCount}
                </Center>
              ) : null}
            </HStack>
          </DrawerHeader>
          <DrawerBody px={0} py={0}>
            <Accordion allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <HStack gap={3}>
                    <Heading as="h3" fontWeight={600}>
                      {"Regions"}
                    </Heading>
                    {regions.length ? (
                      <Center
                        w={5}
                        h={5}
                        bg="gray.200"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight={600}
                      >
                        {regions.length}
                      </Center>
                    ) : null}
                  </HStack>
                  <AccordionIcon boxSize={6} />
                </AccordionButton>
                <AccordionPanel>
                  <CheckboxGroup
                    defaultValue={[]}
                    value={regions}
                    onChange={(regions) => {
                      setPostFilters({ regions })
                    }}
                  >
                    <Stack gap={1}>
                      {allRegions
                        .filter((d) => d.label)
                        .map((region) => {
                          // const isDisabled = countries.length
                          return (
                            <Checkbox
                              key={region.key}
                              value={region.key}
                              fontWeight={600}
                              isDisabled={false}
                            >
                              {region.label}
                            </Checkbox>
                          )
                        })}
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <HStack gap={3}>
                    <Heading as="h3" fontWeight={600}>
                      {"Markets"}
                    </Heading>
                    {countries.length ? (
                      <Center
                        w={5}
                        h={5}
                        bg="gray.200"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight={600}
                      >
                        {countries.length}
                      </Center>
                    ) : null}
                  </HStack>
                  <AccordionIcon boxSize={6} />
                </AccordionButton>
                <AccordionPanel>
                  <CheckboxGroup
                    defaultValue={[]}
                    value={countries}
                    onChange={(countries) => {
                      setPostFilters({
                        countries,
                        // regions: [],
                      })
                    }}
                  >
                    <Stack gap={1}>
                      {allCountries
                        .filter((d) => d.label)
                        .map((country) => {
                          // const isDisabled =
                          //  regions.length &&
                          //  !regions.includes(country.region_id)
                          return (
                            <Checkbox
                              key={country.key}
                              value={country.label}
                              fontWeight={600}
                              isDisabled={false}
                            >
                              {country.label}
                            </Checkbox>
                          )
                        })}
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>

              {/* <AccordionItem>
                <AccordionButton>
                  <Heading as="h3" fontWeight={600}>
                    {"Markets"}
                  </Heading>
                  <AccordionIcon boxSize={6} />
                </AccordionButton>
                <AccordionPanel>
                  <Select
                    w="auto"
                    value={currentGeography}
                    onChange={(e) => setCurrentGeography(e.target.value)}
                  >
                    <option value="US">{"US"}</option>
                    <option value="Brazil">{"Brazil"}</option>
                    <option value="Switzerland">{"Switzerland"}</option>
                  </Select>
                </AccordionPanel>
              </AccordionItem> */}
              <AccordionItem>
                <AccordionButton>
                  <HStack gap={3}>
                    <Heading as="h3" fontWeight={600}>
                      {"Sectors"}
                    </Heading>
                    {sectors.length ? (
                      <Center
                        w={5}
                        h={5}
                        bg="gray.200"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight={600}
                      >
                        {sectors.length}
                      </Center>
                    ) : null}
                  </HStack>
                  <AccordionIcon boxSize={6} />
                </AccordionButton>
                <AccordionPanel>
                  <CheckboxGroup
                    defaultValue={[]}
                    value={sectors}
                    onChange={(sectors) => {
                      setPostFilters({ sectors })
                    }}
                  >
                    <SimpleGrid gridGap={2} columns={2}>
                      {allSectors
                        .filter((d) => d.label)
                        .map((sector) => {
                          return (
                            <Checkbox
                              key={sector.key}
                              value={sector.key}
                              fontWeight={600}
                            >
                              {sector.label}
                            </Checkbox>
                          )
                        })}
                    </SimpleGrid>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <HStack gap={3}>
                    <Heading as="h3" fontWeight={600}>
                      {"Years"}
                    </Heading>
                    {year.filter((d) => d !== "all").length ? (
                      <Center
                        w={5}
                        h={5}
                        bg="gray.200"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight={600}
                      >
                        {year.length}
                      </Center>
                    ) : null}
                  </HStack>

                  <AccordionIcon boxSize={6} />
                </AccordionButton>
                <AccordionPanel>
                  {/* <Select w="auto">
                    <option value="All Years">{"All Years"}</option>
                  </Select> */}

                  <CheckboxGroup
                    defaultValue={year.filter((d) => d !== "all")}
                    value={year.filter((d) => d !== "all")}
                    onChange={(years) => {
                      if (!years.length) setYear(["all"])
                      else setYear(years)
                    }}
                  >
                    <SimpleGrid columns={2} gridGap={2}>
                      <Stack
                        gap={2}
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {allYears.slice(0, allYears.length / 2).map((year) => {
                          return (
                            <Checkbox key={year} value={year} fontWeight={600}>
                              {year}
                            </Checkbox>
                          )
                        })}
                      </Stack>
                      <Stack
                        gap={2}
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {allYears.slice(allYears.length / 2).map((year) => {
                          return (
                            <Checkbox key={year} value={year} fontWeight={600}>
                              {year}
                            </Checkbox>
                          )
                        })}
                      </Stack>
                    </SimpleGrid>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
          <DrawerFooter>
            <Stack gap={3} w="100%">
              <Button
                w="100%"
                colorScheme="gray"
                onClick={() => {
                  setYear(["all"])
                  setPostFilters({ regions: [], sectors: [], countries: [] })
                }}
              >
                {"Reset"}
              </Button>
              <Button w="100%" onClick={onClose}>
                {"Apply filters"}
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
