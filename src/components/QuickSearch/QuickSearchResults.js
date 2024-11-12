import React from "react"
import { Box, List, ListItem, HStack, useTheme } from "@chakra-ui/react"
import { ArrowForwardIcon as ArrowRightIcon } from "@chakra-ui/icons"

import { useQuickSearchContext } from "./QuickSearchContext"

export default function QuickSearchResults({
  style = {},
  bg = "white",
  px = "1.8125rem",
  pl = 5,
  ...restProps
}) {
  const { colors } = useTheme()
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputItems,
  } = useQuickSearchContext()

  const currentInputValue = getInputProps().value

  return (
    <Box
      position="absolute"
      top="calc(100% + 0.5rem)"
      left={0}
      right={0}
      bg={bg}
      zIndex={999}
      boxShadow="2xl"
      borderBottomRadius="sm"
      {...restProps}
      style={{ ...style, display: isOpen ? "block" : "none" }}
    >
      <List pt={3} pb={3} maxH="14rem" overflow="scroll" {...getMenuProps()}>
        {!inputItems.length && (
          <Box pt={5} pb={3} px={px} color="gray.500" fontWeight={400}>
            {"No suggestions"}
          </Box>
        )}
        {inputItems.map((item, index) => {
          const isHighlighted = index === highlightedIndex
          return (
            <ListItem
              key={item.key}
              {...getItemProps({ item, index })}
              textAlign="left"
              pr={6}
              pl={px}
              py={0}
              cursor="pointer"
              fontSize="lg"
              lineHeight="shorter"
              style={{
                color: isHighlighted ? colors.brand[600] : "inherit",
                background: isHighlighted ? colors.gray[50] : "transparent",
              }}
            >
              <HStack
                spacing={3}
                pl={pl}
                justifyContent="space-between"
                alignItems="center"
                h={10}
              >
                <Box
                  flex="1"
                  maxW="32rem"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  sx={{ strong: { fontWeight: 600 } }}
                  dangerouslySetInnerHTML={{
                    __html: currentInputValue
                      ? item.label.replace(
                          new RegExp(currentInputValue, "i"),
                          (d) => `<strong>${d}</strong>`
                        )
                      : item.label,
                  }}
                />
                {isHighlighted && <ArrowRightIcon w="1.5rem" h="1.5rem" />}
              </HStack>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
