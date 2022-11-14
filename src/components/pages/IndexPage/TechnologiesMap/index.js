import { useEffect } from "react"
import { PatternLines } from "@visx/pattern"
import {
  Heading,
  HStack,
  Box,
  AspectRatio,
  Container,
  Stack,
  Center,
  Text,
  useRadioGroup, useRadio,
  useTheme
} from "@chakra-ui/react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps"
import { csv } from "d3-fetch"
import { useRouter } from "next/router"
import ReactTooltip from "react-tooltip"

import SimpleGrid from "@components/SimpleGrid"
import useStore from "@utils/store/technologiesMapStore"

function CustomGeo({ geo, relevantData }) {
  const year = useStore((state) => state.year)
  const { colors } = useTheme()
  const r = useRouter()
  const setTooltipContent = useStore((state) => state.setTooltipContent)
  const key = relevantData[year]
  return (
    <Geography
      geography={geo}
      fill={colors.indicators[key] || (!key ? `url(#lines)` : colors.gray[50])}
      style={{
        default: { outline: "none" },
        hover: { cursor: "pointer", outline: "none" },
        pressed: { cursor: "pointer", outline: "none" },
      }}
      tabIndex={-1}
      onMouseEnter={() => {
        const name = relevantData?.country || geo?.properties?.name || ""
        const value = key || ""
        setTooltipContent(`${name} - ${value || "Not covered"}`)
      }}
      onMouseLeave={() => {
        setTooltipContent("")
      }}
      onClick={() => {
        r.push(`/markets/${geo?.properties?.iso?.toLowerCase()}`)
      }}
    />
  )
}

function MapTooltip() {
  const { colors } = useTheme()
  const tooltipContent = useStore((state) => state.tooltipContent)
  return (
    <ReactTooltip
      backgroundColor={colors.brand[900]}
      textColor={colors.brand[100]}
      className="technology-map-tooltip"
    >
      {tooltipContent}
    </ReactTooltip>
  )
}

function TechnologiesMap({ data }) {
  const { colors } = useTheme()
  const geoUrl = "/data/world-sans-antarctica.json"
  return (
    <>
      <Box w="100%" position="relative" data-tip="">
        <ComposableMap
          width={800}
          height={350}
          projectionConfig={{
            scale: 148,
            rotate: [-10, 0, 0],
            center: [0, 6.5],
          }}
          style={{ width: "100%" }}
        >
          <PatternLines
            id="lines"
            height={3}
            width={3}
            stroke={colors.gray[200]}
            strokeWidth={1}
            background="#FFFFFF"
            orientation={["diagonal"]}
          />
          <Graticule strokeWidth={0.5} stroke={colors.gray[100]} />
          <Geographies geography={geoUrl}>
            {({ geographies, borders, outline }) => {
              return (
                <>
                  <Geography
                    geography={outline}
                    stroke={colors.gray[200]}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    tabIndex={-1}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                  {geographies.map((geo) => {
                    const { iso } = geo.properties
                    const relevantData = data.find((s) => s.iso === iso) || {}
                    return (
                      <CustomGeo
                        key={geo.rsmKey}
                        geo={geo}
                        relevantData={relevantData}
                      />
                    )
                  })}
                  <Geography
                    geography={borders}
                    stroke="#FFF"
                    strokeWidth={0.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    tabIndex={-1}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                </>
              )
            }}
          </Geographies>
          <Sphere stroke={colors.gray[50]} />
        </ComposableMap>
      </Box>
      <MapTooltip />
    </>
  )
}

function MapTitle() {
  const year = useStore((state) => state.year)
  return (
    <Stack spacing={3}>
      <Heading variant="sectionTitle">
        {`Power-generating technologies`}
      </Heading>
      <Text variant="sectionSubtitle">
        {`Most popular power-generating technologies added in ${year}`}
      </Text>
    </Stack>
  )
}

const Technologies = () => {
  const { colors } = useTheme()

  const data = useStore((state) => state.data)
  const setData = useStore((state) => state.setData)
  const legend = useStore((state) => state.legend)

  useEffect(() => {
    if (typeof window === "undefined") return
    csv(
      "/data/most_popular_new_power_generating_technology_installed_2010_2021.csv"
    ).then((d) => {
      setData(d)
    })
  }, [])

  const years =
    data?.columns
      ?.map((d) => parseInt(d))
      .filter((d) => !isNaN(parseInt(d)))
      .sort((a, b) => a - b) || []

  return (
    <Box
      position="relative"
      w="100vw"
      left="50%"
      transform="translateX(-50%)"
      py={20}
      bgGradient="radial(gray.25 0%, gray.50 75%)"
    >
      <Container>
        <SimpleGrid columns={2}>
          <HStack
            gridColumn="1 / -1"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <MapTitle />
          </HStack>
          <Stack gridColumn="1 / -1" spacing={10}>
            <SimpleGrid columns={4}>
              <Box gridColumn="1 / -1" gridRow="1" alignSelf="center">
                <AspectRatio ratio={2 / 0.875}>
                  <Box>{data.length && <TechnologiesMap data={data} />}</Box>
                </AspectRatio>
              </Box>
              <Box
                gridColumn="1 / span 1"
                gridRow="1"
                zIndex={1}
                alignSelf="end"
                bgGradient="linear(to-r, gray.50, rgba(255,255,255,0))"
                pointerEvents="none"
              >
                <Stack spacing={1}>
                  {legend.map((col) => {
                    return (
                      <HStack key={col} px={2} fontSize="xs" spacing={2}>
                        <Box
                          w={4}
                          h={4}
                          flex="none"
                          style={{
                            background: colors.indicators[col],
                            border: "0.125rem solid",
                            borderColor:
                              colors.indicators[col] || colors.gray[200],
                          }}
                        />
                        <Box fontWeight={600}>{col}</Box>
                      </HStack>
                    )
                  })}
                  <HStack px={2} fontSize="xs" spacing={2}>
                    <Box
                      w={4}
                      h={4}
                      flex="none"
                      p="0.0625rem"
                      border="0.125rem solid"
                      borderColor="gray.200"
                      style={{
                        background: "#FFF",
                        color: colors.gray[300],
                      }}
                    >
                      <svg viewBox="0 0 12 12" stroke="currentcolor">
                        <polyline points="4,0 0,4" />
                        <polyline points="8,0 0,8" />
                        <polyline points="12,0 0,12" />
                        <polyline points="12,4 4,12" />
                        <polyline points="12,8 8,12" />
                      </svg>
                    </Box>
                    <Box fontWeight={600}>{"Not covered"}</Box>
                  </HStack>
                </Stack>
              </Box>
            </SimpleGrid>
            <CustomSlider years={years} />
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" style={{ width: 100 / props.years.length + "%" }}>
      <input {...input} />
      <Center
        {...checkbox}
        cursor="pointer"
        borderRadius="full"
        fontSize={["xs", null, "sm", "md"]}
        fontWeight={600}
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
          boxShadow: "md",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        py={1}
      >
        {props.children}
      </Center>
    </Box>
  )
}

function CustomSlider({ years }) {
  const year = useStore((state) => state.year)
  const setYear = useStore((state) => state.setYear)
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Year",
    defaultValue: years.slice(-1)[0],
    value: year,
    onChange: (val) => setYear(parseInt(val)),
  })
  const group = getRootProps()
  const extent = [years[0], years.slice(-1)[0]]
  return (
    <HStack {...group} spacing={0} bg="gray.100" p={1} borderRadius="full">
      {years.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} years={years} {...radio}>
            {!extent.includes(value) ? "'" + `${value}`.slice(2) : value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}

export default Technologies
