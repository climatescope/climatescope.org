import { useRouter } from "next/router"

const siteUrl = "https://www.global-climatescope.org/"

export default function useShareButton(opts) {
  const { platform } = opts || {}
  const router = useRouter()
  const shareLinks = getShareLinks(router.asPath)
  return platform ? shareLinks[platform] || "" : shareLinks
}

function getShareUrl(siteUrl, asPath) {
  const [a, b] = siteUrl.split("//")
  return `${a}//${b
    .split("/")
    .filter((d) => d)
    .join("/")}${asPath}`
}

function getShareLinks(asPath) {
  const twitterRoot = "http://twitter.com/intent/tweet"
  const facebookRoot = "http://facebook.com/sharer/sharer.php"
  const linkedinRoot = "http://linkedin.com/shareArticle"

  const shareUrl = getShareUrl(siteUrl, asPath)

  const twitterShareText = `Discover the most attractive markets for energy transition investment. @BloombergNEF`
  const facebookShareText = `${shareUrl}`
  const emailSubject = `Climatescope 2024`
  const emailBody = `${shareUrl}`

  const encodedTwitterShareText = encodeURIComponent(twitterShareText)
  const encodedFacebookShareText = encodeURIComponent(facebookShareText)

  const twitterShareUrl = `${twitterRoot}?url=${shareUrl}&text=${encodedTwitterShareText}&original_referer=${shareUrl}`
  const facebookShareUrl = `${facebookRoot}?u=${shareUrl}&text=${encodedFacebookShareText}&original_referer=${shareUrl}`
  const linkedinShareUrl = `${linkedinRoot}?url=${shareUrl}`
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    emailSubject
  )}&body=${emailBody}`

  return {
    twitter: twitterShareUrl,
    facebook: facebookShareUrl,
    linkedin: linkedinShareUrl,
    email: emailShareUrl,
  }
}
