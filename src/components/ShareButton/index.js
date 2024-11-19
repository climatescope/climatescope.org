import {
  HStack,
  Text,
  Stack,
  SimpleGrid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"

import {
  ShareIcon,
  CloseIcon,
  TwitterIcon,
  LinkedInIcon,
  FacebookIcon,
  EmailIcon,
} from "@/components/Icon"
import { ButtonLink } from "@/components/Link"
import useShareButton from "./useShareButton"

export default function PageHeaderShareButton(props) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const shareLinks = useShareButton()
  return (
    <HStack spacing={0}>
      <Button
        colorScheme="gray"
        borderRadius="sm"
        rightIcon={<ShareIcon size="1.25rem" />}
        onClick={onOpen}
        {...props}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="46rem" mx={5} borderRadius="none">
          <ModalCloseButton
            top={3}
            right={3}
            borderRadius="none"
            w={10}
            h={10}
            _focusVisible={{
              outline: "0.125rem solid black",
              outlineOffset: "0.125rem",
            }}
          >
            <CloseIcon size="1.75rem" aria-hidden="true" focusable="false" />
          </ModalCloseButton>
          <ModalHeader
            pt={16}
            pb={3}
            px={10}
            fontWeight={700}
            fontSize="3xl"
            lineHeight="shorter"
          >
            {"Share this content"}
          </ModalHeader>
          <ModalBody pt={0} pb={10} px={10}>
            <Stack spacing={6}>
              <Text color="gray.500" fontSize="lg">
                {
                  "Spread the word and share this page with your audience across various social channels"
                }
              </Text>
              <SimpleGrid columns={[2]} gridGap={6}>
                <ButtonLink
                  bg="black"
                  color="white"
                  _hover={{ bg: "twitter.500" }}
                  _focusVisible={{
                    bg: "twitter.500",
                    outline: "0.125rem solid",
                    outlineColor: "twitter.500",
                  }}
                  textAlign="left"
                  justifyContent="flex-start"
                  leftIcon={<TwitterIcon />}
                  href={shareLinks.twitter}
                >
                  {"X (Twitter)"}
                </ButtonLink>
                <ButtonLink
                  bg="black"
                  color="white"
                  _hover={{ bg: "facebook.500" }}
                  _focusVisible={{
                    bg: "facebook.500",
                    outline: "0.125rem solid",
                    outlineColor: "facebook.500",
                  }}
                  textAlign="left"
                  justifyContent="flex-start"
                  leftIcon={<FacebookIcon />}
                  href={shareLinks.facebook}
                >
                  {"Facebook"}
                </ButtonLink>
                <ButtonLink
                  bg="black"
                  color="white"
                  _hover={{ bg: "linkedin.500" }}
                  _focusVisible={{
                    bg: "linkedin.500",
                    outline: "0.125rem solid",
                    outlineColor: "linkedin.500",
                  }}
                  textAlign="left"
                  justifyContent="flex-start"
                  leftIcon={<LinkedInIcon />}
                  href={shareLinks.linkedin}
                >
                  {"LinkedIn"}
                </ButtonLink>
                <ButtonLink
                  bg="black"
                  color="white"
                  _hover={{ bg: "brand.500", color: "brand.1000" }}
                  _focusVisible={{
                    bg: "brand.500",
                    color: "brand.1000",
                    outline: "0.125rem solid",
                    outlineColor: "brand.500",
                  }}
                  textAlign="left"
                  justifyContent="flex-start"
                  leftIcon={<EmailIcon />}
                  href={shareLinks.email}
                >
                  {"Email"}
                </ButtonLink>
              </SimpleGrid>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  )
}
