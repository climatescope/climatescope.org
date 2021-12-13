import { getPages } from "@utils/api/server"
import SEO from "@components/SEO"

export default function AboutPage({ allPages }) {
  return (
    <>
      <SEO title="About" />
      {"About page"}
    </>
  )
}

export async function getStaticProps() {
  const allPages = (await getPages("about")) || []
  return { props: { allPages } }
}
