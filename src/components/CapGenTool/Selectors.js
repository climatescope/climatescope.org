import { useState } from "react"
import {
  Box,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

const indicators = [
  { value: "capacity-and-generation", label: "Capacity and generation" },
  { value: "installed-capacity", label: "Installed capacity" },
  { value: "eletricity-generation", label: "Eletricity generation" },
]

const groupings = [
  { value: "sector", label: "Sector" },
  { value: "region", label: "Region" },
  { value: "market", label: "Market" },
]

export default function Selectors() {
  const [indicatorValue, setIndicatorValue] = useState(indicators[0])
  const [groupingValue, setGroupingValue] = useState(groupings[0])

  return (
    <Box py={10}>
      <Container>
        <Wrap spacing={4}>
          <WrapItem w={["100%", null, "auto"]}>
            <Menu placement="bottom-start" matchWidth>
              <MenuButton
                as={Button}
                variant="solid"
                colorScheme="gray"
                h={16}
                fontSize="3xl"
                fontWeight={700}
                rightIcon={<ChevronDownIcon boxSize={10} />}
                textAlign="left"
                overflow="hidden"
                w="100%"
                sx={{ span: { overflow: "hidden", textOverflow: "ellipsis" } }}
              >
                {indicatorValue.label}
              </MenuButton>
              <MenuList
                minW={[null, null, "24rem"]}
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
                  value={indicatorValue.value}
                  onChange={(val) =>
                    setIndicatorValue(indicators.find((s) => s.value === val))
                  }
                >
                  {indicators.map(({ value, label }) => (
                    <MenuItemOption key={value} value={value}>
                      {label}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </WrapItem>
          <WrapItem
            flex="none"
            alignSelf="center"
            fontSize="3xl"
            lineHeight="short"
            fontWeight={700}
            pl={["1.0625rem", null, 0]}
          >
            {"by"}
          </WrapItem>
          <WrapItem flex={[1, null, "none"]}>
            <Menu placement="bottom-start" matchWidth>
              <MenuButton
                as={Button}
                variant="solid"
                colorScheme="gray"
                h={16}
                flex={1}
                fontSize="3xl"
                fontWeight={700}
                rightIcon={<ChevronDownIcon boxSize={10} />}
                textAlign="left"
                overflow="hidden"
                w="100%"
                sx={{ span: { overflow: "hidden", textOverflow: "ellipsis" } }}
              >
                {groupingValue.label}
              </MenuButton>
              <MenuList
                minW={[null, null, "24rem"]}
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
                  value={groupingValue.value}
                  onChange={(val) =>
                    setGroupingValue(groupings.find((s) => s.value === val))
                  }
                >
                  {groupings.map(({ value, label }) => (
                    <MenuItemOption key={value} value={value}>
                      {label}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </WrapItem>
        </Wrap>
      </Container>
    </Box>
  )
}