'use script'
import { combineReducers } from 'redux'

import { fetchDispatchCacheFactory, baseAPIReducer } from './utils'
import { baseurl } from '../config'

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_LIBRARY_CONTENTYPE = 'REQUEST_LIBRARY_CONTENTYPE'
export const RECEIVE_LIBRARY_CONTENTYPE = 'RECEIVE_LIBRARY_CONTENTYPE'
export const INVALIDATE_LIBRARY_CONTENTYPE = 'INVALIDATE_LIBRARY_CONTENTYPE'

export function invalidateLibraryContenType () {
  return { type: INVALIDATE_LIBRARY_CONTENTYPE }
}

export function requestLibraryContenType () {
  return { type: REQUEST_LIBRARY_CONTENTYPE }
}

export function receiveLibraryContenType (data, error = null) {
  return { type: RECEIVE_LIBRARY_CONTENTYPE, data, error, receivedAt: Date.now() }
}

export function fetchLibraryContenType (ctype) {
  return fetchDispatchCacheFactory({
    statePath: 'libraryct.list',
    url: `${baseurl}/api/library/${ctype}.json`,
    requestFn: requestLibraryContenType,
    receiveFn: receiveLibraryContenType,
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const libraryContenTypeReducerInitialState = {
    fetching: false,
    fetched: false,
    error: null,
    data: {}
  }
  
  function libraryContenTypeReducer (state = libraryContenTypeReducerInitialState, action) {
    return baseAPIReducer(state, action, 'LIBRARY_CONTENTYPE')
  }
// /////////////////////////////////////////////////////////////////////////////
// Combine reducers and export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  list: libraryContenTypeReducer,
})
