import { Heading, Text, Box, Stack, Tag } from "@chakra-ui/react"

import { LinkBox, LinkOverlay } from "@components/Link"
import Image from "@components/Image"

const SectorCard = ({
  title,
  img,
  alt,
  href,
  isNew,
  comingSoon,
  marketCounts,
  order,
}) => {
  return (
    <LinkBox as={Box} order={order}>
      <Stack spacing={3}>
        <Box>
          <Image
            src={img}
            alt={alt}
            type="sector"
            ratio={[1, 3 / 4, 1, 3 / 4]}
            opacity={comingSoon ? "0.5" : "1"}
          />
        </Box>
        <Stack spacing={1}>
          <Heading as="h2" fontSize="3xl">
            {comingSoon ? (
              <span>{title}</span>
            ) : (
              <LinkOverlay href={href}>{title}</LinkOverlay>
            )}
            {/* <LinkOverlay href={href}>{title}</LinkOverlay> */}
            {isNew ? (
              <Tag
                verticalAlign="middle"
                ml={2}
                size="sm"
                textTransform="uppercase"
                fontWeight={600}
              >
                {"New"}
              </Tag>
            ) : null}
            {comingSoon ? (
              <Tag
                verticalAlign="middle"
                ml={2}
                size="sm"
                textTransform="uppercase"
                fontWeight={600}
                colorScheme="gray"
              >
                {"Coming soon"}
              </Tag>
            ) : null}
          </Heading>
          <Text
            fontSize="sm"
            lineHeight="shorter"
            color="gray.500"
            fontWeight={600}
          >
            {comingSoon ? "" : `${marketCounts[title.toLowerCase()]} markets`}
          </Text>
        </Stack>
      </Stack>
    </LinkBox>
  )
}

export default SectorCard
