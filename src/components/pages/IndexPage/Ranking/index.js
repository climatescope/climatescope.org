import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  Divider,
  Center,
} from "@chakra-ui/react"

import { ButtonLink, Link } from "@components/Link"
import { ArrowRight } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"

const Ranking = ({ ranking = {} }) => {
  const { first } = ranking
  return (
    <SimpleGrid columns={6}>
      <Stack gridColumn="span 2" spacing={1}>
        <Heading fontSize="2xl" pb={9}>
          {"Top 3 Energy"}
        </Heading>
        <Stack spacing={4} divider={<Divider />} pb={5}>
          {first.map((item) => {
            const score = item.score.data[0].value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: false,
            })
            return (
              <HStack key={item.iso} spacing={10}>
                <Center
                  w="2.5rem"
                  h="2.5rem"
                  bg="teal.100"
                  color="teal.500"
                  borderRadius="full"
                  flex="none"
                  fontWeight={700}
                  fontFamily="heading"
                  boxShadow="0.25rem 0 0 #FFF"
                >
                  {item.score.data[0].rank}
                </Center>
                <Stack flex="1" spacing={0}>
                  <Link href={`/markets/${item.iso.toLowerCase()}`} fontWeight={700} color="teal.500" lineHeight="short">
                    {item.name}
                  </Link>
                  <Text color="gray.400" fontWeight={600} lineHeight="short">{item.region.name}</Text>
                </Stack>
                <HStack>
                  <Text fontWeight={600}>{score}</Text>
                  <Box bg="green.100" w="1.25rem" h="1.25rem" borderRadius="full"/>
                </HStack>
              </HStack>
            )
          })}
        </Stack>
        <ButtonLink
          href="/results"
          size="lg"
          justifyContent="space-between"
          rightIcon={<ArrowRight />}
        >
          {`Explore the energy ranking`}
        </ButtonLink>
      </Stack>
      <Stack gridColumn="span 2" spacing={1}>
        <Heading fontSize="2xl" pb={9}>
          {"Top 3 Buildings"}
        </Heading>
        <Stack spacing={4} divider={<Divider />} pb={5}>
          {first.map((item) => {
            const score = item.score.data[0].value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: false,
            })
            return (
              <HStack key={item.iso} spacing={10}>
                <Center
                  w="2.5rem"
                  h="2.5rem"
                  bg="teal.100"
                  color="teal.500"
                  borderRadius="full"
                  flex="none"
                  fontWeight={700}
                  fontFamily="heading"
                  boxShadow="0.25rem 0 0 #FFF"
                >
                  {item.score.data[0].rank}
                </Center>
                <Stack flex="1" spacing={0}>
                  <Link href={`/markets/${item.iso.toLowerCase()}`} fontWeight={700} color="teal.500" lineHeight="short">
                    {item.name}
                  </Link>
                  <Text color="gray.400" fontWeight={600} lineHeight="short">{item.region.name}</Text>
                </Stack>
                <Text fontWeight={600}>
                  {score}
                </Text>
              </HStack>
            )
          })}
        </Stack>
        <ButtonLink
          href="/results"
          size="lg"
          justifyContent="space-between"
          rightIcon={<ArrowRight />}
        >
          {`Explore the buildings ranking`}
        </ButtonLink>
      </Stack>
      <Stack gridColumn="span 2" spacing={1}>
        <Heading fontSize="2xl" pb={9}>
          {"Top 3 Transport"}
        </Heading>
        <Stack spacing={4} divider={<Divider />} pb={5}>
          {first.map((item) => {
            const score = item.score.data[0].value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: false,
            })
            return (
              <HStack key={item.iso} spacing={10}>
                <Center
                  w="2.5rem"
                  h="2.5rem"
                  bg="teal.100"
                  color="teal.500"
                  borderRadius="full"
                  flex="none"
                  fontWeight={700}
                  fontFamily="heading"
                  boxShadow="0.25rem 0 0 #FFF"
                >
                  {item.score.data[0].rank}
                </Center>
                <Stack flex="1" spacing="0">
                  <Link href={`/markets/${item.iso.toLowerCase()}`} fontWeight={700} color="teal.500" lineHeight="short">
                    {item.name}
                  </Link>
                  <Text color="gray.400" fontWeight={600} lineHeight="short">{item.region.name}</Text>
                </Stack>
                <Text fontWeight={600}>
                  {score}
                </Text>
              </HStack>
            )
          })}
        </Stack>
        
        <ButtonLink
          href="/results"
          size="lg"
          justifyContent="space-between"
          rightIcon={<ArrowRight />}
        >
          {`Explore the transport ranking`}
        </ButtonLink>
      </Stack>
    </SimpleGrid>
  )
}

export default Ranking
