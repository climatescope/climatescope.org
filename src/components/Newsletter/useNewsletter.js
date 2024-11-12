import { useState, useRef } from "react"

import addToMailchimp from "@/components/Newsletter/addToMailchimp"

export const useNewsletter = () => {
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

  return {
    onChange: handleChange,
    onOptIn: handleOptIn,
    onSubmit: handleSubmit,
    message,
    hasError,
    organization,
    setOrganization,
    email,
    setEmail,
    checkboxRef,
  }
}
