'use script'
import { combineReducers } from 'redux'

import { fetchDispatchCacheFactory, baseAPIReducer, paginateFake } from './utils'
import { baseurl } from '../config'
import { libraryCType } from '../utils/constants'
// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_LIBRARY_CONTENTTYPE = 'REQUEST_LIBRARY_CONTENTTYPE'
export const RECEIVE_LIBRARY_CONTENTTYPE = 'RECEIVE_LIBRARY_CONTENTTYPE'
export const INVALIDATE_LIBRARY_CONTENTTYPE = 'INVALIDATE_LIBRARY_CONTENTTYPE'

export function invalidateLibraryContentType () {
  return { type: INVALIDATE_LIBRARY_CONTENTTYPE }
}

export function requestLibraryContentType () {
  return { type: REQUEST_LIBRARY_CONTENTTYPE }
}

export function receiveLibraryContentType (data, error = null) {
  return { type: RECEIVE_LIBRARY_CONTENTTYPE, data, error, receivedAt: Date.now() }
}

export function fetchLibraryContentType (filters) {
  const qsFilters = {
    limit: 50,
    offset: 0,
    contentType: 'all',
    ...filters
  }
  return fetchDispatchCacheFactory({
    statePath: ['libraryct.list'],
    url: `${baseurl}/api/library/insights.json`,
    requestFn: requestLibraryContentType,
    receiveFn: receiveLibraryContentType,
    mutator: (response) => {
      // Filter Previos insights
      response.forEach(r => {
        if (r.type === 'update' && r.date) {
          if (new Date(r.date.slice(0, 10)).getFullYear() <= libraryCType.prevInsights.year) {
            r.type = libraryCType.prevInsights.id
          }
        }
      })
      if (qsFilters.contentType !== 'all') {
        response = response.filter(i => { return i.type.includes(qsFilters.contentType) })
      }
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

const libraryContentTypeReducerInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: {}
}

function libraryContentTypeReducer (state = libraryContentTypeReducerInitialState, action) {
  return baseAPIReducer(state, action, 'LIBRARY_CONTENTTYPE')
}

// /////////////////////////////////////////////////////////////////////////////
// Combine reducers and export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  list: libraryContentTypeReducer
})
