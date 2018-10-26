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
    <em data-title={grid ? 'on-grid' : 'off-grid'} className={c('label-grid', { 'label-grid-on': grid, 'label-grid-off': !grid })}>
      <span>{grid ? 'on' : 'off'}</span>
    </em>
  )
}

if (environment !== 'production') {
  OnGrid.propTypes = {
    grid: T.bool
  }
}
