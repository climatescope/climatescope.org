import {
  Box,
  HStack,
  Tabs,
  TabList,
  Tab,
  // Button,
  Select,
} from "@chakra-ui/react"

import { ArrowRight } from "@components/Icon"
import { ButtonLink } from "@components/Link"
import ShareModal from "@components//ShareModal"
import { useScrollStore } from "@utils/useScrollama"

const InPageNavigation = ({ market, sections }) => {
  const marketId = market.iso
  const navigationSections = sections.filter((d) => d)

  const currentStep = useScrollStore((state) => state.currentStep)

  return (
    <HStack position="sticky" top={0} zIndex={999} bg="white" spacing={0}>
      <HStack
        flex="1"
        display={["flex", null, null, "none"]}
        h="4.5rem"
        borderBottom="0.125rem solid"
        borderColor="gray.100"
      >
        <Select
          value={currentStep}
          onChange={(e) => {
            const all = document.querySelectorAll(`[data-scroll-step="true"]`)
            const element = all[e.target.value]

            if (element.scrollIntoView)
              element.scrollIntoView({ behavior: "smooth" })
          }}
        >
          {navigationSections.map((d, i) => {
            return (
              <option key={d.key} value={i}>
                {d.title}
              </option>
            )
          })}
        </Select>
      </HStack>
      <Box flex="1" display={["none", null, null, "block"]}>
        <Tabs index={currentStep}>
          <TabList borderColor="gray.100" h="4.5rem">
            {navigationSections.map((d, i) => {
              return (
                <Tab
                  key={d.key}
                  w="25%"
                  h="4.5rem"
                  borderBottomWidth="0.25rem"
                  textAlign="left"
                  _selected={{
                    borderBottomColor: "teal.800",
                  }}
                  onClick={() => {
                    const all = document.querySelectorAll(
                      `[data-scroll-step="true"]`
                    )
                    const element = all[i]

                    if (element.scrollIntoView)
                      element.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {d.title}
                </Tab>
              )
            })}
          </TabList>
        </Tabs>
      </Box>
      <HStack
        h="4.5rem"
        borderBottom="0.125rem solid"
        borderColor="gray.100"
        pl={[5, null, null, 10]}
        spacing={5}
      >
        <ShareModal />
        {/* <Button colorScheme="gray" w="2.5rem" px={0} borderRadius="full">
          <PrintIcon size={20} strokeWidth={2} />
        </Button> */}
        <ButtonLink
          href={`/tools/geography-comparison?market=${marketId}`}
          colorScheme="brand"
          rightIcon={<ArrowRight size={20} strokeWidth={2} />}
        >
          {"Compare"}
        </ButtonLink>
      </HStack>
    </HStack>
  )
}

export default InPageNavigation
