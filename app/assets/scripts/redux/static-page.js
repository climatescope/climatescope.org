'use script'
import fetch from 'isomorphic-fetch'
import { safeLoadFront } from 'yaml-front-matter'

import { baseurl } from '../config'

// /////////////////////////////////////////////////////////////////////////////
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'
export const INVALIDATE_PAGE = 'INVALIDATE_PAGE'

// Pages (includes projects as well since the're static)
export function invalidatePage (id) {
  return { type: INVALIDATE_PAGE, id }
}

export function requestPage (id) {
  return { type: REQUEST_PAGE, id }
}

export function receivePage (id, data, error = null) {
  return { type: RECEIVE_PAGE, id, data, error, receivedAt: Date.now() }
}

export function fetchPage (what, id) {
  const key = `${what}-${id}`
  return async function (dispatch, getState) {
    const pageState = getState().staticPages[key]
    if (pageState && pageState.fetched && !pageState.error) {
      return dispatch(receivePage(key, pageState.data))
    }

    dispatch(requestPage(key))

    try {
      const url = what === 'project'
        ? `${baseurl}/assets/content/projects/${id}/index.md`
        : `${baseurl}/assets/content/pages/${id}.md`
      const response = await fetch(url)
      if (response.status >= 400) throw new Error(response.statusText)

      const content = await response.text()
      const yaml = safeLoadFront(content)

      return dispatch(receivePage(key, yaml))
    } catch (error) {
      console.log('error', error)
      return dispatch(receivePage(key, null, error))
    }
  }
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const initialState = {
  // pageId: {
  //   fetching: false,
  //   fetched: false,
  //   data: {}
  // }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_PAGE:
      const { [action.id]: _, ...rest } = state
      return rest
    case REQUEST_PAGE:
      return {
        ...state,
        [action.id]: {
          fetching: true,
          fetched: false,
          data: {}
        }
      }
    case RECEIVE_PAGE:
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

      state = { ...state, [action.id]: st }
      break
  }
  return state
}
