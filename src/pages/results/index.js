import {
  // Switch,
  // Container,
  Heading,
  Text,
} from "@chakra-ui/react"
import {
  useSearchParams,
  // useRouter,
} from "next/navigation"

import getContent from "@/utils/api/server/getContent"
import SEO from "@/components/SEO"
// import { urlFilters } from "@/utils/urlFilters"
// import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup"
import ResultsList from "@/components/ResultsList"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"

export default function ResultsPage({ results }) {
  const searchParams = useSearchParams()
  // const router = useRouter()

  const selectedRegion = searchParams.get("region")
  const selectedSector = searchParams.get("sector")
  const selectedYear = searchParams.get("year")

  return (
    <>
      <SEO
        title="Results"
        description="Climatescope's ranking of the most attractive emerging markets for renewable energy investment."
      />
      <div>
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/">{"Home"}</PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          <PageHeaderContent>
            <Heading textStyle="pageHeading">{"Power sector results"}</Heading>
            <Text textStyle="pageSubheading">
              {
                "Climatescope's ranking of the most attractive emerging markets for renewable energy investment."
              }
            </Text>
          </PageHeaderContent>
        </PageHeader>
        {/* <Container py={10}>
        <RadioGroup>
          <RadioGroupItem value="first">{"First"}</RadioGroupItem>
          <RadioGroupItem value="second">{"Second"}</RadioGroupItem>
        </RadioGroup>

        <Switch
          isChecked={selectedRegions.includes("Europe")}
          onChange={(e) => {
            if (e.target.checked) {
              router.replace(urlFilters.append("region", "Europe"), {
                scroll: false,
              })
            } else {
              router.replace(urlFilters.remove("region", "Europe"), {
                scroll: false,
              })
            }
          }}
        >
          {"Europe"}
        </Switch>
        <Switch
          isChecked={selectedRegions.includes("Asia")}
          onChange={(e) => {
            if (e.target.checked) {
              router.replace(urlFilters.append("region", "Asia"), {
                scroll: false,
              })
            } else {
              router.replace(urlFilters.remove("region", "Asia"), {
                scroll: false,
              })
            }
          }}
        >
          {"Asia"}
        </Switch>
        <Switch
          isChecked={selectedCountries.includes("Canada")}
          onChange={(e) => {
            const isChecked = e.target.checked
            router.replace(
              urlFilters.update("country", isChecked ? "Canada" : ""),
              { scroll: false }
            )
          }}
        >
          {"Canada"}
        </Switch>
      </Container> */}

        <ResultsList
          results={results}
          selectedRegion={selectedRegion}
          selectedYear={selectedYear}
          selectedSector={selectedSector}
        />
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  // const { slug } = params
  // const source = await getPage({ pageType: "markets", slug })
  const results = await getContent("results.txt", "json")
  return {
    props: { data: [], results },
  }
}
