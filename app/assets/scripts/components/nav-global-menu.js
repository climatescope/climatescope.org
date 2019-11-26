'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'

import Dropdown from './dropdown'

import { environment } from '../config'

class NavGlobalMenu extends React.PureComponent {
  renderHeaderMenu () {
    return (
      <ul className='global-menu' id='global-menu'>
        <li className='global-menu__item'><Link to='/' title='View' className='global-menu__link'>Home</Link></li>
        <li className='global-menu__item'><Link to='/results' title='View Results' className='global-menu__link'>Results</Link></li>
        <li className='global-menu__item drop'>
          <Dropdown
            className=''
            triggerElement='a'
            triggerClassName='drop__toggle drop__toggle--caret global-menu__link'
            triggerActiveClassName='button--active'
            triggerText='Insights'
            triggerTitle='Explore the Insights'
            direction='down'
            alignment='right' >
            <ul className='drop__menu'>
              <li><Link data-hook='dropdown:close' to='/library/insights' title='View Climatescope Insights' className='drop__menu-item'>Insights</Link></li>
              <li><Link data-hook='dropdown:close' to='/key-findings' title='View Key Findings' className='drop__menu-item'>Key Findings</Link></li>
              <li><Link data-hook='dropdown:close' to='/press-release' title='View Press Release' className='drop__menu-item'>Press Release</Link></li>
            </ul>
          </Dropdown>
        </li>
        <li className='global-menu__item'><Link to='/library' title='View Tools & Reports' className='global-menu__link'>Tools & Reports</Link></li>
        <li className='global-menu__item'>
          <Dropdown
            className=''
            triggerElement='a'
            triggerClassName='drop__toggle drop__toggle--caret global-menu__link'
            triggerActiveClassName='button--active'
            triggerText='About'
            triggerTitle='Explore Climatescope'
            direction='down'
            alignment='right' >
            <ul className='drop__menu'>
              <li><Link data-hook='dropdown:close' to='/about' title='View' className='drop__menu-item'>Behind Climatescope</Link></li>
              <li><Link data-hook='dropdown:close' to='/methodology' title='View' className='drop__menu-item'>Methodology</Link></li>
              <li><Link data-hook='dropdown:close' to='/license' title='View' className='drop__menu-item'>License</Link></li>
              <li><Link data-hook='dropdown:close' to='/contact' title='View' className='drop__menu-item'>Contact</Link></li>
            </ul>
          </Dropdown>
        </li>
      </ul>
    )
  }

  renderFooterMenu () {
    return (
      <ul className='footer-menu' id='footer-menu'>
        <li className='footer-menu__item'><Link to='/' title='View' className='footer-menu__link'>Home</Link></li>
        <li className='footer-menu__item'><Link to='/results' title='View' className='footer-menu__link'>Results</Link></li>
        <li className='footer-menu__item drop'>
          <Dropdown
            className=''
            triggerElement='a'
            triggerClassName='drop__toggle drop__toggle--caret footer-menu__link'
            triggerActiveClassName='button--active'
            triggerText='Insights'
            triggerTitle='Explore the Insights'
            direction='up'
            alignment='left' >
            <ul className='drop__menu'>
              <li><Link data-hook='dropdown:close' to='/library/insights' title='View Climatescope Insights' className='drop__menu-item'>Insights</Link></li>
              <li><Link data-hook='dropdown:close' to='/key-findings' title='View Key Findings' className='drop__menu-item'>Key Findings</Link></li>
              <li><Link data-hook='dropdown:close' to='/press-release' title='View Press Release' className='drop__menu-item'>Press Release</Link></li>
            </ul>
          </Dropdown>
        </li>
        <li className='footer-menu__item'><Link to='/library' title='View Tools & Reports' className='footer-menu__link'>Tools & Reports</Link></li>
        <li className='footer-menu__item'>
          <Dropdown
            className=''
            triggerElement='a'
            triggerClassName='drop__toggle drop__toggle--caret footer-menu__link'
            triggerActiveClassName='button--active'
            triggerText='About'
            triggerTitle='Explore Climatescope'
            direction='up'
            alignment='left' >
            <ul className='drop__menu'>
              <li><Link data-hook='dropdown:close' to='/about' title='View' className='drop__menu-item'>Behind Climatescope</Link></li>
              <li><Link data-hook='dropdown:close' to='/methodology' title='View' className='drop__menu-item'>Methodology</Link></li>
              <li><Link data-hook='dropdown:close' to='/license' title='View' className='drop__menu-item'>License</Link></li>
              <li><Link data-hook='dropdown:close' to='/contact' title='View' className='drop__menu-item'>Contact</Link></li>
            </ul>
          </Dropdown>
        </li>
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
