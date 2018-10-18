'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'

import Dropdown from './dropdown'

import { environment } from '../config'

class NavGlobalMenu extends React.PureComponent {
  renderHeaderMenu () {
    return (
      <ul className='global-menu'>
        <li><Link to='/' title='Go home'>Home</Link></li>
        <li><Link to='/results' title='The global index'>Results</Link></li>
        <li className='dropdown'>
          <Dropdown
            className='dropdown-content'
            triggerElement='a'
            triggerClassName='dropdown-toggle caret'
            triggerActiveClassName='button--active'
            triggerText='Insights & Tools'
            triggerTitle='Explore the Insights & Tools'
            direction='down'
            alignment='center' >
            <ul className='dropdown-menu'>
              <li><Link data-hook='dropdown:close' to='/key-findings' title='View key findings'>Key Findings</Link></li>
              <li><Link data-hook='dropdown:close' to='/library' title='View content library'>Content Library</Link></li>
            </ul>
          </Dropdown>
        </li>
        <li className='dropdown'>
          <Dropdown
            className='dropdown-content'
            triggerElement='a'
            triggerClassName='dropdown-toggle caret'
            triggerActiveClassName='button--active'
            triggerText='About'
            triggerTitle='Explore Climatescope'
            direction='down'
            alignment='center' >
            <ul className='dropdown-menu'>
              <li><Link data-hook='dropdown:close' to='/about' title='More about Climatescope'>Behind Climatescope</Link></li>
              <li><Link data-hook='dropdown:close' to='/methodology' title='More about the methodology'>Methodology</Link></li>
              <li><Link data-hook='dropdown:close' to='/license' title='About the license'>License</Link></li>
              <li><Link data-hook='dropdown:close' to='/contact' title='Contact us'>Contact</Link></li>
            </ul>
          </Dropdown>
        </li>
      </ul>
    )
  }

  renderFooterMenu () {
    return (
      <ul className='ftr-menu'>
        <li><Link to='/results' title='The global index'>Results</Link></li>
        <li><Link to='/library' title='View content library'>Content Library</Link></li>
        <li><Link to='/about' title='More about Climatescope'>About</Link></li>
        <li><Link to='/contact' title='Contact us'>Contact</Link></li>
      </ul>
    )
  }

  render () {
    const { forHeader, forFooter } = this.props
    if (forHeader) return this.renderHeaderMenu()
    if (forFooter) return this.renderFooterMenu()
    return null
  }
}

if (environment !== 'production') {
  NavGlobalMenu.propTypes = {
    forHeader: T.bool,
    forFooter: T.bool
  }
}

export default NavGlobalMenu
