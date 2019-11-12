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

export function invalidateLibraryContenType (id) {
  return { type: INVALIDATE_LIBRARY_CONTENTYPE, id }
}

export function requestLibraryContenType (id) {
  return { type: REQUEST_LIBRARY_CONTENTYPE, id }
}

export function receiveLibraryContenType (id, data, error = null) {
  return { type: RECEIVE_LIBRARY_CONTENTYPE, id, data, error, receivedAt: Date.now() }
}

export function fetchLibraryContenType (id) {
  return fetchDispatchCacheFactory({
    statePath: ['libraryct.list', id],
    url: `${baseurl}/api/library/${id}.json`,
    requestFn: requestLibraryContenType.bind(null, id),
    receiveFn: receiveLibraryContenType.bind(null, id),
    mutator: (response) => {
      return response.map(r => {
        const url = r.url.replace('api/', '').replace('.json', '')
        return {
          ...r,
          url
        }
      })
    }
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
  list: libraryContenTypeReducer
})
