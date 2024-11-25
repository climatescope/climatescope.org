import { useRef } from "react"
import {
  Heading,
  Button,
  Select,
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
} from "@chakra-ui/react"
import { range } from "d3-array"

import { useStore } from "./store"

export default function FiltersSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  // const currentGeography = "US"
  // const setCurrentGeography = () => {}

  // const currentSector = ""
  // const setCurrentSector = () => {}

  const allSectors = useStore((state) => state.allSectors)
  const allRegions = useStore((state) => state.allRegions)

  const sectors = useStore((state) => state.sectors)
  const regions = useStore((state) => state.regions)

  const setPostFilters = useStore((state) => state.setPostFilters)

  const allYears = range(24).map((d) => `${2000 + d}`)
  const year = useStore((state) => state.year)
  const setYear = useStore((state) => state.setYear)

  return (
    <>
      <Button ref={btnRef} colorScheme="gray" onClick={onOpen}>
        {"Filters"}
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
            <Heading>{"Filters"}</Heading>
          </DrawerHeader>
          <DrawerBody px={0} py={0}>
            <Accordion allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Heading as="h3" fontWeight={600}>
                    {"Region"}
                  </Heading>
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
                          return (
                            <Checkbox key={region.key} value={region.key}>
                              {region.label}
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
                  <Heading as="h3" fontWeight={600}>
                    {"Sectors"}
                  </Heading>
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
                    <Stack gap={1}>
                      {allSectors
                        .filter((d) => d.label)
                        .map((sector) => {
                          return (
                            <Checkbox key={sector.key} value={sector.key}>
                              {sector.label}
                            </Checkbox>
                          )
                        })}
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Heading as="h3" fontWeight={600}>
                    {"Years"}
                  </Heading>
                  <AccordionIcon boxSize={6} />
                </AccordionButton>
                <AccordionPanel>
                  {/* <Select w="auto">
                    <option value="All Years">{"All Years"}</option>
                  </Select> */}

                  <CheckboxGroup
                    defaultValue={year.filter((d) => d !== "all")}
                    onChange={(years) => {
                      if (!years.length) setYear(["all"])
                      else setYear(years)
                    }}
                  >
                    <Stack gap={1}>
                      {allYears.map((year) => {
                        return (
                          <Checkbox key={year} value={year}>
                            {year}
                          </Checkbox>
                        )
                      })}
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
          <DrawerFooter>
            <Button w="100%">{"Apply filters"}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
