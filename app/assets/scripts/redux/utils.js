'use script'
import get from 'lodash.get'

export async function fetchJSON (url, options) {
  try {
    const response = await fetch(url, options)
    const json = await response.json()
    return json
  } catch (error) {
    console.log('fetchJSON error', error)
    throw error
  }
}

export function fetchDispatchCacheFactory ({ statePath, url, requestFn, receiveFn, mutator }) {
  mutator = mutator || (v => v)
  return async function (dispatch, getState) {
    const pageState = get(getState(), statePath)
    if (pageState && pageState.fetched && !pageState.error) {
      return dispatch(receiveFn(pageState.data))
    }
    dispatch(requestFn())

    try {
      const response = await fetchJSON(url)
      const content = mutator(response)
      return dispatch(receiveFn(content))
    } catch (error) {
      console.log('error', error)
      return dispatch(receiveFn(null, error))
    }
  }
}
