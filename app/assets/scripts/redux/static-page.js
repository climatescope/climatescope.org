'use script'
import { baseurl } from '../config'
import { fetchDispatchCacheFactory, baseAPIReducer } from './utils'

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'
export const INVALIDATE_PAGE = 'INVALIDATE_PAGE'

// Pages (includes projects as well since the're static)
export function invalidatePage (id) {
  return { type: INVALIDATE_PAGE, id }
}

export function requestPage (id) {
  return { type: REQUEST_PAGE, id }
}

export function receivePage (id, data, error = null) {
  return { type: RECEIVE_PAGE, id, data, error, receivedAt: Date.now() }
}

export function fetchPage (page) {
  return fetchDispatchCacheFactory({
    statePath: ['staticPages', page],
    url: `${baseurl}/api/${page}.json`,
    requestFn: requestPage.bind(this, page),
    receiveFn: receivePage.bind(this, page)
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const initialState = {
  // pageId: {
  //   fetching: false,
  //   fetched: false,
  //   data: {}
  // }
}

export default function reducer (state = initialState, action) {
  return {
    ...state,
    [action.id]: baseAPIReducer(state, action, 'PAGE')
  }
}
