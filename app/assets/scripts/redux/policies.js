'use script'
import { combineReducers } from 'redux'
import qs from 'qs';

import { policyDbUrl } from '../config'
import { fetchJSON } from './utils'
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
  return async function (dispatch, getState) {
    const dataState = getState().policies.filters
    if (dataState && dataState.fetched && !dataState.error) {
      return dispatch(receivePolicyFilters(dataState.data))
    }

    dispatch(requestPolicyFilters())

    try {
      const url = `${policyDbUrl}/policy/filter`
      const response = await fetchJSON(url)
      const content = {
        country: objectToArray(response.country),
        status: objectToArray(response.status),
        mechanism: objectToArray(response.mechanism)
      }
      return dispatch(receivePolicyFilters(content))
    } catch (error) {
      console.log('error', error)
      return dispatch(receivePolicyFilters(null, error))
    }
  }
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
  return async function (dispatch, getState) {
    const dataState = getState().policies.policiesList
    if (dataState && dataState.fetched && !dataState.error) {
      return dispatch(receivePolicies(dataState.data))
    }

    dispatch(requestPolicies())

    let qsFilters = {
      limit: 50,
      offset: 0,
      ...filters
    }

    try {
      const url = `${policyDbUrl}/policy?${qs.stringify(qsFilters)}`
      const response = await fetchJSON(url)
      const content = {
        meta: {
          total: response.metaData.totalResults,
          page: filters.offset / filters.limit + 1,
          limit: filters.limit
        },
        results: response.listData
      }
      return dispatch(receivePolicies(content))
    } catch (error) {
      console.log('error', error)
      return dispatch(receivePolicies(null, error))
    }
  }
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
