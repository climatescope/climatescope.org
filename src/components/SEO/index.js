import Head from "next/head"
import getConfig from "next/config"
import { useRouter } from "next/router"

const { publicRuntimeConfig } = getConfig()
const siteUrl = publicRuntimeConfig.siteUrl
const year = publicRuntimeConfig.year

const SEO = ({
  title = "",
  description = "Which market is the most attractive for energy transition investment?",
  cover = "cover-lg.jpg",
  type = "website" /* website | article */,
}) => {
  const { basePath, asPath } = useRouter()

  const slugUrl = siteUrl + basePath + asPath
  const coverImg = cover ? siteUrl + basePath + "images/" + cover : ""

  const combinedTitle = title
    ? `Climatescope ${year} | ${title}`
    : `Climatescope ${year}`

  return (
    <Head>
      <meta content="en" httpEquiv="Content-Language" />

      <title>{combinedTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={slugUrl} />
      <meta property="og:title" content={combinedTitle} />
      <meta property="og:description" content={description} />
      {cover && <meta name="image" property="og:image" content={coverImg} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={slugUrl} />
      <meta name="twitter:title" content={combinedTitle} />
      <meta name="twitter:description" content={description} />
      {cover && <meta name="twitter:image" content={coverImg} />}

      <link rel="canonical" href={slugUrl} />
    </Head>
  )
}

export default SEO
