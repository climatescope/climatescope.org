import { useState, useRef } from "react"
import { Box, Text, Stack, Checkbox } from "@chakra-ui/react"

import { Link } from "@components/Link"
import NewsletterSignup from "@components/Newsletter/NewsletterSignup"
import SignupInput from "@components/Newsletter/SignupInput"
import SignupButton from "@components/Newsletter/SignupButton"
import OrganizationDropdown from "@components/Newsletter/OrganizationDropdown"
import addToMailchimp from "@components/Newsletter/addToMailchimp"

const Newsletter = () => {
  const checkboxRef = useRef()
  const [GDPRConfirmation, setGDPRConfirmation] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [hasError, setError] = useState(false)
  const [organization, setOrganization] = useState("")

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!GDPRConfirmation) {
      if (email && organization) {
        setError(true)
        setMessage("Please tick the checkbox to proceed.")
        checkboxRef?.current?.focus()
        return
      } else {
        setError(true)
        if (email && !organization) {
          setMessage("Type in your email address")
          return
        } else if (!email && organization) {
          setMessage("Select a role")
          return
        } else if (!email && !organization) {
          setMessage("Type in your email address and select a role")
          return
        }
      }
    }

    addToMailchimp(email, { "group[282221]": `${organization || 64}` })
      .then(({ msg, result }) => {
        if (result !== "success") {
          throw msg
        } else {
          setError(false)
          setMessage(msg)
        }
      })
      .catch((err) => {
        setError(true)
        setMessage(err)
      })
  }

  const handleChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handleOptIn = (evt) => {
    setGDPRConfirmation(evt.target.checked)
  }

  return (
    <Box>
      <Stack spacing="1.25rem">
        <NewsletterSignup onSubmit={handleSubmit}>
          <SignupInput isRequired onChange={handleChange} />
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
          onChange={handleOptIn}
        >
          <Text mt="-0.3125rem" lineHeight="short" maxW="30rem">
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
