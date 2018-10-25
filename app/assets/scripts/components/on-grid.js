'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'

import { environment } from '../config'

/**
 * Renders the on grid icon
 *
 * @param {boolean} isOnGrid Whether or not is on grid
 */
export default function OnGrid ({ isOnGrid }) {
  return (
    <em data-title={isOnGrid ? 'on-grid' : 'off-grid'} className={c('label-grid', { 'label-grid-on': isOnGrid, 'label-grid-off': !isOnGrid })}>
      <span>{isOnGrid ? 'on' : 'off'}</span>
    </em>
  )
}

if (environment !== 'production') {
  OnGrid.propTypes = {
    isOnGrid: T.bool
  }
}
