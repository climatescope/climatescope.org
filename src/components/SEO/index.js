import Head from "next/head"
import getConfig from "next/config"
import { useRouter } from "next/router"

const { publicRuntimeConfig } = getConfig()
const siteUrl = publicRuntimeConfig.siteUrl

const SEO = ({
  title = "",
  description = "",
  cover = "cover-lg.jpg",
  type = "website" /* website | article */,
}) => {
  const { basePath, asPath } = useRouter()

  const slugUrl = siteUrl + basePath + asPath
  const coverImg = cover ? siteUrl + basePath + "images/" + cover : ""

  const combinedTitle = title
    ? `Climatescope 2021 | ${title}`
    : `Climatescope 2021`

  return (
    <Head>
      <title>{combinedTitle}</title>
      <meta name="description" content={description} />

      <meta name="og:type" content={type} />
      <meta name="og:url" content={slugUrl} />
      <meta name="og:title" content={combinedTitle} />
      <meta name="og:description" content={description} />
      {cover && <meta name="og:image" content={coverImg} />}

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
