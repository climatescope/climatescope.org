'use strict'
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
