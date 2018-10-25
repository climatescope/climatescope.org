'use script'
import { combineReducers } from 'redux'

import { fetchDispatchCacheFactory, baseAPIReducer } from './utils'
import { baseurl } from '../config'

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_GEOGRAPHIES = 'REQUEST_GEOGRAPHIES'
export const RECEIVE_GEOGRAPHIES = 'RECEIVE_GEOGRAPHIES'
export const INVALIDATE_GEOGRAPHIES = 'INVALIDATE_GEOGRAPHIES'

export function invalidateGeographies () {
  return { type: INVALIDATE_GEOGRAPHIES }
}

export function requestGeographies () {
  return { type: REQUEST_GEOGRAPHIES }
}

export function receiveGeographies (data, error = null) {
  return { type: RECEIVE_GEOGRAPHIES, data, error, receivedAt: Date.now() }
}

export function fetchGeographies () {
  return fetchDispatchCacheFactory({
    statePath: 'geographies.geographiesList',
    url: `${baseurl}/api/results.json`,
    requestFn: requestGeographies,
    receiveFn: receiveGeographies
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const geographiesReducerInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: []
}

function geographiesReducer (state = geographiesReducerInitialState, action) {
  return baseAPIReducer(state, action, 'GEOGRAPHIES')
}

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_GEOGRAPHY = 'REQUEST_GEOGRAPHY'
export const RECEIVE_GEOGRAPHY = 'RECEIVE_GEOGRAPHY'
export const INVALIDATE_GEOGRAPHY = 'INVALIDATE_GEOGRAPHY'

export function invalidateGeography (id) {
  return { type: INVALIDATE_GEOGRAPHY, id }
}

export function requestGeography (id) {
  return { type: REQUEST_GEOGRAPHY, id }
}

export function receiveGeography (id, data, error = null) {
  return { type: RECEIVE_GEOGRAPHY, id, data, error, receivedAt: Date.now() }
}

export function fetchGeography (geographyId) {
  return fetchDispatchCacheFactory({
    statePath: ['geographies', 'individualGeographies', geographyId],
    url: `${baseurl}/api/results/${geographyId}.json`,
    requestFn: requestGeography.bind(this, geographyId),
    receiveFn: receiveGeography.bind(this, geographyId)
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const geographyReducerInitialState = {
  // geographyId: {
  //   fetching: false,
  //   fetched: false,
  //   error: null,
  //   data: []
  // }
}

function geographyReducer (state = geographyReducerInitialState, action) {
  return baseAPIReducer(state, action, 'GEOGRAPHY')
}

// /////////////////////////////////////////////////////////////////////////////
// Combine reducers and export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  list: geographiesReducer,
  individualGeographies: geographyReducer
})
