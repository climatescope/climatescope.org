import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Stack,
  useTheme,
  Center,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import { motion } from "framer-motion"

import { LinkBox, LinkOverlay } from "@components/Link"
import RadarChart from "@components/RadarChart"

const Listing = ({ data, sector }) => {
  const { colors } = useTheme()
  const barColors = [colors.yellow[500], colors.teal[500], colors.purple[400]]
  return (
    <Table
      variant="simple"
      colorScheme="gray"
      summary="Climatescope 2022 ranking"
      size="md"
    >
      <Thead>
        <Tr>
          <Th
            h="4.5rem"
            color="gray.700"
            borderColor="gray.700"
            borderBottomWidth="0.125rem"
            w="4.25rem"
            fontSize="sm"
            px={0}
            textAlign="center"
          >
            {"Rank"}
          </Th>
          <Th
            h="4.5rem"
            color="gray.700"
            borderColor="gray.700"
            borderBottomWidth="0.125rem"
            w="11rem"
            fontSize="sm"
          >
            {"Market"}
          </Th>
          <Th
            h="4.5rem"
            color="gray.700"
            borderColor="gray.700"
            borderBottomWidth="0.125rem"
            w="10rem"
            fontSize="sm"
            display={["none", null, "table-cell"]}
          >
            {"Region"}
          </Th>
          <Th
            h="4.5rem"
            color="gray.700"
            borderColor="gray.700"
            borderBottomWidth="0.125rem"
            w="6.5rem"
            fontSize="sm"
          >
            {"Score"}
          </Th>
          <Th
            h="4.5rem"
            color="gray.700"
            borderColor="gray.700"
            borderBottomWidth="0.125rem"
            w="auto"
            fontSize="sm"
            display={["none", null, null, "table-cell"]}
          >
            {"Bar chart"}
          </Th>
          <Th
            h="4.5rem"
            color="gray.700"
            borderColor="gray.700"
            borderBottomWidth="0.125rem"
            w="6rem"
            textAlign="center"
            fontSize="sm"
            display={["none", "table-cell"]}
          >
            {"Chart"}
          </Th>
        </Tr>
      </Thead>
      <Tbody position="relative">
        {data.map((d) => {
          const rank = d.masterRank
          return (
            <LinkBox
              as={Tr}
              key={d.iso.toLowerCase()}
              style={{ display: d.isVisible ? "table-row" : "none" }}
              transition="background 0.1s"
              _focusWithin={{ bg: "white" }}
              _hover={{ bg: "white" }}
            >
              <Td fontWeight={600} px={0}>
                <Center w="100%" h="100%">
                  <Center bg="gray.50" borderRadius="full" w="3rem" h="3rem">
                    {rank.toLocaleString("en-US", {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                  </Center>
                </Center>
              </Td>
              <Td fontWeight={600} color="brand.700" position="relative">
                <LinkOverlay
                  href={`/markets/${d.iso.toLowerCase()}`}
                  _focusVisible={{
                    outline: "0.125rem solid",
                    outlineColor: "currentcolor",
                  }}
                >
                  {d.name}
                </LinkOverlay>
              </Td>
              <Td
                color="gray.600"
                fontWeight={600}
                display={["none", null, "table-cell"]}
              >
                {d.region.name}
              </Td>
              <Td fontWeight={600}>
                {d.finalScore.toLocaleString("en-US", {
                  minimumIntegerDigits: 1,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: false,
                })}
                <Text as="span" color="gray.600" ml={1}>
                  {"/5"}
                </Text>
              </Td>
              <Td display={["none", null, null, "table-cell"]}>
                <HStack
                  spacing={0}
                  w="100%"
                  bg="gray.50"
                  h="1rem"
                  borderRadius="sm"
                  position="relative"
                  overflow="hidden"
                >
                  {d.weightedTopics.map(({ id, width, ...d }, i) => {
                    return (
                      <Tooltip
                        isDisabled
                        key={id}
                        placement="top"
                        label={
                          <Stack spacing={0} px={2} py={1} textAlign="center">
                            <Text
                              fontWeight={600}
                              lineHeight="shorter"
                              fontSize="sm"
                            >
                              {d.name}
                            </Text>
                            <Text
                              fontWeight={600}
                              fontSize="xs"
                              lineHeight="shorter"
                              color="gray.600"
                            >
                              {d.weightedValue.toLocaleString("en-US", {
                                maximumFractionDigits: 2,
                              })}
                            </Text>
                          </Stack>
                        }
                        hasArrow
                        bg="white"
                        color="gray.900"
                        boxShadow="lg"
                        borderRadius="md"
                      >
                        <motion.div
                          style={{
                            background: barColors[i],
                            height: "1rem",
                            boxShadow: !width
                              ? "none"
                              : "inset -0.0625rem 0 0 #FFF",
                          }}
                          transition={{ duration: 0.25, ease: "circOut" }}
                          initial={false}
                          animate={{
                            width: `${width}%`,
                          }}
                        />
                      </Tooltip>
                    )
                  })}
                </HStack>
              </Td>
              <Td
                color="gray.100"
                py={0}
                px={3}
                display={["none", "table-cell"]}
              >
                <RadarChart
                  sector={sector}
                  market={d}
                  dotSize={0}
                  padding={40}
                  size={120}
                  isVisible={d.isVisible}
                />
              </Td>
            </LinkBox>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default Listing
