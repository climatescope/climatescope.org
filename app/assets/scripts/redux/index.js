'use strict'
import { combineReducers } from 'redux'

import staticPages from './static-page'
import policies from './policies'

export const reducers = {
  staticPages,
  policies
}

export default combineReducers(reducers)
