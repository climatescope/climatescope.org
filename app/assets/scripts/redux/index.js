'use strict'
import { combineReducers } from 'redux'

import staticPages from './static-page'
import policies from './policies'
import geographies from './geographies'
// import medium from './medium'
import libraryct from './libraryctypes'

export const reducers = {
  staticPages,
  policies,
  geographies,
  libraryct
}

export default combineReducers(reducers)
