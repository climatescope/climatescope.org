'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import c from 'classnames'
import ReactGA from 'react-ga'

import { environment } from '../config'
import geoLayoutDef from '../utils/geographies-layout'

import ShareOptions from './share'
import Dropdown from './dropdown'

export default class NavBar extends React.PureComponent {
  constructor (props) {
    super(props)

    // Construct the menu items from the geography layout definition.
    this.menuItems = geoLayoutDef.map(o => ({
      id: o.id,
      title: `Jump to section ${o.title}`,
      label: o.title
    }))

    this.onPrintClick = this.onPrintClick.bind(this)
  }

  onPrintClick () {
    ReactGA.event({
      category: 'User action',
      action: 'Print',
      label: this.props.geography.name
    })
    window.print()
  }

  render () {
    const { isSticky, style, currentItem } = this.props

    const activeItem = (this.menuItems.find(i => i.id === currentItem) || { label: 'Sections' })

    return (
      <nav className={c('inpage__nav nav', { 'inpage__nav--sticky': isSticky })} style={style} role='navigation'>
        <div className='inner'>
          {isSticky ? (
            <div className='nav__headline'>
              <p className='nav__subtitle'>
                <Link to='/results' title='View results page'><span>View all markets</span></Link>
              </p>
              <h1 className='nav__title'>{this.props.geography.name}</h1>
            </div>
          ) : null}
          <div className='nav__block'>
            {isSticky ? (
              <Dropdown
                className='dropdown-content'
                triggerElement='a'
                triggerClassName='nav__drop-trigger'
                triggerActiveClassName='button--active'
                triggerText={activeItem.label}
                triggerTitle='Jump to section'
                direction='down'
                alignment='left' >
                <h6 className='drop__title'>Jump to section</h6>
                <ul className='drop__menu drop__menu--select'>
                  {this.menuItems.map(item => (
                    <li key={item.id}><a data-hook='dropdown:close' href={`#${item.id}`} title={item.title} className={c('drop__menu-item', { 'drop__menu-item--active': item.id === activeItem.id })}>{item.label}</a></li>
                  ))}
                </ul>
              </Dropdown>
            ) : (
              <ul className='sections-menu'>
                {this.menuItems.map(item => (
                  <li key={item.id} className='sections-menu__item'><a href={`#${item.id}`} title={item.title} className='sections-menu__link'><span>{item.label}</span></a></li>
                ))}
              </ul>
            )}
          </div>
          <div className='inpage__actions'>
            <button type='button' className='ipa-print' title='Print content' onClick={this.onPrintClick}><span>Print</span></button>
            <ShareOptions url={window.location.toString()} />
          </div>
        </div>
      </nav>
    )
  }
}

if (environment !== 'production') {
  NavBar.propTypes = {
    currentItem: T.string,
    isSticky: T.bool,
    geography: T.object,
    style: T.object
  }
}
