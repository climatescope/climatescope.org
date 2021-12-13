import getConfig from "next/config"
import { useRouter } from "next/router"

import { ButtonLink } from "@components/Link"

const { publicRuntimeConfig } = getConfig()

const ShareButton = ({ children, colorScheme, platformName = "twitter" }) => {
  const router = useRouter()
  const shareLinks = getShareLinks(router.asPath)
  const shareUrl = shareLinks[platformName]
  return (
    <ButtonLink
      w="3rem"
      h="3rem"
      px={0}
      borderRadius="full"
      variant="ghost"
      colorScheme="gray"
      color="gray.400"
      _hover={{ color: "teal.700", bg: "teal.100" }}
      _focus={{ color: "teal.700", bg: "teal.100" }}
      _active={{ color: "teal.700", bg: "teal.100" }}
      href={shareUrl}
      colorScheme={colorScheme}
    >
      {children}
    </ButtonLink>
  )
}

function getShareLinks(asPath) {
  const twitterRoot = "http://twitter.com/intent/tweet"
  const facebookRoot = "http://facebook.com/sharer/sharer.php"
  const linkedinRoot = "http://linkedin.com/shareArticle"

  const shareUrl = publicRuntimeConfig.siteUrl + asPath

  const twitterShareText = `Which market is the most attractive for energy transition investment? Visit the latest #Climatescope from @BloombergNef to find out`
  const facebookShareText = `Which market is the most attractive for energy transition investment? Visit the latest #Climatescope from @BloombergNef to find out ${shareUrl}`
  const emailSubject = "Climatescope 2021"
  const emailBody = `Which market is the most attractive for energy transition investment? Visit the latest #Climatescope from @BloombergNef to find out ${shareUrl}`

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

export default ShareButton
