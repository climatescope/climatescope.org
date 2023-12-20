import Head from "next/head"
import getConfig from "next/config"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { parse as parsePath } from "path"

const { publicRuntimeConfig } = getConfig()
const siteUrl = publicRuntimeConfig.siteUrl
const year = publicRuntimeConfig.year

const SEO = ({
  title = "",
  description = "Which market is the most attractive for energy transition investment?",
  cover = "cover-lg.jpg",
  type = "website" /* website | article */,
  lang = "en",
}) => {
  const { basePath, asPath } = useRouter()

  const parsedPath = parsePath(cover || "")
  const hasSizeExtension = ["-sm", "-md", "-lg"].includes(
    parsedPath.name.slice(-3)
  )
  const fixedCover = hasSizeExtension
    ? cover
    : parsedPath.name + "-lg" + parsedPath.ext

  const slugUrl =
    siteUrl + basePath + (asPath[0] === "/" ? asPath.slice(1) : asPath)
  const coverImg = fixedCover ? siteUrl + basePath + "images/" + fixedCover : ""

  const combinedTitle = title
    ? `Climatescope ${year} | ${title}`
    : `Climatescope ${year}`

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    document.documentElement.setAttribute("lang", lang)
  }, [lang])

  return (
    <Head>
      <meta content={lang} httpEquiv="Content-Language" />

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
