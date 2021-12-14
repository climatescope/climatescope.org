import { useState } from "react"
import { Box, Text, Stack, Checkbox } from "@chakra-ui/react"

import { Link } from "@components/Link"
import NewsletterSignup from "@components/Newsletter/NewsletterSignup"
import SignupInput from "@components/Newsletter/SignupInput"
import SignupButton from "@components/Newsletter/SignupButton"
import addToMailchimp from "@components/Newsletter/addToMailchimp"

const Newsletter = () => {
  const [GDPRConfirmation, setGDPRConfirmation] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [hasError, setError] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!GDPRConfirmation) {
      if (email) {
        setError(true)
        setMessage("Please tick the checkbox to proceed.")
        return
      } else {
        setError(true)
        setMessage("Type in your email address")
        return
      }
    }

    addToMailchimp(email, {})
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
          <SignupButton type="submit">{"Sign up"}</SignupButton>
        </NewsletterSignup>
        <Checkbox
          iconColor="white"
          colorScheme="brand"
          size="md"
          alignItems="flex-start"
          spacing="0.8125rem"
          onChange={handleOptIn}
        >
          <Text mt="-0.3125rem" lineHeight="short" maxW="30rem">
            {"By submitting my information, I agree to the "}
            <Link href="https://www.bloomberg.com/notices/privacy/" color="brand.800">
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
