import { Box, Text, Stack, Checkbox } from "@chakra-ui/react"

import { Link } from "@/components/Link"
import NewsletterSignup from "@/components/Newsletter/NewsletterSignup"
import SignupInput from "@/components/Newsletter/SignupInput"
import SignupButton from "@/components/Newsletter/SignupButton"
import OrganizationDropdown from "@/components/Newsletter/OrganizationDropdown"
import { useNewsletter } from "@/components/Newsletter/useNewsletter"

const Newsletter = (props) => {
  const {
    onChange,
    onOptIn,
    onSubmit,
    message,
    hasError,
    organization,
    setOrganization,
    checkboxRef,
  } = useNewsletter()

  return (
    <Box {...props}>
      <Stack spacing="1.25rem">
        <NewsletterSignup onSubmit={onSubmit}>
          <SignupInput isRequired onChange={onChange} />
          <OrganizationDropdown
            value={organization}
            onChange={setOrganization}
          />
          <SignupButton type="submit">{"Sign up"}</SignupButton>
        </NewsletterSignup>
        <Checkbox
          ref={checkboxRef}
          iconColor="white"
          colorScheme="brand"
          size="md"
          alignItems="flex-start"
          spacing="0.8125rem"
          onChange={onOptIn}
          sx={{
            "svg": { color: "brand.1000" },
            "input:focus + span": {
              borderColor: "brand.500",
              boxShadow: "none",
              outline: "0.125rem solid",
              outlineColor: "brand.500",
              outlineOffset: "0.125rem",
            },
          }}
        >
          <Text mt="-0.125rem" lineHeight="short" maxW="30rem">
            {"By submitting my information, I agree to the "}
            <Link
              href="https://www.bloomberg.com/notices/privacy/"
              color="brand.500"
            >
              {"privacy policy"}
            </Link>
            {" and to learn more about products and services from Bloomberg."}
          </Text>
        </Checkbox>
      </Stack>

      {message ? (
        <Box
          borderRadius="lg"
          bg={hasError ? "red.200" : "teal.500"}
          color={hasError ? "red.900" : "teal.100"}
          py="0.75rem"
          px="1.25rem"
          my={4}
        >
          <Text
            lineHeight="short"
            dangerouslySetInnerHTML={{ __html: message }}
            sx={{
              a: { textDecoration: "underline" },
            }}
          />
        </Box>
      ) : null}
    </Box>
  )
}

export default Newsletter
