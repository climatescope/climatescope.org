import {
  Container,
  SimpleGrid,
  Stack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Divider,
} from "@chakra-ui/react"
import { create } from "zustand"
import { ChevronDownIcon } from "@chakra-ui/icons"

const useGeographyComparisonStore = create((set, get) => ({
  selectedGeographies: [],
  setSelectedGeographies: (geo, slot) => {
    set((state) => ({
      selectedGeographies: state.selectedGeographies.map((d, i) => {
        if (i === slot) return geo
        else return d
      }),
    }))
  },
  geographies: [
    { val: "cn", label: "Mainland China" },
    { val: "in", label: "India" },
    { val: "br", label: "Brazil" },
  ],
}))

function EmptySlot() {
  return (
    <Stack spacing={5} bg="white" px={5}>
      <Box h={10}>{"Empty Market"}</Box>
      <Divider />
      <Box>{"Info"}</Box>
    </Stack>
  )
}

function ComparisonGeography({ slot = 1 }) {
  const selectedGeographies = useGeographyComparisonStore(
    (state) => state.selectedGeographies
  )
  const setSelectedGeographies = useGeographyComparisonStore(
    (state) => state.setSelectedGeographies
  )
  const geographies = useGeographyComparisonStore((state) => state.geographies)

  if (selectedGeographies?.length < slot) return <EmptySlot />

  return (
    <Stack spacing={5} bg="white" px={5}>
      <Menu matchWidth>
        <MenuButton
          as={Button}
          colorScheme="gray"
          textAlign="left"
          rightIcon={<ChevronDownIcon boxSize={6} />}
          pr={3}
        >
          {selectedGeographies[slot]?.label || "Select a geography"}
        </MenuButton>
        <MenuList
          motionProps={{
            variants: {
              enter: {
                visibility: "visible",
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                },
              },
              exit: {
                transitionEnd: {
                  visibility: "hidden",
                },
                y: 8,
                opacity: 0,
                scale: 1,
                transition: {
                  duration: 0.1,
                  easings: "easeOut",
                },
              },
            },
          }}
        >
          <MenuOptionGroup
            type="radio"
            value={selectedGeographies[slot]?.val || ""}
            onChange={(val) => {
              setSelectedGeographies(
                geographies.find((s) => s.val === val),
                slot
              )
            }}
          >
            {geographies.map(({ val, label }) => {
              return (
                <MenuItemOption key={val} value={val}>
                  {label}
                </MenuItemOption>
              )
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Divider />
      <Box>{"Info"}</Box>
    </Stack>
  )
}

export default function GeographyComparison() {
  return (
    <Container>
      <SimpleGrid
        columns={3}
        gridGap="0.0625rem"
        bg="gray.100"
        minH="100vh"
        mb={20}
        mx={-5}
      >
        {/* <ReferenceGeography /> */}
        <ComparisonGeography slot={0} />
        <ComparisonGeography slot={1} />
        <ComparisonGeography slot={2} />
      </SimpleGrid>
    </Container>
  )
}
