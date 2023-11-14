import { useState } from "react"
import {
  Heading,
  Text,
  Box,
  Container,
  Stack,
  HStack,
  Tabs,
  TabList,
  Tab,
  Button,
  Center,
  Select,
  Divider,
  // useBreakpointValue,
} from "@chakra-ui/react"
import { useBreakpointValue } from "@chakra-ui/media-query"

import BalanceSlider from "@components/pages/ResultsPage/BalanceSlider"
import Ranking from "@components/pages/ResultsPage/Ranking"
import {
  ResetIcon,
  GreenIdeaIcon,
  BuildingsIcon,
  TransportIcon,
  GlobalRankIcon,
  // DownloadIcon,
} from "@components/Icon"
import RegionSelector from "@components/RegionSelector"
import MarketGroupSelector from "@components/MarketGroupSelector"
// import { ButtonLink } from "@components/Link"

const ContainedSlider = ({ value = [50, 25, 25], onChange }) => {
  const handleChange = (_value) => {
    if (_value.join("") === value.join("")) return
    onChange(_value)
  }

  return (
    <HStack spacing={5} h="7.25rem" flex="1">
      <Box flex="1">
        <BalanceSlider value={value} onChange={handleChange} delay={300} />
      </Box>
      <Box flex="none" display={["none", null, null, "block"]}>
        <Button
          colorScheme="gray"
          w="2.5rem"
          px={0}
          borderRadius="full"
          onClick={() => handleChange([50, 25, 25])}
        >
          <ResetIcon size="20" strokeWidth={2} />
        </Button>
      </Box>
    </HStack>
  )
}

const ResultsPage = ({ clientData, dataPreview }) => {
  const { data, error } = clientData

  const [weighting, setWeighting] = useState([50, 25, 25])
  const [region, setRegion] = useState("")
  const [marketGroup, setMarketGroup] = useState("emerging")
  const [view, setView] = useState("table")
  const [sector, setSector] = useState("power")

  const sectorNames = [
    "power",
    "transport",
    // "buildings",
    "all sectors",
  ]

  const handleSectorChange = (val) => {
    setSector(sectorNames[val])
  }

  const isSliderVisible = useBreakpointValue({ base: false, lg: true })
  const sliderVisibility = isSliderVisible && data?.length

  return (
    <Box as="main" pt={10} minH="75vh">
      <Container>
        <Stack spacing={[10, null, 20]}>
          <Stack spacing={5} maxW="50rem">
            <Heading as="h1" variant="pageTitle">
              {"Results"}
            </Heading>
            <Text variant="subtitle">
              {
                "Climatescope's ranking of the most attractive markets for energy transition projects investment."
              }
            </Text>
          </Stack>

          <HStack spacing={1}>
            <Box flex="1">
              <Select
                mb={1}
                display={["block", null, "none"]}
                value={sector}
                onChange={(e) =>
                  handleSectorChange(sectorNames.indexOf(e.target.value))
                }
              >
                {sectorNames
                  .filter((d) => d === "power")
                  .map((sectorName, i) => {
                    return (
                      <option key={sectorName} value={sectorName}>
                        {sectorName.slice(0, 1).toUpperCase() +
                          sectorName.slice(1)}
                      </option>
                    )
                  })}
              </Select>
              <Tabs
                display={["none", null, "block"]}
                onChange={handleSectorChange}
                index={sectorNames.indexOf(sector)}
                variant="sectorTabs"
              >
                <TabList>
                  {sectorNames.map((s) => {
                    return (
                      <Tab key={s} flex={1}>
                        <Center
                          w="2.5rem"
                          h="2.5rem"
                          mr={4}
                          bg="gray.50"
                          borderRadius="full"
                        >
                          {s === "power" ? (
                            <GreenIdeaIcon size={20} strokeWidth={2} />
                          ) : null}
                          {s === "transport" ? (
                            <TransportIcon size={20} strokeWidth={2} />
                          ) : null}
                          {s === "buildings" ? (
                            <BuildingsIcon size={20} strokeWidth={2} />
                          ) : null}
                          {s === "all sectors" ? (
                            <GlobalRankIcon size={20} strokeWidth={2} />
                          ) : null}
                        </Center>
                        {s.slice(0, 1).toUpperCase() + s.slice(1)}
                      </Tab>
                    )
                  })}
                </TabList>
              </Tabs>
            </Box>

            {/* <ViewSwitch
              value={view}
              onChange={(v) => setView(v)}
              h="4.5rem"
              borderBottom="0.125rem solid"
              borderColor="gray.100"
            /> */}
          </HStack>
        </Stack>
        {/* <Divider borderBottomWidth="0.125rem" mt={10} /> */}
      </Container>

      <Box
        borderBottom="0.125rem solid"
        borderColor="gray.100"
        bg="white"
        h="7.25rem"
        position="sticky"
        top={0}
        zIndex={999}
        boxShadow="0 0.125rem 0.25rem rgba(0, 0, 0, 0.05)"
      >
        <Container>
          <HStack spacing={5} h="7.25rem">
            {sliderVisibility ? (
              <ContainedSlider value={weighting} onChange={setWeighting} />
            ) : null}
            <RegionSelector value={region} onChange={setRegion} />
            <MarketGroupSelector
              value={marketGroup}
              onChange={setMarketGroup}
            />
          </HStack>
        </Container>
      </Box>

      <Box bg="gray.25" pb={20}>
        {error ? (
          <Container py={10}>
            <span>{"There was an error"}</span>
          </Container>
        ) : (
          <Ranking
            sector={sector}
            marketGroup={marketGroup}
            weighting={weighting}
            region={region}
            dataPreview={dataPreview}
            data={data}
            view={view}
          />
        )}
      </Box>
    </Box>
  )
}

export default ResultsPage
