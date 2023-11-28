// import {
//   Box,
//   Container,
//   Stack,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
// } from "@chakra-ui/react"
// import { useRouter } from "next/router"

// import SEO from "@components/SEO"
// import SimpleGrid from "@components/SimpleGrid"
// import { ChevronDown } from "@components/Icon"
// import extractKeyMDXParts from "@utils/extractKeyMDXParts"

// const languages = [
//   { id: "en", label: "English" },
//   { id: "es", label: "Español" },
//   { id: "fr", label: "Français" },
//   { id: "pt", label: "Portuguese" },
//   { id: "ru", label: "русский" },
//   { id: "cn", label: "中文" },
// ]

// export default function PressReleasePost({ metaData, children, ...restProps }) {
//   const router = useRouter()
//   const { heading, textBody } = extractKeyMDXParts(children, {
//     subHeading: false,
//   })

//   const availableLanguages = metaData.languages || []
//   const filteredLanguages = languages.filter((d) =>
//     availableLanguages.includes(d.id)
//   )

//   const currentLanguage = filteredLanguages.find((s) => s.id === metaData.lang)

//   const handleClick = (language) => () => {
//     console.log(language, metaData.slug)
//     const ext = language.id === "en" ? "" : `-${language.id.toLowerCase()}`
//     router.push(`/blog/${metaData.slug}${ext}`)
//   }

//   return (
//     <>
//       <SEO {...metaData} />
//       <Container as="main">
//         <SimpleGrid columns={8} pt={10} pb={40}>
//           <Box gridColumn={["1 / -1", null, null, "2 / span 5"]} gridRow="1">
//             {heading}
//           </Box>

//           <Stack
//             gridColumn={["1 / -1", null, null, "-3 / -1"]}
//             gridRow="2"
//             alignItems={["flex-start", null, null, "flex-end"]}
//             spacing={0}
//           >
//             {currentLanguage && (
//               <Box>
//                 <Menu>
//                   <MenuButton
//                     as={Button}
//                     colorScheme="gray"
//                     rightIcon={<ChevronDown />}
//                   >
//                     {currentLanguage.label}
//                   </MenuButton>
//                   <MenuList borderColor="gray.50" boxShadow="lg">
//                     {filteredLanguages
//                       .filter((d) => d.id !== metaData.lang)
//                       .map((language) => {
//                         return (
//                           <MenuItem
//                             key={language.id}
//                             textTransform="capitalize"
//                             _hover={{ bg: "gray.50" }}
//                             _focus={{ bg: "gray.50" }}
//                             onClick={handleClick(language)}
//                           >
//                             {language.label}
//                           </MenuItem>
//                         )
//                       })}
//                   </MenuList>
//                 </Menu>
//               </Box>
//             )}
//           </Stack>

//           <Box
//             gridColumn={["1 / -1", null, null, "2 / span 5"]}
//             gridRow={["3", null, null, "2"]}
//           >
//             <Stack
//               spacing={[5, null, 8]}
//               sx={{
//                 "p:first-of-type": {
//                   fontWeight: 500,
//                   fontSize: ["lg", null, "2xl"],
//                 },
//               }}
//               {...restProps}
//             >
//               {textBody}
//             </Stack>
//           </Box>
//         </SimpleGrid>
//       </Container>
//     </>
//   )
// }

















import { MDXRemote } from "next-mdx-remote"
import { Container, Stack } from "@chakra-ui/layout"

import SimpleGrid from "@components/SimpleGrid"
import SEO from "@components/SEO"
import components from "@components/MDXComponents"
import { getAllMDXSlugs, getMDXPage } from "@utils/api/server"

export default function Page({ source }) {
  const { frontmatter } = source
  return (
    <div>
      <SEO {...frontmatter} />
      <Container as="main">
        <SimpleGrid columns={8} pt={10} pb={40}>
          <Stack
            spacing={10}
            gridColumn={["1 / -1", null, null, "2 / span 5"]}
            sx={{
              "h1 + p": { color: "gray.500", fontSize: ["lg", null, "xl"] },
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
