import { MDXRemote } from "next-mdx-remote"
import { Box, Container, Stack } from "@chakra-ui/layout"
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu"
import { Button } from "@chakra-ui/button"
import { useRouter } from "next/router"
import { parse, join } from "path"

import SimpleGrid from "@components/SimpleGrid"
import SEO from "@components/SEO"
import components from "@components/MDXComponents"
import { ChevronDown } from "@components/Icon"
import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"

const languages = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "fr", label: "Français" },
  { id: "pt", label: "Português" },
  { id: "ru", label: "русский" },
  { id: "cn", label: "中文" },
]

export default function BlogPage({ source }) {
  const router = useRouter()
  const { frontmatter } = source
  const currentLanguage = languages.find((s) => s.id === frontmatter.lang) || ""
  const availableLanguages = languages.filter(({ id }) =>
    frontmatter.languages.includes(id)
  )

  const handleClick = (language) => () => {
    const { root, dir, name } = parse(router.asPath)
    const isEn = currentLanguage.id === "en"
    const basename = isEn ? name : name.split("-").slice(0, -1).join("-")
    const ext = language.id === "en" ? "" : `-${language.id}`
    router.push(join(root, dir, basename + ext))
  }

  return (
    <div>
      <SEO {...frontmatter} />
      <Container as="main">
        <SimpleGrid columns={8} pt={10} pb={40}>
          {currentLanguage && (
            <Box
              gridColumn={["1 / -1", null, null, "-3 / -1"]}
              gridRow={["1", null, null, "1 / span 1"]}
              textAlign={["left", null, null, "right"]}
            >
              <Menu>
                <MenuButton
                  as={Button}
                  colorScheme="gray"
                  rightIcon={<ChevronDown />}
                >
                  {currentLanguage.label}
                </MenuButton>
                <MenuList borderColor="gray.50" boxShadow="lg">
                  {availableLanguages.map((language) => {
                    return (
                      <MenuItem
                        key={language.id}
                        textTransform="capitalize"
                        _hover={{ bg: "gray.50" }}
                        _focus={{ bg: "gray.50" }}
                        onClick={handleClick(language)}
                        isDisabled={language.id === currentLanguage.id}
                        lang={language.id}
                        title={language.label}
                      >
                        {language.label}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
            </Box>
          )}
          <Stack
            spacing={10}
            gridColumn={["1 / -1", null, null, "2 / span 5"]}
            gridRow={["2", null, null, "1 / span 1"]}
            sx={{
              "h1 + p": {
                fontSize: ["lg", null, "2xl"],
                lineHeight: "short",
                fontWeight: 500,
              },
            }}
          >
            <MDXRemote {...source} components={components} />
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const source = await getMDXPage("blog", params.slug || "")
  return { props: { source } }
}

export async function getStaticPaths() {
  const slugs = await getAllMDXSlugs("blog")
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
