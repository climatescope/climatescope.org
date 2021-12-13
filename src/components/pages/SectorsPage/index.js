import {
  Heading,
  Text,
  Box,
  Container,
  Stack,
} from "@chakra-ui/react"

import SimpleGrid from "@components/SimpleGrid"
import SectorCard from "@components/SectorCard"

const SectorsPage = ({ sectors, marketCounts }) => {
  return (
    <Box as="main" pt={10} pb={40} minH="75vh">
      <Container pb={10}>
        <SimpleGrid columns={3}>
          <Stack gridColumn={["span 3", null, null, "1 / span 2"]} spacing={10}>
            <Heading fontSize="5xl">
              { "Sectors" }
            </Heading>
            <Text variant="subtitle">
              {"Climatescope has been expanded for 2021 to cover three major segments of the energy transition – buildings, power and transport. Click below to learn about major investment and deployment trends in each."}
            </Text>
          </Stack>
        </SimpleGrid>
        
      </Container>      
      <Container>
        <SimpleGrid columns={[6, null, null, 3]}>
          {
            sectors.map((sector, i) => {
              return (
                <SectorCard
                  key={i}
                  title={sector.title}
                  subtitle=""
                  img={sector.thumbnail}
                  marketCounts={marketCounts}
                  alt="Alt"
                  href={`/sectors/${sector.slug}`}
                  order={sector.order}
                  isNew={sector.title !== "Power"}
                />
              )
            })
          }
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default SectorsPage
