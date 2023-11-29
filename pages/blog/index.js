// import { getPages } from "@utils/api/server"

import SEO from "@components/SEO"
import BlogLandingPage from "@components/pages/BlogLandingPage"

export default function BlogPage({ allPosts }) {
  return (
    <>
      <SEO title="Blog" />
      <BlogLandingPage allPosts={allPosts} />
    </>
  )
}

export async function getStaticProps() {
  const allPosts = [
    {
      title: "Developing countries raise their clean power policy ambitions",
      description:
        "92% of emerging markets have set long-term renewable energy targets, but follow-through remains critical and incomplete, finds BloombergNEF in its latest Climatescope survey.",
      date: "2022-11-15",
      category: "Press release",
      lang: "en",
      languages: ["en", "es", "fr", "pt", "cn"],
      slug: "developing-countries-raise-their-clean-power-policy-ambitions",
    },
    {
      title: "Emerging market clean energy investment slid as Covid-19 spread",
      description:
        "Investor support for the energy transition surged in 2020 but capital flows to less developed countries slowed as the pandemic raged on",
      date: "2021-12-14",
      category: "Press release",
      lang: "en",
      languages: ["en", "es", "fr", "pt", "ru"],
      slug: "press-release-climatescope-2021",
    },
  ]
  return { props: { allPosts } }
}
