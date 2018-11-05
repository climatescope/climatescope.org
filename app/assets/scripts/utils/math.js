'use strict'

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
