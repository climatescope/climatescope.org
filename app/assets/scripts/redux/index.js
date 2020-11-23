'use strict'
import { combineReducers } from 'redux'

import staticPages from './static-page'
import geographies from './geographies'
// import medium from './medium'
import libraryct from './libraryctypes'

export const reducers = {
  staticPages,
  geographies,
  libraryct
}

export default combineReducers(reducers)
