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
} from "@chakra-ui/react"

export default function FiltersSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const currentGeography = "US"
  const setCurrentGeography = () => {}

  const currentSector = ""
  const setCurrentSector = () => {}

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
                <AccordionPanel>{"Region options"}</AccordionPanel>
              </AccordionItem>
              <AccordionItem>
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
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Heading as="h3" fontWeight={600}>
                    {"Sectors"}
                  </Heading>
                  <AccordionIcon boxSize={6} />
                </AccordionButton>
                <AccordionPanel>
                  <Select
                    w="auto"
                    value={currentSector}
                    onChange={(e) => setCurrentSector(e.target.value)}
                  >
                    <option value="All">{"All Sectors"}</option>
                    <option value="Solar PV">{"Solar PV"}</option>
                  </Select>
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
                  <Select w="auto">
                    <option value="All Years">{"All Years"}</option>
                  </Select>
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
