'use strict'
import React from 'react'

/**
 * Adds 0s to a number untill it becomes the specified length
 *
 * @param {number} value The value pad
 * @param {number} len The desired length
 */
export function padNumber (value, len = 0) {
  value = value.toString()
  while (value.length < len) {
    value = `0${value}`
  }
  return value
}

/**
 * Converts line breaks to React <br> components
 * From https://github.com/yosuke-furukawa/react-nl2br
 *
 * @param {string} str The string to convert
 *
 * @returns {array}
 */
export function reactNl2Br (str) {
  const newlineRegex = /(\r\n|\r|\n)/g
  if (typeof str === 'number') {
    return str
  } else if (typeof str !== 'string') {
    return ''
  }

  return str.split(newlineRegex).map((line, index) => (
    line.match(newlineRegex)
      ? React.createElement('br', { key: index })
      : line
  ))
}

/**
 * Compare strings ignoring the case.
 *
 * @param {string} a String 1
 * @param {string} b String 2
 */
export function equalsIgnoreCase (a, b) {
  a = typeof a === 'string' ? a.toLowerCase() : a
  b = typeof b === 'string' ? b.toLowerCase() : b
  return a === b
}
