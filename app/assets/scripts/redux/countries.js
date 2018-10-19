'use script'
import { combineReducers } from 'redux'

import { fetchDispatchCacheFactory, baseAPIReducer } from './utils'
import { baseurl } from '../config'

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES'
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES'
export const INVALIDATE_COUNTRIES = 'INVALIDATE_COUNTRIES'

export function invalidateCountries () {
  return { type: INVALIDATE_COUNTRIES }
}

export function requestCountries () {
  return { type: REQUEST_COUNTRIES }
}

export function receiveCountries (data, error = null) {
  return { type: RECEIVE_COUNTRIES, data, error, receivedAt: Date.now() }
}

export function fetchCountries () {
  return fetchDispatchCacheFactory({
    statePath: 'countries.countriesList',
    url: `${baseurl}/api/countries.json`,
    requestFn: requestCountries,
    receiveFn: receiveCountries
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const countriesReducerInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: []
}

function countriesReducer (state = countriesReducerInitialState, action) {
  return baseAPIReducer(state, action, 'COUNTRIES')
}

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_COUNTRY = 'REQUEST_COUNTRY'
export const RECEIVE_COUNTRY = 'RECEIVE_COUNTRY'
export const INVALIDATE_COUNTRY = 'INVALIDATE_COUNTRY'

export function invalidateCountry (id) {
  return { type: INVALIDATE_COUNTRY, id }
}

export function requestCountry (id) {
  return { type: REQUEST_COUNTRY, id }
}

export function receiveCountry (id, data, error = null) {
  return { type: RECEIVE_COUNTRY, id, data, error, receivedAt: Date.now() }
}

export function fetchCountry (countryId) {
  return fetchDispatchCacheFactory({
    statePath: ['countries', 'individualCountries', countryId],
    url: `${baseurl}/api/countries/${countryId}.json`,
    requestFn: requestCountry.bind(this, countryId),
    receiveFn: receiveCountry.bind(this, countryId)
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const countryReducerInitialState = {
  // countryId: {
  //   fetching: false,
  //   fetched: false,
  //   error: null,
  //   data: []
  // }
}

function countryReducer (state = countryReducerInitialState, action) {
  return baseAPIReducer(state, action, 'COUNTRY')
}

// /////////////////////////////////////////////////////////////////////////////
// Combine reducers and export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  list: countriesReducer,
  individualCountries: countryReducer
})
