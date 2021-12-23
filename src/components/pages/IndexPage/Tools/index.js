import { Heading, HStack } from "@chakra-ui/react"

import { Link } from "@components/Link"
import SimpleGrid from "@components/SimpleGrid"
import ToolCard from "@components/ToolCard"
import { ChevronRight } from "@components/Icon"

const Tools = ({ allTools }) => {
  return (
    <SimpleGrid columns={2}>
      <HStack
        gridColumn="1 / -1"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Heading fontSize={["3xl", null, null, "4xl"]}>{"Tools"}</Heading>
        <Link href="/tools" variant="section" display={["none", null, "flex"]}>
          {"All tools"}
          <ChevronRight size={20} strokeWidth={2} />
        </Link>
      </HStack>

      {allTools.map(({ src, title, slug, description }) => {
        return (
          <ToolCard
            key={slug}
            title={title}
            description={description}
            slug={slug}
            src={src}
          />
        )
      })}
    </SimpleGrid>
  )
}

export default Tools
