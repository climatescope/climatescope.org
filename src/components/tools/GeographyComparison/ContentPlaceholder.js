import {
  Stack,
  Heading,
  Skeleton,
  SkeletonCircle,
  Center,
} from "@chakra-ui/react"

import SimpleGrid from "@components/SimpleGrid"
import ProfileDivider from "./ProfileDivider"

const ContentPlaceholder = ({ slot }) => {
  return (
    <>
      <ProfileDivider slot={slot} />
      <SimpleGrid columns={2} px={5}>
        <Stack spacing={1}>
          <Heading
            textTransform="uppercase"
            fontSize="xs"
            color="gray.500"
            isTruncated
          >
            {"Global rank"}
          </Heading>
          <Skeleton h="1.5625rem" startColor="gray.50" endColor="gray.100" />
        </Stack>
        <Stack spacing={1}>
          <Heading
            textTransform="uppercase"
            fontSize="xs"
            color="gray.500"
            isTruncated
          >
            {"Global score"}
          </Heading>
          <Skeleton h="1.5625rem" startColor="gray.50" endColor="gray.100" />
        </Stack>
        
      </SimpleGrid>
      <ProfileDivider slot={slot} />
      <Stack px={5} spacing={10}>
        <Skeleton
          alignSelf="flex-start"
          w="4rem"
          h="3rem"
          startColor="gray.50"
          endColor="gray.100"
        />
        <Center>
          <SkeletonCircle
            w="14rem"
            h="14rem"
            startColor="gray.50"
            endColor="gray.100"
          />
        </Center>
      </Stack>
    </>
  )
}

export default ContentPlaceholder
