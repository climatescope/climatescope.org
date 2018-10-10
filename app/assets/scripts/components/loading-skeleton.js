'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'

import { environment } from '../config'

export const LoadingSkeletonGroup = ({ children }) => (
  <div className='lsk__group'>{children}</div>
)

if (environment !== 'production') {
  LoadingSkeletonGroup.propTypes = {
    children: T.node
  }
}

export const LoadingSkeleton = ({ type, size, width, inline }) => {
  width = width || 1
  const k = c('lsk__item', {
    [`lsk__item--${type}`]: !!type,
    [`lsk__item--${size}`]: !!size
  })
  let style = { width: `${width * 100}%` }
  if (inline) {
    style.display = 'inline-block'
  }
  return <span className={k} style={style} />
}

if (environment !== 'production') {
  LoadingSkeleton.propTypes = {
    type: T.string,
    size: T.string,
    width: T.number,
    inline: T.bool
  }
}
