'use strict'
import React from 'react'
import { Link } from 'react-router-dom'

import App from './app'

export default class UhOh extends React.Component {
  render () {
    return (
      <App pageTitle='Page not found' >
        <article className='inpage'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Page not found</h1>
              </div>
            </div>
          </header>
          <div className='inpage__body'>
            <div className='inner'>
              <div className='col col--main prose'>
                <p>We were not able to find the page you're looking for. It may have been archived or removed.</p>
                <p>You might find an older snapshot of this page at the <a href='http://archive.org/web/' title='Find on Internet Archive'>Internet Archive</a>.<br /> If you think this page should be here let us know via <a href='mailto:climatescope@bloomberg.net' title='Send us an email'>email</a>.</p>
                <p><Link className='button-prose-cta' to='/' title='View'><span>Visit the homepage</span></Link></p>
              </div>
            </div>
          </div>
        </article>
      </App>
    )
  }
}
