import {
  Container,
  Heading,
  SimpleGrid,
  Text,
  Box,
  Menu,
  MenuList,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  Button,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { MDXRemote } from "next-mdx-remote"
import { useRouter } from "next/router"

import getPage from "@/utils/api/server/getPage"
import getPages from "@/utils/api/server/getPages"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import { baseComponents } from "@/components/MDXComponents"
import SEO from "@/components/SEO"

export default function AboutDetailPage({
  source,
  otherLanguageVersions,
  currentLanguageVersion,
}) {
  const { frontmatter } = source
  const router = useRouter()

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || ""}
      />
      <main>
        <PageHeader>
          <PageHeaderSubnavigation>
            <PageHeaderBackButton href="/blog">{"Blog"}</PageHeaderBackButton>
            <PageHeaderShareButton>{"Share"}</PageHeaderShareButton>
          </PageHeaderSubnavigation>
          <PageHeaderContent gridColumn={["1 / -1", null, null, "2 / span 5"]}>
            <Heading textStyle="pageHeading">{frontmatter.title}</Heading>
            <Text textStyle="pageSubheading">{frontmatter.description}</Text>
          </PageHeaderContent>
        </PageHeader>
        <Container pb={20}>
          <SimpleGrid columns={8} gridGap={10}>
            {otherLanguageVersions?.length && currentLanguageVersion ? (
              <Box gridColumn={["1 / -1", null, null, "2 / -3"]}>
                <Menu placement="bottom-start" matchWidth>
                  <MenuButton
                    as={Button}
                    variant="solid"
                    colorScheme="gray"
                    fontWeight={600}
                    rightIcon={<ChevronDownIcon boxSize={5} />}
                    textAlign="left"
                    overflow="hidden"
                    w="auto"
                    minW="12rem"
                    sx={{
                      span: { overflow: "hidden", textOverflow: "ellipsis" },
                    }}
                  >
                    {currentLanguageVersion.label}
                  </MenuButton>
                  <MenuList
                    minW={[null, null, "12rem"]}
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
                      value={source.frontmatter.slug}
                      onChange={(val) => router.push(val)}
                    >
                      {otherLanguageVersions.map(({ id, label, href }) => (
                        <MenuItemOption key={id} value={href}>
                          {label}
                        </MenuItemOption>
                      ))}
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Box>
            ) : null}
            <MDXRemote {...source} components={baseComponents} />
          </SimpleGrid>
        </Container>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const pages = await getPages({
    pageType: "blog",
    filter: (d) => !d.slug.includes("sample-post"),
  })
  return {
    paths: pages.map((page) => ({
      params: { slug: page.slug.split("/").pop() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const source = await getPage({
    pageType: "blog",
    slug: `/blog/${slug}`,
  })

  const languages = {
    en: { id: "en", label: "English" },
    fr: { id: "fr", label: "Français" },
    es: { id: "es", label: "Español" },
    pt: { id: "pt", label: "Portuguese" },
    cn: { id: "cn", label: "中文" },
  }

  const languageExtensions = Object.keys(languages)

  const slugRaw = source.frontmatter.slug
    .split("-")
    .filter((d) => !languageExtensions.includes(d))
    .join("-")

  const allLanguageVersions = await getPages({
    pageType: "blog",
    fields: ["slug"],
    filter: (d) => d.slug.includes(slugRaw),
  })

  const otherLanguageVersions = allLanguageVersions.map((d) => {
    const id = d.slug.split("-").slice(-1)[0]
    const lang = languages[id] || languages.en
    lang.href = d.slug
    return lang
  })

  const currentLanguageVersion = otherLanguageVersions.find(
    (s) => s.href === source.frontmatter.slug
  )

  return { props: { source, otherLanguageVersions, currentLanguageVersion } }
}
