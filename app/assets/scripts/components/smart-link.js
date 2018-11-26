'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'

import { environment } from '../config'

/**
 * Switches between a `a` and a `Link` depending on the url.
 */
export default class SmartLink extends React.PureComponent {
  render () {
    const { to, ...props } = this.props

    return /^https?:\/\//.test(to)
      ? <a href={to} {...props} target='_blank' />
      : <Link to={to} {...props} />
  }
}

if (environment !== 'production') {
  SmartLink.propTypes = {
    to: T.string
  }
}
