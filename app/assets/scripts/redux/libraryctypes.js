'use script'
import { combineReducers } from 'redux'

import { fetchDispatchCacheFactory, baseAPIReducer, paginateFake } from './utils'
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

export function fetchLibraryContenType (id, filters) {
  const qsFilters = {
    limit: 50,
    offset: 0,
    ...filters
  }
  return fetchDispatchCacheFactory({
    statePath: ['libraryct.list', id],
    url: `${baseurl}/api/library/${id}.json`,
    requestFn: requestLibraryContenType.bind(null, id),
    receiveFn: receiveLibraryContenType.bind(null, id),
    mutator: (response) => {
      // fake paginator
      const results = paginateFake(response, qsFilters.limit, qsFilters.offset / qsFilters.limit + 1)
      results.forEach(r => { r.url = r.url.replace('api/', '').replace('.json', '') })
      const meta = {
        total: response.length,
        page: qsFilters.offset / qsFilters.limit + 1,
        limit: qsFilters.limit
      }
      return { results, meta }
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
