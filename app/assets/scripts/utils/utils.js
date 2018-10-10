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
  return Object.keys(obj).map(k => obj[k])
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
