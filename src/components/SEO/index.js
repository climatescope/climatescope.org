import Head from "next/head"
import getConfig from "next/config"
import { useRouter } from "next/router"

const { publicRuntimeConfig } = getConfig()
const siteUrl = publicRuntimeConfig.siteUrl

const SEO = ({
  title = "Climatescope 2021",
  description = "Climatescope 2021",
  cover = "cover-lg.jpg",
  type = "website" /* website | article */,
}) => {
  const { basePath, asPath } = useRouter()

  const slugUrl = siteUrl + basePath + asPath
  const coverImg = cover ? siteUrl + basePath + "images/" + cover : ""

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta name="og:type" content={type} />
      <meta name="og:url" content={slugUrl} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      {cover && <meta name="og:image" content={coverImg} />}

      {cover && <meta name="image" property="og:image" content={coverImg} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={slugUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {cover && <meta name="twitter:image" content={coverImg} />}

      <link rel="canonical" href={slugUrl} />
    </Head>
  )
}

export default SEO
