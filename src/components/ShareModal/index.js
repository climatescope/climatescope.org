import {
  Stack,
  Text,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VisuallyHidden,
  Wrap,
  WrapItem,
  Divider,
} from "@chakra-ui/react"

import { ShareIcon, TwitterIcon, FacebookIcon, LinkedinIcon, EnvelopeIcon } from "@components/Icon"
import ShareButton from "@components/ShareButton"

const ShareModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        colorScheme="gray"
        w="2.5rem"
        px={0}
        borderRadius="full"
        onClick={onOpen}
      >
        <ShareIcon size={20} strokeWidth={2} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent py={5} borderRadius="lg">
          <ModalCloseButton borderRadius="full" />
          <ModalBody>
            <Stack spacing={5}>
              <Text
                lineHeight="shorter"
                fontWeight={700}
                textTransform="uppercase"
              >
                {"Share this page"}
              </Text>
              <Divider/>
              <Wrap spacing={3}>
                <WrapItem flex={["0", null, null, "1"]}>
                  <ShareButton platformName="twitter">
                    <VisuallyHidden>{"Share on Twitter"}</VisuallyHidden>
                    <TwitterIcon size={20} />
                  </ShareButton>
                </WrapItem>
                <WrapItem flex={["0", null, null, "1"]}>
                  <ShareButton platformName="linkedin">
                    <VisuallyHidden>{"Share on Linkedin"}</VisuallyHidden>
                    <LinkedinIcon size={20} />
                  </ShareButton>
                </WrapItem>
                <WrapItem flex={["0", null, null, "1"]}>
                  <ShareButton platformName="facebook">
                    <VisuallyHidden>{"Share on Facebook"}</VisuallyHidden>
                    <FacebookIcon size={20} />
                  </ShareButton>
                </WrapItem>
                <WrapItem flex={["0", null, null, "1"]}>
                  <ShareButton platformName="email">
                    <VisuallyHidden>{"Share via email"}</VisuallyHidden>
                    <EnvelopeIcon size={20} />
                  </ShareButton>
                </WrapItem>
              </Wrap>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ShareModal
