import { join, parse } from "path"
import { serialize } from "next-mdx-remote/serialize"

import getPages from "./getPages"

export default async function getPage({
  slug = "",
  pageType = "factsheets",
  options = {},
}) {
  const allPages = await getPages({ pageType })

  const relevantSlug = join("/", pageType, parse(slug).name)
  const relevantPage =
    allPages.find((s) => (s._slug || s.slug) === relevantSlug) || {}
  const { _content, content, ...relevantFrontmatter } = relevantPage
  const finalContent = _content || content

  if (!finalContent) return {}

  const serialized = await serialize(finalContent, {
    parseFrontmatter: true,
    ...options,
  })

  serialized.frontmatter = {
    ...(relevantFrontmatter || {}),
    ...serialized.frontmatter,
    // slug: relevantPage.slug || "",
  }

  return serialized
}
