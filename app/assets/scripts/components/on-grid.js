'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'

import { environment } from '../config'

/**
 * Renders the on grid icon
 *
 * @param {boolean} grid Whether or not is on grid
 */
export default function OnGrid ({ grid }) {
  if (grid === null) return null
  return (
    <small data-title={grid ? 'On-grid' : 'Off-grid'} className={c('label label--grid', { 'label--disabled': !grid })}>
      <span>{grid ? 'On-grid' : 'Off-grid'}</span>
    </small>
  )
}

if (environment !== 'production') {
  OnGrid.propTypes = {
    grid: T.bool
  }
}
