import { Stack } from "@chakra-ui/react"

import { Link } from "@components/Link"

export default function ToolsLandingPage({ allTools }) {
  return (
    <Stack spacing={5}>
      {
        allTools.map(tool => {
          return (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              {tool.title}
            </Link>
          )
        })
      }
    </Stack>
  )
}
