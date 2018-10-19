'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'

import { environment } from '../config'

import Dropdown from './dropdown'

export default class ShareOptions extends React.PureComponent {
  render () {
    const { url } = this.props
    return (
      <Dropdown
        className='dropdown-content'
        triggerClassName='bttn bttn-success dropdown-toggle share'
        triggerActiveClassName='active'
        triggerText='Share'
        triggerTitle='Toggle share options'
        direction='down'
        alignment='right' >
        <ul className='dropdown-menu'>
          <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className='has-icon twitter' title='Share on Facebook' target='_blank' data-hook='dropdown:close'><span>Facebook</span></a></li>
          <li><a href={`https://twitter.com/intent/tweet?url=${url}`} className='has-icon facebook' title='Share on Twitter' target='_blank' data-hook='dropdown:close'><span>Twitter</span></a></li>
        </ul>
      </Dropdown>
    )
  }
}

if (environment !== 'production') {
  ShareOptions.propTypes = {
    url: T.string
  }
}
