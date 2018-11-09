'use script'
import { combineReducers } from 'redux'
import qs from 'qs'

import { policyDbUrl } from '../config'
import { fetchDispatchCacheFactory, baseAPIReducer } from './utils'
import { objectToArray } from '../utils/array'

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_POLICY_FILTERS = 'REQUEST_POLICY_FILTERS'
export const RECEIVE_POLICY_FILTERS = 'RECEIVE_POLICY_FILTERS'
export const INVALIDATE_POLICY_FILTERS = 'INVALIDATE_POLICY_FILTERS'

export function invalidatePolicyFilters () {
  return { type: INVALIDATE_POLICY_FILTERS }
}

export function requestPolicyFilters () {
  return { type: REQUEST_POLICY_FILTERS }
}

export function receivePolicyFilters (data, error = null) {
  return { type: RECEIVE_POLICY_FILTERS, data, error, receivedAt: Date.now() }
}

export function fetchPolicyFilters () {
  return fetchDispatchCacheFactory({
    statePath: 'policies.filters',
    url: `${policyDbUrl}/policy/filter`,
    requestFn: requestPolicyFilters,
    receiveFn: receivePolicyFilters,
    mutator: (response) => ({
      country: objectToArray(response.country),
      status: objectToArray(response.status),
      mechanism: objectToArray(response.mechanism)
    })
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const filtersReducerInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: {}
}

function filtersReducer (state = filtersReducerInitialState, action) {
  return baseAPIReducer(state, action, 'POLICY_FILTERS')
}

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_POLICIES = 'REQUEST_POLICIES'
export const RECEIVE_POLICIES = 'RECEIVE_POLICIES'
export const INVALIDATE_POLICIES = 'INVALIDATE_POLICIES'

export function invalidatePolicies () {
  return { type: INVALIDATE_POLICIES }
}

export function requestPolicies () {
  return { type: REQUEST_POLICIES }
}

export function receivePolicies (data, error = null) {
  return { type: RECEIVE_POLICIES, data, error, receivedAt: Date.now() }
}

export function fetchPolicies (filters) {
  const qsFilters = {
    limit: 50,
    offset: 0,
    ...filters
  }
  return fetchDispatchCacheFactory({
    statePath: 'policies.policiesList',
    url: `${policyDbUrl}/policy?${qs.stringify(qsFilters)}`,
    requestFn: requestPolicies,
    receiveFn: receivePolicies,
    mutator: (response) => ({
      meta: {
        total: response.metaData.totalResults,
        page: qsFilters.offset / qsFilters.limit + 1,
        limit: qsFilters.limit
      },
      results: response.listData
    })
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const policiesReducerInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: {}
}

function policiesReducer (state = policiesReducerInitialState, action) {
  return baseAPIReducer(state, action, 'POLICIES')
}

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_POLICY = 'REQUEST_POLICY'
export const RECEIVE_POLICY = 'RECEIVE_POLICY'
export const INVALIDATE_POLICY = 'INVALIDATE_POLICY'

export function invalidatePolicy (id) {
  return { type: INVALIDATE_POLICY, id }
}

export function requestPolicy (id) {
  return { type: REQUEST_POLICY, id }
}

export function receivePolicy (id, data, error = null) {
  return { type: RECEIVE_POLICY, id, data, error, receivedAt: Date.now() }
}

export function fetchPolicy (policyId) {
  return fetchDispatchCacheFactory({
    statePath: ['policies', 'individualPolicies', policyId],
    url: `${policyDbUrl}/policy/${policyId}`,
    requestFn: requestPolicy.bind(this, policyId),
    receiveFn: receivePolicy.bind(this, policyId)
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const initialState = {
  // policyId: {
  //   fetching: false,
  //   fetched: false,
  //   error: null,
  //   data: {}
  // }
}

function policyReducer (state = initialState, action) {
  return baseAPIReducer(state, action, 'POLICY')
}

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_POLICY_COUNTRY_STATS = 'REQUEST_POLICY_COUNTRY_STATS'
export const RECEIVE_POLICY_COUNTRY_STATS = 'RECEIVE_POLICY_COUNTRY_STATS'
export const INVALIDATE_POLICY_COUNTRY_STATS = 'INVALIDATE_POLICY_COUNTRY_STATS'

export function invalidatePolicyCountryStats (id) {
  return { type: INVALIDATE_POLICY_COUNTRY_STATS, id }
}

export function requestPolicyCountryStats (id) {
  return { type: REQUEST_POLICY_COUNTRY_STATS, id }
}

export function receivePolicyCountryStats (id, data, error = null) {
  return { type: RECEIVE_POLICY_COUNTRY_STATS, id, data, error, receivedAt: Date.now() }
}

export function fetchPolicyCountryStats (countryIso) {
  return fetchDispatchCacheFactory({
    statePath: ['policies', 'countryStats', countryIso],
    url: `${policyDbUrl}/policy?country=${countryIso}&limit=999`,
    requestFn: requestPolicyCountryStats.bind(this, countryIso),
    receiveFn: receivePolicyCountryStats.bind(this, countryIso),
    mutator: (response) => {
      const total = response.listData.length
      // The values of mechanisms will be changed by reference.
      let mechanisms = [
        { count: 0, name: 'Auctions and tenders', id: 'Auctions and tenders' },
        { count: 0, name: 'Feed-in tariff or premium', id: 'Feed-in tariff or premium' },
        { count: 0, name: 'Utility regulation', id: 'Utility regulation' },
        { count: 0, name: 'Equity Finance Mechanism', id: 'Equity Finance Mechanism' },
        { count: 0, name: 'Tax-based Mechanism', id: 'Tax-based Mechanism' }
      ]

      response.listData.forEach(policy => {
        if (policy.type === null || policy.status.name === 'Expired') return

        policy.type.mechanism.forEach(({ name }) => {
          let mechanism = mechanisms.find(m => m.id === name)
          if (!mechanism) return
          mechanism.count++
        })
      })

      return { total, mechanisms }
    }
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const initialPolicyCountryStatsState = {
  // countryIso: {
  //   fetching: false,
  //   fetched: false,
  //   error: null,
  //   data: {}
  // }
}

function policyCountryStatsReducer (state = initialPolicyCountryStatsState, action) {
  return baseAPIReducer(state, action, 'POLICY_COUNTRY_STATS')
}

// /////////////////////////////////////////////////////////////////////////////
// Combine reducers and export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  filters: filtersReducer,
  list: policiesReducer,
  individualPolicies: policyReducer,
  countryStats: policyCountryStatsReducer
})
