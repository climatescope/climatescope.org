'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'

import NavGlobalMenu from './nav-global-menu'

import { environment, appTitle } from '../config'

export default class PageHeader extends React.PureComponent {
  render () {
    return (
      <header id='site-header' className='site-header site-header--global' role='banner'>
        <div className='row--contained'>
          <div id='site-headline'>
            <h1 id='site-title'><Link to='/' title='View homepage'><span>{appTitle}</span></Link></h1>
          </div>
          <nav id='prime-nav' role='navigation'>
            <NavGlobalMenu forHeader />
          </nav>
        </div>
      </header>
    )
  }
}

if (environment !== 'production') {
  PageHeader.propTypes = {
    location: T.object
  }
}
