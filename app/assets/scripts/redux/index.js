'use strict'
import { combineReducers } from 'redux'

import staticPages from './static-page'
import policies from './policies'
import countries from './countries'

export const reducers = {
  staticPages,
  policies,
  countries
}

export default combineReducers(reducers)
