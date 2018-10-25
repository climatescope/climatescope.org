'use strict'
import { combineReducers } from 'redux'

import staticPages from './static-page'
import policies from './policies'
import geographies from './geographies'

export const reducers = {
  staticPages,
  policies,
  geographies
}

export default combineReducers(reducers)
