'use strict'
import get from 'lodash.get'

/**
 * Constructs a date object from a year.
 * @param {number} y Year
 */
export const dateFromYear = (y) => new Date(`${y}-01-31`)

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
