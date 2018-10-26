'use strict'
import React from 'react'
import get from 'lodash.get'

/**
 * Gets the given path from the state or return the default:
 * {
 *   fetched: false,
 *   fetching: false,
 *   data: {},
 *   error: null
 * }
 *
 * @see lodash.get
 *
 * @param {object} state The redux state
 * @param {array | string} path The path to get. Passed to lodash.get
 *
 * @returns {object} State or default
 */
export function getFromState (state, path) {
  return get(state, path, { fetched: false, fetching: false, data: {}, error: null })
}

/**
 * Randomizes the order of the values of an array, returning a new array.
 * Uses the Fisher-Yates algorithm to reorder the elements of the array.
 *
 * @param {array} arr Array to shuffle
 *
 * @returns {array} The shuffled array
 */
export function shuffleArray ([...arr]) {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

/**
 * Converts an object to array.
 *
 * @param {object} obj Object to convert to array
 */
export function objectToArray (obj) {
  return Object.keys(obj).map(k => {
    // If the value is an object include the key
    return isPlainObject(obj[k])
      ? { ...obj[k], __key: k }
      : obj[k]
  })
}

/**
 * Checks if the provided value is an object created by the Object constructor.
 *
 * Check if the provided value is truthy, use typeof to check if it is an
 * object and Object.constructor to make sure the constructor is
 * equal to Object.
 *
 * @param {object} obj Object to check
 */
export function isPlainObject (val) {
  return !!val && typeof val === 'object' && val.constructor === Object
}

/**
 * Returns the sum of an array, after mapping each element to a value using the
 * provided function.
 *
 * @param {array} arr The array of objects to sum
 * @param {function|string} fn The key for the value of the function to
 *                             access it.
 */
export function sumBy (arr, fn) {
  return arr.reduce((acc, val, i, all) => acc + (typeof fn === 'function' ? fn(val, i, all) : val[fn]), 0)
}

/**
 * Rounds a number to a specified amount of decimals.
 *
 * @param {number} value The value to round
 * @param {number} decimals The number of decimals to keep. Default to 2
 */
export function round (value, decimals = 2) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

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
 * Divides a number and distributes the remainder.
 * Example 5 / 3 = [2, 2, 1]
 *
 * @param {number} dividend Dividend
 * @param {number} divisor Divisor
 *
 * @return {array}
 */
export function distributedDivision (dividend, divisor) {
  const intRes = Math.floor(dividend / divisor)
  const reminder = dividend % divisor
  return Array.from({ length: divisor }).map((_, i) => i < reminder ? intRes + 1 : intRes)
}

/**
 * Initializes an array containing the numbers in the specified range where
 * start and end are inclusive with their common difference step.
 *
 * @param {number} end
 * @param {number} start Default value of 0
 * @param {number} step Default value of 0
 *
 * @returns {array}
 */
export function initializeArrayWithRange (end, start = 0, step = 1) {
  return Array.from({ length: Math.ceil((end - start + 1) / step) }, (v, i) => i * step + start)
}

/**
 * Wraps the api result with helpful functions.
 * To be used in the state selector.
 *
 * @param {object} stateData Object as returned from an api request. Expected to
 *                           be in the following format:
 *                           {
 *                             fetched: bool,
 *                             fetching: bool,
 *                             data: object,
 *                             error: null | error
 *                           }
 *
 * @returns {object}
 * {
 *   raw(): retuns the data as is.
 *   isReady(): Whether or not the fetching finished and was fetched.
 *   hasError(): Whether the resquest finished with an error.
 *   getData(): Returs the data. If the data has a results list will return that
 *   getMeta(): If there's a meta object it will be returned
 *
 * As backward compatibility all data properties are accessible directly.
 * }
 */
export function wrapApiResult (stateData) {
  const { fetched, fetching, data, error } = stateData
  const ready = fetched && !fetching
  return {
    raw: () => stateData,
    isReady: () => ready,
    hasError: () => ready && !!error,
    getData: (def = {}) => ready ? (data.results || data) : def,
    getMeta: (def = {}) => ready ? data.meta : def,

    // As backward compatibility
    ...stateData
  }
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
