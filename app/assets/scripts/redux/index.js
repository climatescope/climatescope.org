'use strict'
import { combineReducers } from 'redux'

import staticPages from './static-page'
import policies from './policies'
import geographies from './geographies'
import medium from './medium'

export const reducers = {
  staticPages,
  policies,
  geographies,
  medium
}

export default combineReducers(reducers)
