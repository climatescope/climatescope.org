'use script'
import get from 'lodash.get'

/**
 * Delays the execution in x milliseconds.
 *
 * @param {int} millis Milliseconds
 */
function delay (millis) {
  return new Promise(resolve => {
    setTimeout(resolve, millis)
  })
}

/**
 * Performs a request to the given url returning the response in json format
 * or throwing an error.
 *
 * @param {string} url Url to query
 * @param {object} options Options for fecth
 */
export async function fetchJSON (url, options) {
  try {
    const response = await fetch(url, options)
    const json = await response.json()

    if (response.status >= 400) {
      const message = json.message ||
        response.statusText ||
        `Error with code ${response.status}`
      const err = new Error(message)
      err.statusCode = response.status
      err.data = json
      throw err
    }

    return json
  } catch (error) {
    console.log('fetchJSON error', error)
    throw error
  }
}

/**
 * Performs a query to the given url dispatching the appropriate actions.
 * If there's data in the state, that is used instead.
 *
 * @param {object} options Options.
 * @param {string} options.statePath Path to where data is on the state.
 * @param {string} options.url Url to query.
 * @param {func} options.requestFn Request action to dispatch.
 * @param {func} options.receiveFn Receive action to dispatch.
 * @param {func} options.mutator Function to change the response before sending
 *                               it to the receive function.
 */
export function fetchDispatchCacheFactory ({ statePath, url, requestFn, receiveFn, mutator, __devDelay }) {
  mutator = mutator || (v => v)
  return async function (dispatch, getState) {
    const pageState = get(getState(), statePath)
    if (pageState && pageState.fetched && !pageState.error) {
      if (__devDelay) await delay(__devDelay)
      return dispatch(receiveFn(pageState.data))
    }
    dispatch(requestFn())

    try {
      const response = await fetchJSON(url)
      const content = mutator(response)
      if (__devDelay) await delay(__devDelay)
      return dispatch(receiveFn(content))
    } catch (error) {
      if (__devDelay) await delay(__devDelay)
      console.log('error', error)
      return dispatch(receiveFn(null, error))
    }
  }
}

/**
 * Base reducer for an api request, taking into account the action.id
 * If it exists it will store in the state under that path. Allows for
 * page caching.
 *
 * Uses the following actions:
 * - INVALIDATE_<actionName>
 * - REQUEST_<actionName>
 * - RECEIVE_<actionName>
 *
 * @param {object} state The state.
 * @param {object} action The action.
 * @param {string} actionName The action name to use as suffix
 */
export function baseAPIReducer (state, action, actionName) {
  const hasId = typeof action.id !== 'undefined'
  switch (action.type) {
    case `INVALIDATE_${actionName}`:
      return hasId
        ? { ...state, [action.id]: state }
        : state
    case `REQUEST_${actionName}`:
      const changeReq = {
        fetching: true,
        fetched: false,
        data: {}
      }
      return hasId
        ? { ...state, [action.id]: changeReq }
        : changeReq
    case `RECEIVE_${actionName}`:
      let st = {
        fetching: false,
        fetched: true,
        receivedAt: action.receivedAt,
        data: {},
        error: null
      }

      if (action.error) {
        st.error = action.error
      } else {
        st.data = action.data
      }

      return hasId
        ? { ...state, [action.id]: st }
        : st
  }
  return state
}

/**
 * make an array fron other array, consider a number pages and page
 *
 * @param {array} array The list of publications.
 * @param {int} pageSize The size for every page
 * @param {int} pageNumber The name of page
 */
export function paginateFake (array, pageSize, pageNumber) {
  --pageNumber // because pages logically start with 1, but technically with 0
  // for paginate
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
  // for one list in paginate (load more)
  // return array.slice(0, (pageNumber + 1) * pageSize)
}
