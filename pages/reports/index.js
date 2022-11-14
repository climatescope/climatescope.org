import { Box, Container, Heading, Text, Stack, HStack } from "@chakra-ui/react"

import { ButtonLink, LinkBox, LinkOverlay } from "@components/Link"
import Image from "@components/Image"
import SEO from "@components/SEO"
import { DownloadIcon, ExternalIcon } from "@components/Icon"
import SimpleGrid from "@components/SimpleGrid"

const climatescopeIssues = [
  {
    title:
      "Assessing the climate for climate investing in Latin America and the Caribbean",
    year: 2012,
    slug: "climatescope-2012-report-en.pdf",
    imgSrc: "climatescope-2012-report-en-cover.jpg",
  },
  {
    title:
      "New frontiers for low-carbon energy investment in Latin America and the Caribbean",
    year: 2013,
    slug: "climatescope-2013-report-en.pdf",
    model: "climatescope-2013.xlsm",
    imgSrc: "climatescope-2013-report-en-cover.jpg",
  },
  {
    title: "Mapping the global frontiers for clean energy investment",
    year: 2014,
    slug: "climatescope-2014-report-en.pdf",
    model: "climatescope-2014.xlsm",
    imgSrc: "climatescope-2014-report-en-cover.jpg",
    url: "http://2014.global-climatescope.org/en/",
  },
  {
    title: "The clean energy country competitiveness index",
    year: 2015,
    slug: "climatescope-2015-report-en.pdf",
    model: "climatescope-2015.xlsm",
    imgSrc: "climatescope-2015-report-en-cover.jpg",
    url: "http://2015.global-climatescope.org/en/",
  },
  {
    title: "The clean energy country competitiveness index",
    year: 2016,
    slug: "climatescope-2016-report-en.pdf",
    model: "climatescope-2016.xlsm",
    imgSrc: "climatescope-2016-report-en-cover.jpg",
    url: "http://2016.global-climatescope.org/en/",
  },
  {
    title: "The clean energy country competitiveness index",
    year: 2017,
    slug: "climatescope-2017-report-en.pdf",
    model: "climatescope-2017.xlsm",
    imgSrc: "climatescope-2017-report-en-cover.jpg",
    url: "http://2017.global-climatescope.org/en/",
  },
  {
    title: "Emerging markets outlook 2018",
    year: 2018,
    slug: "climatescope-2018-report-en.pdf",
    model: "climatescope-2018.xlsm",
    imgSrc: "climatescope-2018-report-en-cover.jpg",
    url: "https://2018.global-climatescope.org/",
  },
  {
    title: "Emerging markets outlook 2019",
    year: 2019,
    slug: "climatescope-2019-report-en.pdf",
    model: "climatescope-2019.xlsm",
    imgSrc: "climatescope-2019-report-en-cover.jpg",
    url: "https://2019.global-climatescope.org/",
  },
  {
    title: "Emerging markets outlook 2020",
    year: 2020,
    slug: "climatescope-2020-report-en.pdf",
    model: "climatescope-2020.xlsm",
    imgSrc: "climatescope-2020-report-en-cover.jpg",
    url: "https://2020.global-climatescope.org/",
  },
  {
    title: "Energy transition factbook 2021",
    year: 2021,
    slug: "climatescope-2021-report.pdf",
    model: "CS2021_Model.xlsm",
    imgSrc: "climatescope-2021-report-en-cover.jpg",
    url: "https://2021.global-climatescope.org/",
  },
]

const ReportsPage = () => {
  return (
    <>
      <SEO title="Reports" />
      <Container>
        <SimpleGrid columns={3} pt={10} pb={40}>
          <Box gridColumn="1 / -1">
            <Heading as="h1" fontSize={["3xl", null, "5xl"]}>
              {"Reports"}
            </Heading>
          </Box>

          <SimpleGrid
            columns={4}
            gridRowGap={[10, null, 16]}
            gridColumn="1 / -1"
          >
            {climatescopeIssues.sort((a, b) => b.year - a.year).map((issue) => (
              <LinkBox
                key={issue.year}
                variant="card"
                gridColumn={["span 2", null, null, "span 1"]}
              >
                <Stack spacing={4} h="100%">
                  <Box>
                    <Image
                      src={issue.imgSrc}
                      ratio={1 / 1.28}
                      type="reportThumbnail"
                    />
                  </Box>
                  <Stack spacing={1} h="100%">
                    <Text
                      color="gray.500"
                      lineHeight="short"
                      fontSize="lg"
                      fontWeight={600}
                    >
                      {`${issue.year}`}
                    </Text>
                    <LinkOverlay
                      href={`/downloads/climatescope-${issue.year}-report-en.pdf`}
                      target="_blank"
                    >
                      <Heading fontSize="lg" lineHeight="shorter">
                        {issue.title}
                      </Heading>
                    </LinkOverlay>
                  </Stack>
                  <HStack spacing={[0, null, 3]}>
                    <ButtonLink
                      href={`/downloads/climatescope-${issue.year}-report-en.pdf`}
                      target="_blank"
                      colorScheme="gray"
                      rightIcon={<DownloadIcon size={20} />}
                      display={["none", null, "flex"]}
                    >
                      {"Report"}
                    </ButtonLink>
                    {issue.year >= 2014 ? (
                      <ButtonLink
                        href={issue.url}
                        colorScheme="gray"
                        rightIcon={<ExternalIcon size={20} />}
                      >
                        {"Website"}
                      </ButtonLink>
                    ) : null}

                    {/* <ButtonLink
                    href={`https://global-climatescope.org/assets/data/model/${issue.model}`}
                    colorScheme="gray"
                    leftIcon={<DownloadIcon size={20} />}
                  >
                    {"Model"}
                  </ButtonLink> */}
                  </HStack>
                </Stack>
              </LinkBox>
            ))}
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </>
  )
}

export default ReportsPage
