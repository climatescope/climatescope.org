'use script'
import { combineReducers } from 'redux'

import { fetchDispatchCacheFactory, baseAPIReducer } from './utils'
import { baseurl } from '../config'
import turfCenter from '@turf/center'

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
// Actions
// /////////////////////////////////////////////////////////////////////////////

export const REQUEST_GEOGRAPHIES_META = 'REQUEST_GEOGRAPHIES_META'
export const RECEIVE_GEOGRAPHIES_META = 'RECEIVE_GEOGRAPHIES_META'
export const INVALIDATE_GEOGRAPHIES_META = 'INVALIDATE_GEOGRAPHIES_META'

export function invalidateGeographiesMeta () {
  return { type: INVALIDATE_GEOGRAPHIES_META }
}

export function requestGeographiesMeta () {
  return { type: REQUEST_GEOGRAPHIES_META }
}

export function receiveGeographiesMeta (data, error = null) {
  return { type: RECEIVE_GEOGRAPHIES_META, data, error, receivedAt: Date.now() }
}

export function fetchGeographiesMeta () {
  return fetchDispatchCacheFactory({
    statePath: 'geographiesMeta.geographiesMetaList',
    url: `${baseurl}/api/geographies.json`,
    requestFn: requestGeographiesMeta,
    receiveFn: receiveGeographiesMeta,
    mutator: (response) => {
      return response.map(r => {
        if (!r.bbox) throw new Error('No bbox found for ' + r.name)
        const west = r.bbox[0]
        const south = r.bbox[1]
        const east = r.bbox[2]
        const north = r.bbox[3]
        const lowLeft = [west, south]
        const topLeft = [west, north]
        const topRight = [east, north]
        const lowRight = [east, south]

        return {
          ...r,
          bounds: [ lowLeft, topRight ],
          center: turfCenter({
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  lowLeft,
                  lowRight,
                  topRight,
                  topLeft,
                  lowLeft
                ]
              ]
            }
          }).geometry.coordinates
        }
      })
    }
  })
}

// /////////////////////////////////////////////////////////////////////////////
// Reducer
// /////////////////////////////////////////////////////////////////////////////

const geographiesMetaReducerInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: []
}

function geographiesMetaReducer (state = geographiesMetaReducerInitialState, action) {
  return baseAPIReducer(state, action, 'GEOGRAPHIES_META')
}
// /////////////////////////////////////////////////////////////////////////////
// Combine reducers and export
// /////////////////////////////////////////////////////////////////////////////

export default combineReducers({
  list: geographiesReducer,
  individualGeographies: geographyReducer,
  meta: geographiesMetaReducer
})
