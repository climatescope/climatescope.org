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
            triggerText='Tools'
            triggerTitle='Explore the tools'
            direction='down'
            alignment='center' >
            <ul className='dropdown-menu'>
              <li><Link data-hook='dropdown:close' to='/compare' title='View results side by side'>Country Comparison</Link></li>
              <li><Link data-hook='dropdown:close' to='/off-grid-data-hub' title='Use the Off-grid Data Hub'>Off-grid Data Hub</Link></li>
              <li><Link data-hook='dropdown:close' to='/clean-energy-investments' title='Use the Clean Energy Investment'>Clean Energy Investment</Link></li>
              <li><Link data-hook='dropdown:close' to='/capacity-generation' title='Use the Capacity Generation'>Capacity Generation</Link></li>
              <li><Link data-hook='dropdown:close' to='/policies' title='Browse the policy database'>Policies</Link></li>
              <li><Link data-hook='dropdown:close' to='/download' title='Download the data and report'>Download</Link></li>
              <li><Link data-hook='dropdown:close' to='/about' title='More about Climatescope'>About Climatescope</Link></li>
              <li><Link data-hook='dropdown:close' to='/methodology' title='More about the methodology'>Methodology</Link></li>
              <li><Link data-hook='dropdown:close' to='/license' title='About the license'>License</Link></li>
            </ul>
          </Dropdown>
        </li>
        <li><Link to='/contact' title='Contact us'>Contact</Link></li>
      </ul>
    )
  }

  renderFooterMenu () {
    return (
      <ul className='ftr-menu'>
        <li><Link to='/results' title='The global index'>Results</Link></li>
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
