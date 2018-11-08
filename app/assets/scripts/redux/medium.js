'use script'
import { combineReducers } from 'redux'

import { fetchDispatchCacheFactory, baseAPIReducer } from './utils'
import { baseurl } from '../config'

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_MEDIUM_POSTS = 'REQUEST_MEDIUM_POSTS'
export const RECEIVE_MEDIUM_POSTS = 'RECEIVE_MEDIUM_POSTS'
export const INVALIDATE_MEDIUM_POSTS = 'INVALIDATE_MEDIUM_POSTS'

export function invalidateMediumPosts () {
  return { type: INVALIDATE_MEDIUM_POSTS }
}

export function requestMediumPosts () {
  return { type: REQUEST_MEDIUM_POSTS }
}

export function receiveMediumPosts (data, error = null) {
  return { type: RECEIVE_MEDIUM_POSTS, data, error, receivedAt: Date.now() }
}

export function fetchMediumPosts () {
  return fetchDispatchCacheFactory({
    statePath: 'medium.postList',
    // TODO: Swap for server url.
    url: `${baseurl}/api/medium.json`,
    requestFn: requestMediumPosts,
    receiveFn: receiveMediumPosts
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const mediumReducerInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: []
}

function mediumReducer (state = mediumReducerInitialState, action) {
  return baseAPIReducer(state, action, 'MEDIUM_POSTS')
}

// /////////////////////////////////////////////////////////////////////////////
// Combine reducers and export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  postList: mediumReducer
})
