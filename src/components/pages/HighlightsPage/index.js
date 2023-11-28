import { useEffect } from "react"
import { Container, Heading, Stack, Text } from "@chakra-ui/react"

// import SimpleGrid from "@components/SimpleGrid"
// import MiniChart from "@components/MiniChart"

import Slide from "@components/pages/HighlightsPage/Slide"
import Visual from "@components/pages/HighlightsPage/Visual"
import StartSlide from "@components/pages/HighlightsPage/StartSlide"
import useHighlightsStore from "@utils/store/highlightsStore"

export default function HighlightsPage({ data }) {
  const setInitialData = useHighlightsStore((state) => state.setInitialData)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!data) return null
    setInitialData(data)
  }, [data])

  return (
    <Container>
      <Stack spacing={20} pt={10} pb={40} textAlign="center">
        <Stack spacing={5} alignItems="center">
          <Heading as="h1" variant="pageTitle">
            {"Climatescope 2023 highlights"}
          </Heading>
          <Text variant="subtitle" maxW="58rem">
            {
              "Climatescope is BNEF's annual assessment of energy transition opportunities, covering the power, transport and buildings sectors across 136 countries. The project's 11th edition adds a new element by highlighting the top 10 markets for investment, capacity additions and policies."
            }
          </Text>
        </Stack>

        <StartSlide />

        <Visual />

        <Slide slideId={1}>
          {
            "Starting off with the full scatter plot showing total energy investment during the last 5 years in billion USD and how it relates to Climatescopes energy fundamentals score for 123 markets."
          }
        </Slide>
        <Slide slideId={2}>
          {
            "In the next scene we can color the bubbles depending on whether they are an emerging market or a developed market."
          }
        </Slide>
        <Slide slideId={3}>
          {
            "Grey out all dots except the outliers. There should be 2 outliers: Mainland China and the US."
          }
        </Slide>
      </Stack>
    </Container>
  )
}

// const HighlightsPage = ({ miniRankingsPaths }) => {
//   return (
//     <Container>
//       <SimpleGrid
//         columns={[1, null, 2]}
//         pt={10}
//         pb={40}
//         gridRowGap={[10, null, 20]}
//         gridColumnGap={20}
//       >
//         <Box gridColumn="1 / -1" maxW="50rem">
//           <Stack spacing={5}>
//             <Heading as="h1" variant="pageTitle">
//               {"Highlights"}
//             </Heading>
//             <Text variant="subtitle">
//               {
//                 "Climatescope is BNEF's annual assessment of energy transition opportunities, covering the power, transport and buildings sectors across 136 countries. The project's 11th edition adds a new element by highlighting the top 10 markets for investment, capacity additions and policies."
//               }
//             </Text>
//           </Stack>
//         </Box>

//         <Stack spacing={[4, null, 6]} gridColumn="1 / -1">
//           <Heading as="h2" variant="sectionTitle">
//             {"Buildings"}
//           </Heading>
//           <SimpleGrid
//             columns={[1, null, 2]}
//             gridRowGap={[10, null, 20]}
//             gridColumnGap={20}
//           >
//             {miniRankingsPaths.buildings.map((n) => {
//               return <MiniChart key={n} src={n} />
//             })}
//           </SimpleGrid>
//         </Stack>

//         <Stack spacing={[4, null, 6]} gridColumn="1 / -1">
//           <Heading as="h2" variant="sectionTitle">
//             {"Transport"}
//           </Heading>
//           <SimpleGrid
//             columns={[1, null, 2]}
//             gridRowGap={[10, null, 20]}
//             gridColumnGap={20}
//           >
//             {miniRankingsPaths.transport.map((n) => {
//               return <MiniChart key={n} src={n} />
//             })}
//           </SimpleGrid>
//         </Stack>

//         <Stack spacing={[4, null, 6]} gridColumn="1 / -1">
//           <Heading as="h2" variant="sectionTitle">
//             {"Power"}
//           </Heading>
//           <SimpleGrid
//             columns={[1, null, 2]}
//             gridRowGap={[10, null, 20]}
//             gridColumnGap={20}
//           >
//             {miniRankingsPaths.power.map((n) => {
//               return <MiniChart key={n} src={n} />
//             })}
//           </SimpleGrid>
//         </Stack>
//       </SimpleGrid>
//     </Container>
//   )
// }

// export default HighlightsPage
