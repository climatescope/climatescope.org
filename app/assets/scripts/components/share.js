'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'

import { environment, appTitle } from '../config'

import Dropdown from './dropdown'

export default class ShareOptions extends React.PureComponent {
  render () {
    const { url } = this.props
    return (
      <Dropdown
        className='dropdown-content'
        triggerClassName='ipa-share'
        triggerActiveClassName='button--active'
        triggerText='Share'
        triggerTitle='Toggle share options'
        direction='down'
        alignment='right' >
        <ul className='drop__menu drop__menu--iconified'>
          <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className='drop__menu-item dpi-facebook' title='Share on Facebook' target='_blank' data-hook='dropdown:close'><span>Facebook</span></a></li>
          <li><a href={`https://twitter.com/intent/tweet?url=${url}`} className='drop__menu-item dpi-twitter' title='Share on Twitter' target='_blank' data-hook='dropdown:close'><span>Twitter</span></a></li>
          <li><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${appTitle}`} className='drop__menu-item dpi-linkedin' title='Share on LinkedIn' target='_blank' data-hook='dropdown:close'><span>LinkedIn</span></a></li>
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
