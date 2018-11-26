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

/**
 * Adds spaces every 3 digits and rounds the number.
 *
 * @param {number} num The number to format.
 * @param {number} decimals Amount of decimals to keep. (Default 2)
 * @param {boolean} forceDecimals Force the existence of decimal. (Default false)
 *                  Eg: Using 2 decimals and force `true` would result:
 *                  formatTousands(1 /2, 2, true) => 0.50
 *
 * @example
 * formatTousands(1)               1
 * formatTousands(1000)            1 000
 * formatTousands(10000000)        10 000 000
 * formatTousands(1/3)             0.33
 * formatTousands(100000/3)        33 333.33
 * formatTousands()                --
 * formatTousands('asdasdas')      --
 * formatTousands(1/2, 0)          1
 * formatTousands(1/2, 0, true)    1
 * formatTousands(1/2, 5)          0.5
 * formatTousands(1/2, 5, true)    0.50000
 *
 */
export function formatTousands (num, decimals = 2, forceDecimals = false) {
  // isNaN(null) === true
  if (isNaN(num) || (!num && num !== 0)) {
    return '--'
  }

  const repeat = (char, length) => {
    let str = ''
    for (let i = 0; i < length; i++) str += (char + '')
    return str
  }

  let [int, dec] = Number(round(num, decimals)).toString().split('.')
  // Space the integer part of the number.
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  // Round the decimals.
  dec = (dec || '').substr(0, decimals)
  // Add decimals if forced.
  dec = forceDecimals ? `${dec}${repeat(0, decimals - dec.length)}` : dec

  return dec !== '' ? `${int}.${dec}` : int
}
