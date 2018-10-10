'use script'
import { combineReducers } from 'redux'
import qs from 'qs'

import { policyDbUrl } from '../config'
import { fetchDispatchCacheFactory } from './utils'
import { objectToArray } from '../utils/utils'

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
  switch (action.type) {
    case INVALIDATE_POLICY_FILTERS:
      return state
    case REQUEST_POLICY_FILTERS:
      return {
        fetching: true,
        fetched: false,
        data: {}
      }
    case RECEIVE_POLICY_FILTERS:
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

      return st
  }
  return state
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
  switch (action.type) {
    case INVALIDATE_POLICIES:
      return state
    case REQUEST_POLICIES:
      return {
        fetching: true,
        fetched: false,
        data: {}
      }
    case RECEIVE_POLICIES:
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

      return st
  }
  return state
}
// /////////////////////////////////////////////////////////////////////////////
// Combine reducers and export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  filters: filtersReducer,
  list: policiesReducer
})
