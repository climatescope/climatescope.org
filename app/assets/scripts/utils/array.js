'use strict'
import { isPlainObject } from './utils'

/**
 * Splits the array into left and right using a splitter function.
 *
 * @param {array} arr The array to split
 * @param {function} fn The splitter function. Returning true moves items to the
 *                      left, false moves to the right
 *
 * @returns {object} Object with left and riht keys.
 */
export const splitArray = (arr, fn) => {
  return arr.reduce((acc, item, idx) => {
    if (fn(item, idx)) {
      return {
        ...acc,
        left: acc.left.concat(item)
      }
    } else {
      return {
        ...acc,
        right: acc.right.concat(item)
      }
    }
  }, { left: [], right: [] })
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
 * Reverse an array without mutating the original.
 *
 * @param {array} array The array to reverse
 */
export function reverse (array) {
  return array.slice().reverse()
}
