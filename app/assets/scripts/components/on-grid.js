'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'

import { environment } from '../config'

/**
 * Renders the on grid icon
 *
 * @param {boolean} grid Whether or not is on grid
 * @param {string} theme Theme to use
 */
export default function OnGrid ({ grid, theme }) {
  if (grid === null || grid === '') return null
  grid = typeof grid === 'string' ? grid === 'on' : grid
  return (
    <small data-title={grid ? 'On-grid' : 'Off-grid'} className={c('label label--grid', { 'label--disabled': !grid, [`label--${theme}`]: !!theme })}>
      <span>{grid ? 'On-grid' : 'Off-grid'}</span>
    </small>
  )
}

if (environment !== 'production') {
  OnGrid.propTypes = {
    grid: T.oneOfType([T.bool, T.string]),
    theme: T.string
  }
}
