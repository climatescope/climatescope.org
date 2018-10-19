'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import c from 'classnames'

import { environment } from '../config'

export const LoadingSkeletonGroup = ({ children, style }) => (
  <div className='lsk__group' style={style}>{children}</div>
)

if (environment !== 'production') {
  LoadingSkeletonGroup.propTypes = {
    style: T.object,
    children: T.node
  }
}

export const LoadingSkeleton = ({ type, size, width, inline, style }) => {
  width = width || 1
  const k = c('lsk__item', {
    [`lsk__item--${type}`]: !!type,
    [`lsk__item--${size}`]: !!size
  })
  style = {
    ...style,
    width: `${width * 100}%`,
    display: inline ? 'inline-block' : 'block'
  }
  return <span className={k} style={style} />
}

if (environment !== 'production') {
  LoadingSkeleton.propTypes = {
    style: T.object,
    type: T.string,
    size: T.string,
    width: T.number,
    inline: T.bool
  }
}
